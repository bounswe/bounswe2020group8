from django import forms

#from .models import Product

#class Input(forms.ModelForm):
class Input(forms.Form):
    value = forms.CharField(widget=forms.Textarea)
    class Meta:
        fields = ('value',)

