from django.contrib import admin
from django.urls import path
from apps.student import views as studentViews
from apps.professor import views as professorViews
from apps.classroom import views as classroomViews
from apps.course import views as courseViews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/students/', studentViews.students, name='students'),
    path('api/v1/students/<int:id>', studentViews.student, name='student'),
    path('api/v1/professors/', professorViews.professors, name='professors'),
    path('api/v1/professors/<int:id>', professorViews.professor, name='professor'),
    path('api/v1/classrooms/', classroomViews.classrooms, name='classrooms'),
    path('api/v1/classrooms/<int:id>', classroomViews.classroom, name='classroom'),
    path('api/v1/courses/', courseViews.courses, name='courses'),
    path('api/v1/courses/<int:id>', courseViews.course, name='course'),
]
