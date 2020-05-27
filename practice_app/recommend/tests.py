from django.test import TestCase
from .models import Customer
from .models import Product
from .models import Similarity
from .models import WillBuy

# Create your tests here.

class CustomerTest(TestCase):
    def create_customer(self, user, email):
        return Customer.objects.create(user=user, email=email)
    
    def setUp(self):
        user = User.objects.create(username='menekse')
        email = 'menekse@mail.com'
        self.create_customer(user, email)
        user = User.objects.create(username='altan')
        email = 'altan@mail.com'
        self.create_customer(user, email)


    def test_customer_creation(self):
        self.setUp()
        menekse = Customer.objects.get(email='menekse@mail.com')
        self.assertTrue(isinstance(menekse, Customer))
        self.assertEqual(menekse.__unicode__(), menekse.user.username)