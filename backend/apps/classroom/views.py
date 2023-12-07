from classroom.models import Classroom
from classroom.serializers import ClassroomSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import ProtectedError

@api_view(['GET', 'POST'])
def classrooms(request):
    if request.method == 'GET':
        data = Classroom.objects.all()
        serializer = ClassroomSerializer(data, many=True)
        return Response({'classrooms': serializer.data})
    
    elif request.method == 'POST':
        serializer = ClassroomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'classroom': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def classroom(request, id):
    try:
        data = Classroom.objects.get(pk=id)
    except Classroom.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ClassroomSerializer(data)
        return Response({'classroom': serializer.data})

    elif request.method == 'POST':
        serializer = ClassroomSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'classroom': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        try:
            data.delete()
        except ProtectedError as e:
            cursos_linked = []
            linked_objects = e.protected_objects
            for l_obj in linked_objects:
                cursos_linked.append(l_obj.__str__())
            return Response(cursos_linked, status=status.HTTP_409_CONFLICT)
        return Response(status=status.HTTP_204_NO_CONTENT)