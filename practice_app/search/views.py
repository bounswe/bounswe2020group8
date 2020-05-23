from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect  
import requests

# Create your views here.
def search(request):
    
    
    productList = response.json()
    n = productList["Product"]
    return render(request, 'search/search.html', {"name": n})


