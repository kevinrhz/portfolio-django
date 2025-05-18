from django.db import models
from django.utils.text import slugify

class Skill(models.Model):
    LEVEL_CHOICES = [
        ('basic', 'Basic'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    # For the main filter buttons on the skills page
    VIEW_CATEGORY_CHOICES = [
        ('swe', 'Software Engineering'),
        ('dsml', 'Data Science & ML'),
        ('common', 'Common Skills'),
        # ('math', 'Mathematics'),
    ]

    name = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    view_category = models.CharField(
        max_length=20,
        choices=VIEW_CATEGORY_CHOICES,
        help_text="Main category for view toggle (SWE, DS/ML, Common)"
    )
    sub_category_name = models.CharField(
        max_length=100,
        help_text="e.g., Languages, Frameworks, DevOps, Libraries & Toolkits, Databases"
    )
    icon_path = models.CharField(
        max_length=200,
        blank=True, null=True,
        help_text="Path to icon, e.g., 'icons/python-icon.svg'"
    )
    icon_recolor = models.BooleanField(
        default=False,
        help_text="Check if this icon is black and needs the creamsicle gradient"
    )
    associated_frameworks = models.TextField(
        blank=True,
        help_text="For language skills, list associated frameworks/libraries (e.g., Django, Flask, PyQt6 for Python)"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Order of display within its sub-category"
    )
    
    def get_associated_frameworks_list(self):
        if self.associated_frameworks:
            return [fw.strip() for fw in self.associated_frameworks.split(',') if fw.strip()]
        return []

    def __str__(self):
        return f"{self.name} ({self.get_level_display()}) - {self.sub_category_name}"

    class Meta:
        ordering = ['view_category', 'sub_category_name', 'order', 'name']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

class ProjectCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, help_text="URL-friendly version of name, e.g., 'web-dev'")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = "Project Category"
        verbose_name_plural = "Project Categories"

class Project(models.Model):
    title = models.CharField(max_length=200)
    poster_image_path = models.CharField(max_length=255, blank=True, null=True, help_text="e.g., 'images/poster-echolab.jpg'")
    short_description = models.CharField(max_length=255)
    long_description = models.TextField(blank=True)
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    demo_url_name = models.CharField(max_length=100, blank=True, null=True, help_text="Name of the URL pattern for Django's {% url %} tag if demo is internal (e.g., 'cinesteam_demo')")
    # details_page_slug = models.SlugField(max_length=200, blank=True, null=True, help_text="Slug for a dedicated details page if any")

    tech_stack_list = models.CharField(max_length=500, blank=True, help_text="Comma-separated list of key technologies")
    categories = models.ManyToManyField(ProjectCategory, blank=True, help_text="Select categories for filtering")
    order = models.PositiveIntegerField(default=0, help_text="Order of display")
    is_featured = models.BooleanField(default=False, help_text="Highlight this project?")

    def __str__(self):
        return self.title

    def get_tech_stack_as_list(self):
        if self.tech_stack_list:
            return [tech.strip() for tech in self.tech_stack_list.split(',') if tech.strip()]
        return []

    def get_category_slugs_for_data_attr(self):
        return " ".join([cat.slug for cat in self.categories.all()])

    class Meta:
        ordering = ['order', 'title']
        verbose_name = "Project"
        verbose_name_plural = "Projects"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email}) — {self.timestamp.strftime('%Y-%m-%d %H:%M')}"