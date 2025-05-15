from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .forms import ContactForm
from .models import ContactMessage

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def projects(request):
    return render(request, 'projects.html')

def skills(request):
    return render(request, 'skills.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save to database
            contact_message = form.save()

            # Send email
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
    items = []  # placeholder
    return render(request, 'gallery_pc.html', {'items': items})
