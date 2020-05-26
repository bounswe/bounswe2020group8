from django.conf.urls import url
from django.urls import path
from tracker import views

urlpatterns = [
    path('', views.track, name='Track Page'),
    path('results/', views.track_results, name='Result Page'),
]
