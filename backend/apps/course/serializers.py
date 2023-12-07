from rest_framework import serializers
from course.models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    def validate(self, data):
        number_of_students = len(data.get('student'))
        class_room_size = data.get('classroom').get_size()

        if number_of_students <= class_room_size:
            return data
        else: 
            raise serializers.ValidationError(
                "Number of students does not correspond to the size of the classroom!")
        
            
        