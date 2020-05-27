from django.shortcuts import render, get_object_or_404, redirect
from .models import Product
from .models import User
from .models import Purchase
from .models import Customer
from .models import WillBuy
from .models import Similarity
from django.utils import timezone
from .forms import ProductForm
from .forms import CustomerForm
from django.http import JsonResponse
import json
import itertools
import requests
from django.conf import settings


def product_list(request):
	products = Product.objects.all()
	return render(request, 'recommend/product_list.html', {'products':products})

def product_detail(request, pk):
	product = get_object_or_404(Product, pk=pk)
	return render(request, 'recommend/product_detail.html', {'product':product})

def product_new(request):
	if request.method == 'POST':
		form = ProductForm(request.POST)
		if form.is_valid():
			product = form.save(commit=False)
			product.vendor = request.user
			product.created_date = timezone.now()
			product.save()
			return redirect('product_detail', pk=product.pk)
	else:
		form = ProductForm()
	return render(request, 'recommend/product_edit.html', {'form': form})

def product_edit(request, pk):
	product = get_object_or_404(Product, pk=pk)
	if request.method == "POST":
		form = ProductForm(request.POST, instance=product)
		if form.is_valid():
			product = form.save(commit=False)
			product.vendor = request.user
			product.save()
			return redirect('product_detail', pk=product.pk)
	else:
		form = ProductForm(instance=product)
	return render(request, 'recommend/product_edit.html', {'form': form})

def ordered_product_list(request, pk):
	customer = Customer.objects.get(id=pk)
	products = customer.ordered_products.all()
	return render(request, 'recommend/product_list.html', {'products':products})


def customer_list(request):
	customers = Customer.objects.all()
	return render(request, 'recommend/customer_list.html', {'customers':customers})

def customer_detail(request, pk):
	customer = get_object_or_404(Customer, id=pk)
	return render(request, 'recommend/customer_detail.html', {'customer':customer})

def customer_new(request):
	if request.method == 'POST':
		form = CustomerForm(request.POST)
		if form.is_valid():
			customer = form.save(commit=False)
			if not User.objects.filter(username=customer.username).exists():
				User.objects.create(username=customer.username)
			customer.user = User.objects.get(username=customer.username)
			customer.save()
			form.save_m2m()
			return redirect('customer_list')
	else:
		form = CustomerForm()
	return render(request, 'recommend/customer_edit.html', {'form': form})


def recommendation_album(request):
	# find albums based on the artist of a predetermined album using spotify api

	auth_token = new_token()
	headers = {'Authorization': 'Bearer ' + auth_token}
	
	# get the album from its id
	album_id = '4bNwPPpk01D8pVV9IFSBde'
	url = 'https://api.spotify.com/v1/albums/' + album_id

	response = requests.get(url, headers=headers)

	base_album = response.json()['name']

	artist_id = response.json()['artists'][0]['id']

	# prepare request for spotify recommendations

	url = 'https://api.spotify.com/v1/recommendations'

	params = {
		'seed_artists': artist_id
	}
	
	response = requests.get(url, headers=headers, params=params)
	title = response.json()['tracks'][0]['album']['name'] + ' by ' + response.json()['tracks'][0]['album']['artists'][0]['name']
	url_of_image = response.json()['tracks'][0]['album']['images'][0]['url']

	# create a product out of the album, if does not exist
	if not Product.objects.filter(title=title).exists():
		Product.objects.create(title=title, imageUrl=url_of_image)

	album = Product.objects.get(title=title, imageUrl=url_of_image)

	# presents only the first one
	recommended_albums = [album]

	return render(request, 'recommend/recommend_album.html', {'base_album':base_album, 'recommended_albums':recommended_albums})


# formula from https://www.toptal.com/algorithms/predicting-likes-inside-a-simple-recommendation-engine
def recommendation(request, pk):
	customer = get_object_or_404(Customer, id=pk)
	update_similarity()
	update_will_buy(customer)
	recommended = [x.product for x in WillBuy.objects.filter(customer=customer).order_by('-probability')[:3]]

	return render(request, 'recommend/recommend.html', {'products':recommended})


# for every pair in customers, finds the similarity index
# based on the number of common products they bought
def update_similarity():
	customers = Customer.objects.all()
	for c1 in customers:
		for c2 in customers:
			if c1 != c2:
				if not Similarity.objects.filter(customer1=c1, customer2=c2).exists():
					Similarity.objects.create(customer1=c1, customer2=c2, similarity=0.0)
				
				sim = len(c1.ordered_products.all().intersection(c2.ordered_products.all())) / len(c1.ordered_products.all().union(c2.ordered_products.all()))
				Similarity.objects.get(customer1=c1, customer2=c2).similarity = sim


# for every product in the database that customer hasn't purchased yet, finds the probability that customer will buy that product
# based on similarity between this customer and the customers who bought the product 
def update_will_buy(customer):

	products = Product.objects.all()

	for p in products:
		if p not in customer.ordered_products.all() and len(p.customer_set.all()) != 0:
			# calculate the possibility that this customer will buy this product: P(cust, p)
			sum_of_similarities = 0.0
			for c1 in p.customer_set.all():
				sum_of_similarities += Similarity.objects.get(customer1=customer, customer2=c1).similarity
			
			prob = sum_of_similarities / len(p.customer_set.all())
			
			if not WillBuy.objects.filter(customer=customer, product=p).exists():
				WillBuy.objects.create(customer=customer, product=p, probability=0)
			
			WillBuy.objects.get(customer=customer, product=p).probability = prob


# gets new token using client credentials
def new_token():
	credentials = settings.ACCESS_TOKEN
	headers = {
		'Authorization': credentials,
	}
	body = {
		'grant_type':'client_credentials'
	}
	response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=body)
	return response.json()['access_token']