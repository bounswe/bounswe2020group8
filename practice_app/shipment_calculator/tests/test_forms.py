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

class ProductFormTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Vendor.objects.create(
            first_name='Yasin',
            last_name='Kaya',
            email='ykaya932@gmail.com',
            lat=30,
            lon=40,
        )

    def test_product_form_with_valid_data(self):
        nice_vendor = Vendor.objects.get(email='ykaya932@gmail.com')
        form = ProductForm(data={
            'vendor': nice_vendor,
            'title': 'Apple Watch v32',
            'description': 'An awesome watch.',
            'amount_left': 100,
            'price': 2000,
            'brand': 'Apple',
            'release_date': timezone.now(),
            'cargo_company': 'aras'
        })
        self.assertTrue(form.is_valid())

    def test_product_form_without_vendor(self):
        nice_vendor = Vendor.objects.get(email='ykaya932@gmail.com')
        form = ProductForm(data={
            'vendor': None,
            'title': 'Apple Watch v32',
            'description': 'An awesome watch.',
            'amount_left': 100,
            'price': 2000,
            'brand': 'Apple',
            'release_date': timezone.now(),
            'cargo_company': 'aras'
        })
        self.assertFalse(form.is_valid())

    def test_product_form_invalid_cargo_company(self):
        nice_vendor = Vendor.objects.get(email='ykaya932@gmail.com')
        form = ProductForm(data={
            'vendor': nice_vendor,
            'title': 'Apple Watch v32',
            'description': 'An awesome watch.',
            'amount_left': 100,
            'price': 2000,
            'brand': 'Apple',
            'release_date': timezone.now(),
            'cargo_company': 'fast_cargo_company'
        })
        self.assertFalse(form.is_valid())

    def test_product_form_float_amount_left(self):
        nice_vendor = Vendor.objects.get(email='ykaya932@gmail.com')
        form = ProductForm(data={
            'vendor': nice_vendor,
            'title': 'Apple Watch v32',
            'description': 'An awesome watch.',
            'amount_left': 0.5,
            'price': 2000,
            'brand': 'Apple',
            'release_date': timezone.now(),
            'cargo_company': 'aras'
        })
        self.assertFalse(form.is_valid())

    def test_product_form_negative_price(self):
        nice_vendor = Vendor.objects.get(email='ykaya932@gmail.com')
        form = ProductForm(data={
            'vendor': nice_vendor,
            'title': 'Apple Watch v32',
            'description': 'An awesome watch.',
            'amount_left': 1,
            'price': -20,
            'brand': 'Apple',
            'release_date': timezone.now(),
            'cargo_company': 'aras'
        })
        self.assertFalse(form.is_valid())
