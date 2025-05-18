from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm
from .models import ContactMessage, Skill, Project, ProjectCategory
    
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def projects(request):
    all_projects = Project.objects.filter(is_featured=False).order_by('order') # Or however you want to order
    featured_projects = Project.objects.filter(is_featured=True).order_by('order') # Example for featured
    
    # Get all unique categories that are actually used by projects, for filter buttons
    project_categories_qs = ProjectCategory.objects.filter(project__isnull=False).distinct().order_by('name')
    
    # If you want to pass a simple list of category slugs for JavaScript to know all possible filters:
    # available_filter_slugs = [cat.slug for cat in project_categories_qs]

    context = {
        'projects': all_projects,
        'featured_projects': featured_projects, # If you implement featured
        'project_categories': project_categories_qs, # For generating filter buttons dynamically
    }
    return render(request, 'projects.html', context)

def skills(request):
    # Fetch all skills and group them by view_category and then sub_category_name
    # This grouping makes it easier to render in the template.
    
    grouped_skills = {
        'swe': {},
        'dsml': {},
        'common': {}
    }
    
    all_db_skills = Skill.objects.all().order_by('view_category', 'sub_category_name', 'order', 'name')

    for skill in all_db_skills:
        view_cat = skill.view_category
        sub_cat = skill.sub_category_name
        if view_cat in grouped_skills:
            if sub_cat not in grouped_skills[view_cat]:
                grouped_skills[view_cat][sub_cat] = []
            grouped_skills[view_cat][sub_cat].append(skill)
            
    context = {
        'swe_skills_grouped': grouped_skills.get('swe', {}),
        'dsml_skills_grouped': grouped_skills.get('dsml', {}),
        'common_skills_grouped': grouped_skills.get('common', {}),
    }
    return render(request, 'skills.html', context)

# ... your other views (contact, cinesteam_demo, gallery_pc) ...
# Ensure your contact view still correctly uses ContactForm and ContactMessage
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_message = form.save()
            full_message = f"From: {contact_message.name} <{contact_message.email}>\n\n{contact_message.message}"
            send_mail(
                subject="Portfolio Contact Form",
                message=full_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
            messages.success(request, "Your message has been sent successfully!")
            return redirect('contact')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})

def cinesteam_demo(request):
    return render(request, 'cinesteam.html')

def gallery_pc(request):
    items = [] 
    return render(request, 'gallery_pc.html', {'items': items})