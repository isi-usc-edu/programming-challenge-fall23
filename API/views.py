import requests
from django.urls import reverse
from django.shortcuts import render
from rest_framework import generics
from django.contrib import messages
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseRedirect

cartDict = {}
# Create your views here.
def fetchSpecificProduct(productID):
    productsData = requests.get(f'https://fakestoreapi.com/products/{productID}').json()
    return productsData

@api_view(['POST'])
def authUser(request):
    userName = dict(request.POST.items()).get('name')
    request.session['userName'] = userName
    authResponse = HttpResponseRedirect('/')
    authResponse.set_cookie('userName', userName)
    return authResponse

@api_view(['GET'])
def getStoreStats(request):
    productsList = requests.get('https://fakestoreapi.com/products').json()
    categoriesList = requests.get('https://fakestoreapi.com/products/categories').json()
    prodList = [tempProd['rating']['rate'] for tempProd in productsList]
    prodRatings = [tempProd['rating']['count'] for tempProd in productsList]

    return Response({"productsAvailable": len(productsList), "categoriesAvailable": len(categoriesList), "avgReviews": float(round(sum(prodList)/len(prodList), 2)), "prodRatings": sum(prodRatings)})

@api_view(['GET'])
def fetchProducts(request):
    productsList = requests.get('https://fakestoreapi.com/products').json()
    return Response(productsList)

@api_view(['GET'])
def addToCart(request):
    cartItems = 0
    productID = int(request.GET.get("prodID"))
    if request.session.get('userName') == None or request.session.get('userName') =='':
        return JsonResponse({'success': False, 'message': '"Please login prior to adding new products to cart!"'})
    else:
        userID = request.session['userName']
        userCartData = cartDict.get(userID, {})
        userCartData[productID] = userCartData.get(productID, 0) + 1
        cartDict[userID] = userCartData
        for tempProd in cartDict.get(request.session['userName']):
            cartItems+= cartDict.get(request.session['userName']).get(tempProd)
        
        return JsonResponse({'success': True, 'message': 'Product added to cart successfully!', 'cartItems': cartItems})

@api_view(['GET'])    
def getCartCount(request):
    cartItems = 0
    if request.session.get('userName') == None or request.session.get('userName') =='':
        return JsonResponse({'success': False, 'message': '"Please login prior to fetching cart items!"'})
    else:
        for tempProd in cartDict.get(request.session['userName']):
            cartItems+= cartDict.get(request.session['userName']).get(tempProd)
        
        return JsonResponse({'success': True, 'cartItems': cartItems})

@api_view(['GET'])    
def getCart(request):
    mainResponse, productsList = {}, []
    if cartDict.get(request.session.get('userName')) == None:
        return JsonResponse({'productsList': [], 'subTotal': 0.00, 'tax': 0.00, 'totalAmt': 0.00})
    else:
        for tempProductID in cartDict.get(request.session.get('userName')):
            tempResponse, tempProductsData = {}, requests.get(f'https://fakestoreapi.com/products/{tempProductID}').json()
            tempResponse['title'], tempResponse['image'], tempResponse['price'], tempResponse['quantity'], tempResponse['subtotal'] = tempProductsData['title'], tempProductsData['image'], tempProductsData['price'], cartDict.get(request.session.get('userName')).get(tempProductID), tempProductsData['price'] * cartDict.get(request.session.get('userName')).get(tempProductID)
            productsList.append(tempResponse)

        mainResponse['productsList'] = productsList
        mainResponse['subTotal'] = sum([tempProduct['subtotal'] for tempProduct in productsList])
        mainResponse['tax'] = round(mainResponse['subTotal'] * 0.075, 2)
        mainResponse['totalAmt'] = mainResponse['subTotal'] + mainResponse['tax']
        return JsonResponse(mainResponse)