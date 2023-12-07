from course.models import Course
from course.serializers import CourseSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def courses(request):
    if request.method == 'GET':
        data = Course.objects.all()
        serializer = CourseSerializer(data, many=True)
        return Response({'courses': serializer.data})
    
    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response({'course': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def course(request, id):
    try:
        data = Course.objects.get(pk=id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = CourseSerializer(data)
        return Response({'course': serializer.data})
    
    if request.method == 'POST':
        serializer = CourseSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'course:': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    