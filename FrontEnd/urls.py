from django.urls import path
from .views import indexPage

urlpatterns = [
    path('', indexPage),
    path('login', indexPage),
    path('cart', indexPage)
]