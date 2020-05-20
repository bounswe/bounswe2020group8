from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from .google_api.utils import MapsAPI
from .forms import ProductForm
from .models import Product


def post_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('/shipment_calculator/')
            except:
                pass
    else:
        form = ProductForm()
    return render(request, 'shipment_calculator/add_product.html', {'form': form})


def list_products(request):
    products = Product.objects.all()
    lat = 40.427747
    lon = 30.218243
    return render(request, 'shipment_calculator/list_product.html', {
        'products': MapsAPI.estimate_prices(products, lat, lon)
    })
