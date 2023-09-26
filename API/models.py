import uuid
from django.db import models

def generateOrderID():
    return str(uuid.uuid4()).split('-')[-1].upper()

# Create your models here.
class User(models.Model):
    ID = models.AutoField(primary_key = True)
    userName = models.CharField(max_length = 255, blank = False)
    createdAt = models.DateTimeField(auto_now_add = True)