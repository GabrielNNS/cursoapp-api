from django.db import models

class Classroom(models.Model):
    name = models.CharField('Nome', max_length=50)
    location = models.TextField('Location', max_length=100)
    size = models.IntegerField('Size')
    
    class Meta:
        verbose_name_plural = 'classrooms'
        ordering =['id']

    def __str__(self):
        return self.name
    
    def get_size(self):
        return self.size