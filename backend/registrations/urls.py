from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'candidates', views.CandidateViewSet, basename='candidate')
router.register(r'domains', views.DomainViewSet, basename='domain')
router.register(r'events', views.EventViewSet, basename='event')
router.register(r'leadership', views.LeadershipViewSet, basename='leadership')
router.register(r'core-team', views.CoreTeamViewSet, basename='core-team')

urlpatterns = [
    path('api/settings/', views.ClubSettingView.as_view(), name='club_settings'),
    path('api/about_us/', views.AboutUsView.as_view(), name='about_us'),
    path('api/college/', views.CollegeView.as_view(), name='college'),
    path('api/', include(router.urls)),
]
