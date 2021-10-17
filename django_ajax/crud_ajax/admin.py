from django.contrib import admin
from .models import CrudUsers
# Register your models here.
@admin.register(CrudUsers)
class Admin(admin.ModelAdmin):
    list_display = ['id' , 'email' , 'password']

