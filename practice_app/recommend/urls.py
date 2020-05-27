from django.urls import path
from . import views

urlpatterns = [
    path('recommendation/', views.recommendation, name='recommendation'),

    path('recommendation/customers/', views.customer_list, name='customer_list'),
    path('recommendation/customer/<int:pk>/', views.customer_detail, name='customer_detail'),
    path('recommendation/customer/new/', views.customer_new, name='customer_new'),


    path('recommendation/products/', views.product_list, name='product_list'),
    path('recommendation/product/<int:pk>/', views.product_detail, name='product_detail'),
    path('recommendation/product/new/', views.product_new, name='product_new'),
    path('recommendation/product/<int:pk>/edit/', views.product_edit, name='product_edit'),
    path('recommendation/orderedproducts/<int:pk>', views.ordered_product_list, name='ordered_product_list'),
    
]

