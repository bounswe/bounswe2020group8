from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.calculate_price, name="calculate_price"),
    # path("calculate_shipment_price?<latitude>&<longitude>&<int:product_id>", calculate_price, name="calculate_price"),
]
