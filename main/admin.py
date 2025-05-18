# main/admin.py
from django.contrib import admin
from .models import ContactMessage, Skill, Project, ProjectCategory

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'level', 'view_category', 'sub_category_name', 'icon_recolor', 'order')
    list_filter = ('view_category', 'level', 'sub_category_name', 'icon_recolor')
    search_fields = ('name', 'sub_category_name', 'associated_frameworks')
    list_editable = ('order', 'icon_recolor', 'level')
    fieldsets = (
        (None, {
            'fields': ('name', 'level', 'icon_path', 'icon_recolor')
        }),
        ('Categorization & Display', {
            'fields': ('view_category', 'sub_category_name', 'order')
        }),
        ('Details (Optional)', {
            'classes': ('collapse',),
            'fields': ('associated_frameworks',),
        }),
    )

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_featured', 'get_categories_display')
    list_filter = ('categories', 'is_featured')
    search_fields = ('title', 'short_description', 'long_description', 'tech_stack_list')
    list_editable = ('order', 'is_featured')
    filter_horizontal = ('categories',)
    fieldsets = (
        (None, {
            'fields': ('title', 'poster_image_path', 'short_description', 'is_featured', 'order')
        }),
        ('Links & URLs', {
            'fields': ('github_url', 'live_url', 'demo_url_name')
        }),
        ('Details & Categorization', {
            'fields': ('long_description', 'tech_stack_list', 'categories')
        }),
    )

    def get_categories_display(self, obj):
        return ", ".join([category.name for category in obj.categories.all()])
    get_categories_display.short_description = 'Categories'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'timestamp')
    search_fields = ('name', 'email', 'message')
    ordering = ('-timestamp',)