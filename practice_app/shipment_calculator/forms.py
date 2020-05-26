from django import forms
from .models import Product
from .models import Vendor

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = "__all__"


class VendorForm(forms.ModelForm):
    class Meta:
        model = Vendor
        fields = "__all__"