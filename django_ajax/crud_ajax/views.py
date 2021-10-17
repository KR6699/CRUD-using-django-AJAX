from django.shortcuts import render
from .models import CrudUsers
from django.http import JsonResponse
# Create your views here.

'''home page'''
def index(request):
    data = CrudUsers.objects.all()
    print('hello')
    dct = {'data':data}
    return render(request, 'base.html', dct)

'''create operation'''
def create(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        print(email,password)
        obj = CrudUsers()
        obj.email = email
        obj.password = password
        obj.save()
        data = {
            'id':obj.id,
            'email':email,
            'password':password
        }
        print(data)
        return JsonResponse(data)

'''delete operation''' 
def delete(request):
    if request.method == 'POST':
        id = request.POST['id']
        print(id,'delete called..')
        CrudUsers.objects.get(id = id).delete()
        data = {
            'deleted':True
        }
        print('delete')
        return JsonResponse(data)

'''update operation'''
def update(request):
    if request.method == 'POST':
        id1 = request.POST['id']
        print(id,'update called..')
        obj = CrudUsers.objects.get(id = id1)
        obj.email = request.POST['email']
        obj.password = request.POST['password']
        obj.save()

        data = {
            'id':obj.id,
            'email':obj.email,
            'password':obj.password
        }
        print(data)
        return JsonResponse(data)