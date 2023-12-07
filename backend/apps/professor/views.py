from professor.models import Professor
from professor.serializers import ProfessorSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import ProtectedError

@api_view(['GET', 'POST'])
def professors(request):
    if request.method == 'GET':        
        data = Professor.objects.all()
        serializer = ProfessorSerializer(data, many=True)
        return Response({'professors': serializer.data})
    
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'professors': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def professor(request, id):
    try:
        data = Professor.objects.get(pk=id)
    except Professor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfessorSerializer(data)
        return Response({'professor': serializer.data})
    
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data, data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response({'professor': serializer.data})
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