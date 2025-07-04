from rest_framework import generics
from .serializers import UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    pass
