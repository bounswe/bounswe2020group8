from django.urls import path
from . import views

urlpatterns = [
    path('album/', views.recommendation_album, name='recommendation_album'),
    path('customer/<int:pk>/', views.recommendation, name='recommendation'),

    path('customers/', views.customer_list, name='customer_list'),
    path('customer/detail/<int:pk>/', views.customer_detail, name='customer_detail'),
    path('customer/new/', views.customer_new, name='customer_new'),


    path('products/', views.product_list, name='product_list'),
    path('product/<int:pk>/', views.product_detail, name='product_detail'),
    path('product/new/', views.product_new, name='product_new'),
    path('product/<int:pk>/edit/', views.product_edit, name='product_edit'),
    path('orderedproducts/<int:pk>', views.ordered_product_list, name='ordered_product_list'),
    
]

