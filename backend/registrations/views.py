from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from .serializers import CandidateSerializer, ClubSettingSerializer, AboutUsSerializer, CollegeSerializer, DomainSerializer, EventSerializer, LeadershipSerializer, CoreTeamMemberSerializer, GuestSpeakerSerializer
from .models import Candidate, ClubSetting, AboutUs, College, Domain, Event, Leadership, CoreTeamMember, GuestSpeaker

class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer

class LeadershipViewSet(viewsets.ModelViewSet):
    queryset = Leadership.objects.all()
    serializer_class = LeadershipSerializer

    @action(detail=False, methods=['get'])
    def mentors(self, request):
        mentors = self.get_queryset().filter(role='Mentor')
        serializer = self.get_serializer(mentors, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def leaders(self, request):
        leaders = self.get_queryset().exclude(role='Mentor')
        serializer = self.get_serializer(leaders, many=True)
        return Response(serializer.data)

class CoreTeamViewSet(viewsets.ModelViewSet):
    queryset = CoreTeamMember.objects.all()
    serializer_class = CoreTeamMemberSerializer


class GuestSpeakerViewSet(viewsets.ModelViewSet):
    queryset = GuestSpeaker.objects.all()
    serializer_class = GuestSpeakerSerializer

class SingletonAPIView(APIView):
    """
    A base API view for singleton models.
    Requires 'model_class' and 'serializer_class' to be set in subclasses.
    """
    model_class = None
    serializer_class = None

    def get_object(self):
        return self.model_class.load()

    def get(self, request):
        obj = self.get_object()
        serializer = self.serializer_class(obj, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        obj = self.get_object()
        serializer = self.serializer_class(obj, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        return self.post(request)

    def delete(self, request):
        obj = self.get_object()
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ClubSettingView(SingletonAPIView):
    model_class = ClubSetting
    serializer_class = ClubSettingSerializer

class AboutUsView(SingletonAPIView):
    model_class = AboutUs
    serializer_class = AboutUsSerializer

class CollegeView(SingletonAPIView):
    model_class = College
    serializer_class = CollegeSerializer
