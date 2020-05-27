from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_products, name ='list_products'),
    path('search_new', views.search_new, name='search_new'),
]
