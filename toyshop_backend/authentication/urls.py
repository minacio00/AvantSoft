from django.urls import path
from .views import UserCreateView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("signup/", UserCreateView.as_view(), name="signup"),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
