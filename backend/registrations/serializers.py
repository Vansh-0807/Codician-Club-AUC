from rest_framework import serializers
from .models import Candidate, ClubSetting, AboutUs, College, Domain, Event, EventImage, Leadership, CoreTeamMember, GuestSpeaker

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

class ClubSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubSetting
        fields = ['logo', 'tagline', 'linkedin_url', 'email', 'instagram_url']

class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ['text']

class CollegeSerializer(serializers.ModelSerializer):   
    class Meta:
        model = College
        fields = '__all__'

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__'

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['image']

class EventSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'text', 'images']

class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = '__all__'

class CoreTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreTeamMember
        fields = '__all__'


class GuestSpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestSpeaker
        fields = '__all__'
