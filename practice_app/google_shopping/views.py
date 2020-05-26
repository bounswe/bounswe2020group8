from django.shortcuts import render
from django.utils import timezone
from .models import Product
from .api.search import Search
from .forms import Input
from django.shortcuts import redirect

# Create your views here.

def list_products(request):
    return render(request, 'list_products.html', {})
def product_detail(request):
    return render(request, 'product_detail.html', {})
def search_new(request):
    if request.method == "GET":
        key = request.GET.get('search')
        return render(request,'search_new.html', {'response':Search.search(key)})
    else:
        return render(request, 'search_new.html',{})
