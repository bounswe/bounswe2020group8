import unittest
from .api.search import Search

class Test(unittest.TestCase):
        def test(self):
            s = Search.search("lapto")
            self.assertIsNotNone(s)
            self.assertTrue(s.startswith("Product"))
if __name__ == '__main__':
    unittest.main()
