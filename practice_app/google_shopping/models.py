from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator

class Product(models.Model):
    search_key = models.TextField()
    title = models.CharField(max_length=200)
    currency = models.TextField()
    price = models.FloatField(
        validators=[
            MinValueValidator(0)
        ]
    )
    google_shopping_id = models.PositiveIntegerField()
   

    def release_product(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
