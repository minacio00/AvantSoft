from django.db import models
from customers.models import Customer


class Sale(models.Model):
    customer = models.ForeignKey(
        Customer, related_name="vendas", on_delete=models.CASCADE
    )
    data = models.DateField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.customer.nomeCompleto} – {self.data} – {self.valor}"
