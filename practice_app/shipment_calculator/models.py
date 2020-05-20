from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

CARGO_COMPANY_CHOICES = (
    ('aras', 'Aras Kargo'),
    ('mng', 'MNG Kargo'),
    ('yurtici', 'Yurtici Kargo'),
    ('ptt', 'PTT Kargo'),
    ('ups', 'UPS'),
    ('other', 'Other')
)


class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    amount_left = models.PositiveIntegerField()
    price = models.FloatField(
        validators=[
            MinValueValidator(0)
        ]
    )
    brand = models.CharField(max_length=200)
    is_free_shipment = models.BooleanField()
    release_date = models.DateTimeField(default=timezone.now)
    cargo_company = models.CharField(max_length=10,
                                     choices=CARGO_COMPANY_CHOICES,
                                     default='other')

    lat = models.FloatField(
        validators=[
            MinValueValidator(-90),
            MaxValueValidator(90)
        ]
    )
    lon = models.FloatField(
        validators=[
            MinValueValidator(-180),
            MaxValueValidator(180)
        ]
    )

    def release_product(self):
        self.release_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title