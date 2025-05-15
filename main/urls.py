from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('projects/', views.projects, name='projects'),
    path('skills/', views.skills, name='skills'),
    path('contact/', views.contact, name='contact'),
    path('cinesteam/', views.cinesteam_demo, name='cinesteam_demo'),
    path('gallery_pc/', views.gallery_pc, name='gallery_pc'),
]
