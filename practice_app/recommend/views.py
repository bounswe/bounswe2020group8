from django.shortcuts import render, get_object_or_404, redirect
from .models import Product
from .models import User
from .models import Purchase
from .models import Customer
from .models import WillBuy
from .models import Similarity
from django.utils import timezone
from .forms import ProductForm
from django.http import JsonResponse
import json
import itertools


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
		form = PostForm()
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


def recommendation(request):
	# first two functions may be called after every purchase (or view, click, like, etc.)
	# since purchase is not implemented yet, they are called at every recommendation
	update_similarity()
	customer = None
	if request.user.is_authenticated:
		customer = get_object_or_404(Customer, user=request.user)
	update_will_buy(customer)
	recommended = [x.product for x in WillBuy.objects.filter(customer=customer).order_by('-probability')[:3]]
	return render(request, 'recommend/product_list.html', {'products':recommended})


def update_similarity():
	customers = Customer.objects.all()
	for c1 in customers:
		for c2 in customers:
			if c1 != c2:
				if not Similarity.objects.filter(customer1=c1, customer2=c2).exists():
					Similarity.objects.create(customer1=c1, customer2=c2, similarity=0.0)
				
				sim = len(c1.ordered_products.all().intersection(c2.ordered_products.all())) / len(c1.ordered_products.all().union(c2.ordered_products.all()))
				Similarity.objects.get(customer1=c1, customer2=c2).similarity = sim
				
	print("RETURNING FROM UPDATE SIM")

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
	print("RETURNING FROM WILL BUY")

