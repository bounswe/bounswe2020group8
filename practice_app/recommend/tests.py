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
        user = User.objects.create(username='yavuz')
        email = 'y@mail.com'
        self.create_customer(user, email)
        user = User.objects.create(username='leyla')
        email = 'l@mail.com'
        self.create_customer(user, email)


    def test_customer_creation(self):
        self.setUp()
        y = Customer.objects.get(email='y@mail.com')
        l = Customer.objects.get(email='l@mail.com')
        self.assertTrue(isinstance(y, Customer))
#        self.assertTrue(isinstance(l, Customer))
        self.assertEqual(c.__unicode__(), c.user.username)