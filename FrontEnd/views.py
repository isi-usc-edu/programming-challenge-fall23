from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required

# Create your views here.
def indexPage(request, *args, **kwargs):
    return render(request, 'frontend/index.html')