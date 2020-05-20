from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_products),
    path('add_product', views.post_product)
]
