from django.test import TestCase
from ..models import Vendor
from ..models import Product
from django.core.exceptions import ValidationError
from ..forms import VendorForm
from ..forms import ProductForm
from django.utils import timezone

class VendorFormTest(TestCase):

    def test_vendor_form_with_valid_data(self):
        form = VendorForm(data={
            'first_name': 'Yasin',
            'last_name': 'Kaya',
            'email': 'ykaya932@gmail.com',
            'lat': 30,
            'lon': 20
        })

        self.assertTrue(form.is_valid())

    def test_vendor_form_without_first_name(self):
        form = VendorForm(data={
            'first_name': '',
            'last_name': 'Kaya',
            'email': 'ykaya932@gmail.com',
            'lat': 30,
            'lon': 20
        })

        self.assertFalse(form.is_valid())

    def test_vendor_form_with_invalid_location(self):
        form = VendorForm(data={
            'first_name': 'Yasin',
            'last_name': 'Kaya',
            'email': 'ykaya932@gmail.com',
            'lat': -300,
            'lon': 20
        })

        self.assertFalse(form.is_valid())

    def test_vendor_form_with_wrong_email(self):
        form = VendorForm(data={
            'first_name': 'Yasin',
            'last_name': 'Kaya',
            'email': 'ykaya932',
            'lat': 30,
            'lon': 20
        })

        self.assertFalse(form.is_valid())

    def test_vendor_form_with_wrong_type(self):
        form = VendorForm(data={
            'first_name': 'Yasin',
            'last_name': 'Kaya',
            'email': 'ykaya932@gmail.com',
            'lat': 'wow',
            'lon': 20
        })

        self.assertFalse(form.is_valid())

