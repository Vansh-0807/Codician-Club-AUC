from django.db import models

class Candidate(models.Model):
    name = models.CharField(max_length=255)
    enrollment_no = models.CharField(max_length=100, unique=True)
    mobile_no = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    course = models.CharField(max_length=100)
    semester = models.IntegerField()
    position = models.CharField(max_length=100)
    profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.enrollment_no}"

class ClubSetting(models.Model):
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    tagline = models.CharField(max_length=255, default="Where coders become innovators")
    linkedin_url = models.URLField(max_length=500, default="https://www.linkedin.com/company/codician-club/")
    email = models.EmailField(max_length=254, default="club.codician@gmail.com")
    instagram_url = models.URLField(max_length=500, default="https://www.instagram.com/codician_club_official/")
    
    def save(self, *args, **kwargs):
        self.pk = 1 # Enforce singleton by always saving with id=1
        super(ClubSetting, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Club Settings"

class AboutUs(models.Model):
    text = models.TextField(default="Codician Club is an elite network of developers and creators pushing the boundaries of modern software engineering. We are a community-driven organization dedicated to fostering innovation, collaboration, and continuous learning among tech enthusiasts. Whether you are a beginner taking your first steps in coding or an experienced developer building complex architectures, Codician provides the platform, resources, and mentorship to help you build the future.", blank=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super(AboutUs, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "About Us"

class College(models.Model):
    name = models.CharField(max_length=255, default="Amity University Raipur")
    description = models.TextField(default="Established in 1995, our college is a premier institution dedicated to advancing technology and fostering innovation. Recognized nationally for its cutting-edge research facilities and exceptional faculty, it serves as the perfect incubator for the Codician Club to thrive and build the future.")
    image = models.ImageField(upload_to='college/', null=True, blank=True)
    location_name = models.CharField(max_length=255, default="Amity University Raipur, Chhattisgarh", help_text="Text to display for the location link")
    location = models.URLField(max_length=500, default="https://maps.google.com/?q=Amity+University+Raipur", help_text="Google Maps URL for the college location")

    def save(self, *args, **kwargs):
        self.pk = 1
        super(College, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Our College"

class Domain(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='domains/', null=True, blank=True)

    def __str__(self):
        return self.title

class Event(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class EventImage(models.Model):
    event = models.ForeignKey(Event, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='events/')

    def __str__(self):
        return f"Image for {self.event.title}"

class Leadership(models.Model):
    ROLE_CHOICES = [
        ('Mentor', 'Club Mentor'),
        ('President', 'President'),
        ('Vice President', 'Vice President')
    ]
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    description = models.TextField()
    linkedin = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='leadership/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.get_role_display()}"

class CoreTeamMember(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    course = models.CharField(max_length=100)
    semester = models.CharField(max_length=50)
    description = models.TextField()
    linkedin = models.URLField(blank=True, null=True)
    photo = models.ImageField(upload_to='core_team/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.position}"
