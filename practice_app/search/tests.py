from django.test import TestCase, RequestFactory, Client
from django.urls import reverse, resolve
from .views import search, search2

# Create your tests here.

class TestUrls(TestCase):
    def test_search_url(self):
        url = reverse('search')
        self.assertEquals(resolve(url).func, search)

    def test_search2_url(self):
        url = reverse('search2', args=['some-slug'])
        self.assertEquals(resolve(url).func, search2)

class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.search_url = reverse('search')
        self.search2_url = reverse('search2', args=['some-slug'])

    def test_product_list_get(self):
        response = self.client.get(self.search2_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/search.html')

    def test_product_list_get_no_data(self):
        response = self.client.get(self.search_url)

        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'main/search.html')

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