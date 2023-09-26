from django.urls import path
from .views import authUser, getStoreStats, fetchProducts, addToCart, getCartCount, getCart

urlpatterns = [
    path('authUser', authUser),
    path('getStoreStats', getStoreStats),
    path('fetchProducts', fetchProducts),
    path('addToCart', addToCart),
    path('getCartCount', getCartCount),
    path('getCart', getCart),
]