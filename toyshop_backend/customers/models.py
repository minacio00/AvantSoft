from django.db import models


class Customer(models.Model):
    nomeCompleto = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    nascimento = models.DateField()

    def __str__(self):
        return self.nomeCompleto.__str__()
