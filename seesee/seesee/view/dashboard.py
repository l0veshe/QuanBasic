from django.http import HttpResponse
from django.shortcuts import render
from django.http import request

def dashboard1(request):
    content = {}
    return render(request, 'dashboard1.tpl', content)

def dashboard2(request):
    content = {}
    return render(request, 'dashboard2.tpl', content)
