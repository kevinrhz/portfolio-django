from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def projects(request):
    return render(request, 'projects.html')

def contact(request):
    return render(request, 'contact.html')
  
def cinesteam_demo(request):
    return render(request, 'cinesteam.html')

def gallery_pc(request):
    items = []  # placeholder
    return render(request, 'gallery_pc.html', {'items': items})
