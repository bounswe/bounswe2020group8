from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from .google_api.utils import MapsAPI
from .forms import ProductForm
from .forms import VendorForm
from .models import Product

def post_vendor(request):
    if request.method == "POST":
        form = VendorForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('/add_vendor/')
            except:
                pass
    else:
        form = VendorForm()
    return render(request, 'shipment_calculator/add_vendor.html', {'form': form})

def post_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('/shipment_calculator/40.427747_30.218243')
            except:
                pass
    else:
        form = ProductForm()
    return render(request, 'shipment_calculator/add_product.html', {'form': form})


def list_products(request, param):
    products = Product.objects.all()
    try:
        param1 = param[:str(param).find("_")]
        param1_float = float(param1)
        param2 = param[str(param).find("_") + 1:]
        param2_float = float(param2)
        lat = param1_float
        lon = param2_float
    except:
        lat = 40.427747
        lon = 30.218243

    return render(request, 'shipment_calculator/list_product.html', {
        'products': MapsAPI.estimate_prices(products, lat, lon)
    })
