from django.urls import path
from . import views

urlpatterns = [

    path('add_vendor/', views.post_vendor),
    path('add_product/', views.post_product),
    path('<param>/', views.list_products)

]
