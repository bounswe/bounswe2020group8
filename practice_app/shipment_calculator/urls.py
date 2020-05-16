from django.urls import path
from . import views

urlpatterns = [
    path(r'', views.calculate_price, name="calculate_price"),
]
