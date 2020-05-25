from django.urls import path
from . import views

urlpatterns = [
    path("search/", views.search, name="search"),
    path("", views.search, name="home"),
    path("search/<slug:slug>", views.search2, name="search2"),
]