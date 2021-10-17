from django.db import models

# Create your models here.
class CrudUsers(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=20)

    def __str__(self):
        return str(self.id)+self.email