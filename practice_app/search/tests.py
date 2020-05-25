from django.test import TestCase, RequestFactory, Client
from django.urls import reverse, resolve
from .views import search

# Create your tests here.

class TestUrls(TestCase):
    def test_search_url(self):
        url = reverse('search')
        self.assertEquals(resolve(url).func, search)

class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.search_url = reverse('search')

    def test_product_list_get(self):
        response = self.client.get(self.search_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'search/search.html')

    def test_product_list_post(self):
        response = self.client.post(self.search_url, {
            'product': 'some-queryKey'
            })

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'search/search.html')

    def test_product_list_post_no_data(self):
        response = self.client.post(self.search_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'search/search.html')