import unittest
from tracker_api import *

class SimpleTest(unittest.TestCase):

        #Returns True or False.
    def test_api(self):
        test_country = "Turkey"
        results = get_country(test_country)# Check whether result exits
        self.assertIsNotNone(results)# Check whether results have right fields
        self.assertTrue(results.keys() >= {
            'Cases: ',
            'Deaths: ',
            'Recovered: ',
            'Active: ',
            'Critical: ',
            'Cases per One Million: ',
            'Deaths per One Million: ',
            'Tests: ',
            'Tests per One Million: ',
            'Population: '
        })

if __name__ == '__main__':
    unittest.main()
