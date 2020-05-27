from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Product(models.Model):
    title = models.CharField(max_length=200)
    imageUrl = models.CharField(max_length=300, blank=True, null=True)
    created_date = models.DateTimeField(default=timezone.now)
    price = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.title


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    username = models.CharField(max_length=30)
    name = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True)
    ordered_products = models.ManyToManyField(Product, through='Purchase', through_fields=('customer', 'ordered_product'), blank=True)
    is_anonymous = False
    is_authenticated = True

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user']

    def __str__(self):
        return self.username

class Purchase(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    ordered_product = models.ForeignKey(Product, on_delete=models.CASCADE)

class WillBuy(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    probability = models.FloatField()

    class Meta:
        unique_together = ('customer', 'product')

class Similarity(models.Model):
    customer1 = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer1')
    customer2 = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer2')
    similarity = models.FloatField()

    class Meta:
        unique_together = ('customer1', 'customer2')

    
