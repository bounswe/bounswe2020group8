import requests
import os
from django.conf import settings

shipment_info = {
    'aras': {
        'prices': {
            'same_city': 5,
            'same_country': 10,
        },
        'international_shipment': 0
    },
    'mng': {
        'prices': {
            'same_city': 8.5,
            'same_country': 13.4,
        },
        'international_shipment': 1
    },
    'yurtici': {
        'prices': {
            'same_city': 6.5,
            'same_country': 10.5,
        },
        'international_shipment': 0
    },
    'ptt': {
        'prices': {
            'same_city': 4,
            'same_country': 8.5,
        },
        'international_shipment': 1
    },
    'ups': {
        'prices': {
            'same_city': 14,
            'same_country': 23,
        },
        'international_shipment': 1
    },
    'other': {
        'prices': {
            'same_city': 6,
            'same_country': 10,
        },
        'international_shipment': 0
    }

}


class MapsAPI:
    baseURL = 'https://maps.googleapis.com/maps/api'


    @staticmethod
    def reverse_geocoding(latitude, longitude):
        r = requests.get(f'{MapsAPI.baseURL}/geocode/json', params={
            'latlng': str(latitude) + ',' + str(longitude),
            'key': MapsAPI.get_api_key()
        })
        return r.json()

    @staticmethod
    def estimate_prices(products, customer_lat, customer_loc):
        customer_loc = MapsAPI.reverse_geocoding(customer_lat, customer_loc)
        products_with_estimated_price = []
        for product in products:
            product_loc = MapsAPI.reverse_geocoding(product.lat, product.lon)


            if product.is_free_shipment:
                shipment_price_estimation = 0
                shipment_type = 'Free'
            elif MapsAPI.get_city(product_loc) == MapsAPI.get_city(customer_loc):
                shipment_price_estimation = shipment_info[product.cargo_company]['prices']['same_city']
                shipment_type = 'Same City'
            elif MapsAPI.get_country(product_loc) == MapsAPI.get_country(customer_loc):
                shipment_price_estimation = shipment_info[product.cargo_company]['prices']['same_country']
                shipment_type = 'Inter City'
            elif shipment_info[product.cargo_company]['international_shipment']:
                shipment_price_estimation = 100
                shipment_type = 'International'
            else:
                shipment_price_estimation = 0
                shipment_type = 'Invalid'

            products_with_estimated_price.append({
                'title': product.title,
                'price': product.price,
                'vendor_city': MapsAPI.get_city(product_loc),
                'customer_city': MapsAPI.get_city(customer_loc),
                'shipment_type': shipment_type,
                'cargo_company': product.cargo_company,
                'shipment_price_estimation': shipment_price_estimation,
                'estimated_price': (product.price + shipment_price_estimation if shipment_type != 'Invalid' else 'International shippment is not available')
            })

        return products_with_estimated_price

    @staticmethod
    def get_city(loc):
        if loc:
            if loc['results']:
                for ac in loc['results'][0]['address_components']:
                    if 'administrative_area_level_1' in ac['types']:
                        return ac['long_name']
                return None
            else:
                return None
        return None

    @staticmethod
    def get_country(loc):
        if loc:
            if loc['results']:
                for ac in loc['results'][0]['address_components']:
                    if 'country' in ac['types']:
                        return ac['long_name']
                return None
            else:
                return None
        return None

    @staticmethod
    def get_api_key():
        with open(os.path.join(settings.BASE_DIR, 'shipment_calculator', 'google_api', 'api_key.txt')) as f:
            return f.readline()
