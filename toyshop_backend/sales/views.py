from django.shortcuts import render

from rest_framework import viewsets, decorators, response
from django.db.models import Sum, Avg, Count
from .models import Sale
from .serializers import SaleSerializer


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.select_related("customer").all()
    serializer_class = SaleSerializer

    @decorators.action(detail=False, url_path="daily-stats")
    def daily_stats(self, request):
        qs = self.queryset.values("data").annotate(total=Sum("valor"))
        return response.Response(qs)

    @decorators.action(detail=False, url_path="leaderboards")
    def leaderboards(self, request):
        agg = Sale.objects.values("customer__id", "customer__nomeCompleto").annotate(
            total=Sum("valor"),
            avg=Avg("valor"),
            days=Count("data", distinct=True),
        )
        best_total = max(agg, key=lambda x: x["total"], default=None)
        best_avg = max(agg, key=lambda x: x["avg"], default=None)
        best_freq = max(agg, key=lambda x: x["days"], default=None)
        return response.Response(
            {
                "best_volume": best_total,
                "best_average": best_avg,
                "best_frequency": best_freq,
            }
        )
