from django.test import TestCase
from ..models import *
from django.core.exceptions import ValidationError
from ..forms import VendorForm
from ..forms import ProductForm
from django.utils import timezone
from ..google_api.utils import MapsAPI

class UtilsTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Vendor.objects.create(
            first_name='Göksu',
            last_name='Başer',
            email='goksubaser@gmail.com',
            lat=30.0,
            lon=40.0,
        )
        Product.objects.create(
            vendor = Vendor.objects.get(email='goksubaser@gmail.com'),
            title = "Test Product0",
            description = "Something",
            amount_left = 3,
            price = 0,
            brand = "Nikey",
            is_free_shipment = False,
            release_date = timezone.now(),
            cargo_company = 'aras',
        )
        Product.objects.create(
            vendor=Vendor.objects.get(email='goksubaser@gmail.com'),
            title="Test Product1",
            description="Something",
            amount_left=3,
            price=0,
            brand="Nikey",
            is_free_shipment=False,
            release_date=timezone.now(),
            cargo_company='mng',
        )
        Product.objects.create(
            vendor=Vendor.objects.get(email='goksubaser@gmail.com'),
            title="Test Product2",
            description="Something",
            amount_left=3,
            price=0,
            brand="Nikey",
            is_free_shipment=False,
            release_date=timezone.now(),
            cargo_company='yurtici',
        )
        Product.objects.create(
            vendor=Vendor.objects.get(email='goksubaser@gmail.com'),
            title="Test Product3",
            description="Something",
            amount_left=3,
            price=0,
            brand="Nikey",
            is_free_shipment=False,
            release_date=timezone.now(),
            cargo_company='ptt',
        )
        Product.objects.create(
            vendor=Vendor.objects.get(email='goksubaser@gmail.com'),
            title="Test Product4",
            description="Something",
            amount_left=3,
            price=0,
            brand="Nikey",
            is_free_shipment=False,
            release_date=timezone.now(),
            cargo_company='ups',
        )
    def test_aras_same_city(self):
        products = Product.objects.all()
        result = MapsAPI.estimate_prices(products, 30.0, 40.0)
        self.assertEqual(result[0]["estimated_price"], 5)

    def test_mng_same_country(self):
        products = Product.objects.all()
        result = MapsAPI.estimate_prices(products, 31.0, 40.0)
        self.assertEqual(result[1]["estimated_price"], 13.4)

    def test_yurtici_international(self):
        products = Product.objects.all()
        result = MapsAPI.estimate_prices(products, 40.0, 40.0)
        self.assertEqual(result[2]["estimated_price"], 'International shippment is not available')

    def test_ptt_international(self):
        products = Product.objects.all()
        result = MapsAPI.estimate_prices(products, 40.0, 40.0)
        self.assertEqual(result[3]["estimated_price"], 100)