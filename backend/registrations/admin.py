from django.contrib import admin
from .models import Candidate, ClubSetting, AboutUs, College, Domain, Event, EventImage, Leadership, CoreTeamMember

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'enrollment_no', 'course', 'semester', 'position', 'created_at')
    search_fields = ('name', 'enrollment_no', 'email', 'mobile_no')
    list_filter = ('course', 'semester', 'position')
    list_display_links = ('id', 'name')

@admin.register(ClubSetting)
class ClubSettingAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__', 'logo')
    list_display_links = ('id', '__str__')

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ('id', '__str__')
    list_display_links = ('id', '__str__')

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')

@admin.register(Domain)
class DomainAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')
    list_display_links = ('id', 'title')

class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 1

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'created_at')
    list_display_links = ('id', 'title')
    inlines = [EventImageInline]

@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'role', 'linkedin')
    list_display_links = ('id', 'name')
    list_filter = ('role',)

@admin.register(CoreTeamMember)
class CoreTeamMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'position', 'course', 'semester')
    list_display_links = ('id', 'name')
