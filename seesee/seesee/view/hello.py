from django.http import HttpResponse
from django.shortcuts import render
from django.http import request

def hello(request):
    content = {}
    return render(request, 'index.tpl', content)
