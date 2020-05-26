from django.test import TestCase
from ..models import Vendor
from ..models import Product

class VendorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Vendor.objects.create(first_name )
        pass

    def test_create_vendor_without_first_name(self):
        new_vendor = Vendor.objects.create(
            first_name = "",
            last_name = "Kaya",
            email = "ykaya932@gmail.com",
            lat = -32,
            lon = 54,
        )

        self.assertFalse(isinstance(new_vendor, Vendor))