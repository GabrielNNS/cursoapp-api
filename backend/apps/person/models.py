from django.db import models

class Person(models.Model):
    class Meta:
        abstract = True

    name = models.CharField('name', max_length=50)
    birthday = models.DateField('birthday')
    address = models.CharField('address', max_length=200)   
    phone = models.CharField('phone number', max_length=20)
    email = models.EmailField('email',null=False, blank=False)
    GENDER_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Feminino'),
        ('O', 'Outro'),
    )
    gender = models.CharField('gender', max_length=1, choices=GENDER_CHOICES)