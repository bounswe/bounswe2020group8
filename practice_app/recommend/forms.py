from django import forms

from .models import Product
from .models import Customer

class ProductForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ('title', 'price',)


class CustomerForm(forms.ModelForm):

    class Meta:
        model = Customer
        fields = ('username', 'email', 'ordered_products')
