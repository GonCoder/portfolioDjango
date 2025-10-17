from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.core.paginator import Paginator
from django.http import HttpResponse, Http404
from .models import Project, Skill, Testimonial, BlogPost, ContactMessage, Service
from .forms import ContactForm
import os
from django.conf import settings


def home(request):
    """Vista para la página de inicio"""
    featured_projects = Project.objects.filter(featured=True)[:3]
    skills = Skill.objects.all()[:8]
    testimonials = Testimonial.objects.all()[:3]
    
    context = {
        'featured_projects': featured_projects,
        'skills': skills,
        'testimonials': testimonials,
    }
    return render(request, 'portfolio/home.html', context)


def about(request):
    """Vista para la página Acerca de mí"""
    skills = Skill.objects.all()
    skills_by_category = {}
    for skill in skills:
        if skill.category not in skills_by_category:
            skills_by_category[skill.category] = []
        skills_by_category[skill.category].append(skill)
    
    context = {
        'skills_by_category': skills_by_category,
    }
    return render(request, 'portfolio/about.html', context)


def projects(request):
    """Vista para la página de proyectos"""
    projects_list = Project.objects.all()
    paginator = Paginator(projects_list, 6)
    page_number = request.GET.get('page')
    projects = paginator.get_page(page_number)
    
    context = {
        'projects': projects,
    }
    return render(request, 'portfolio/projects.html', context)


def project_detail(request, project_id):
    """Vista para el detalle de un proyecto"""
    project = get_object_or_404(Project, id=project_id)
    related_projects = Project.objects.exclude(id=project_id)[:3]
    
    context = {
        'project': project,
        'related_projects': related_projects,
    }
    return render(request, 'portfolio/project_detail.html', context)


def services(request):
    """Vista para la página de servicios"""
    services = Service.objects.all()
    
    context = {
        'services': services,
    }
    return render(request, 'portfolio/services.html', context)


def testimonials(request):
    """Vista para la página de testimonios"""
    testimonials_list = Testimonial.objects.all()
    paginator = Paginator(testimonials_list, 6)
    page_number = request.GET.get('page')
    testimonials = paginator.get_page(page_number)
    
    context = {
        'testimonials': testimonials,
    }
    return render(request, 'portfolio/testimonials.html', context)


def blog(request):
    """Vista para la página del blog"""
    posts_list = BlogPost.objects.filter(published=True)
    paginator = Paginator(posts_list, 6)
    page_number = request.GET.get('page')
    posts = paginator.get_page(page_number)
    
    context = {
        'posts': posts,
    }
    return render(request, 'portfolio/blog.html', context)


def blog_detail(request, slug):
    """Vista para el detalle de un post del blog"""
    post = get_object_or_404(BlogPost, slug=slug, published=True)
    related_posts = BlogPost.objects.filter(published=True).exclude(slug=slug)[:3]
    
    context = {
        'post': post,
        'related_posts': related_posts,
    }
    return render(request, 'portfolio/blog_detail.html', context)


def technologies(request):
    """Vista para la página de tecnologías"""
    skills = Skill.objects.all()
    skills_by_category = {}
    for skill in skills:
        if skill.category not in skills_by_category:
            skills_by_category[skill.category] = []
        skills_by_category[skill.category].append(skill)
    
    context = {
        'skills_by_category': skills_by_category,
    }
    return render(request, 'portfolio/technologies.html', context)


def contact(request):
    """Vista para la página de contacto"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Guardar el mensaje
            contact_message = ContactMessage.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                subject=form.cleaned_data['subject'],
                message=form.cleaned_data['message']
            )
            messages.success(request, '¡Gracias por tu mensaje! Te responderé pronto.')
            return redirect('portfolio:contact')
    else:
        form = ContactForm()
    
    context = {
        'form': form,
    }
    return render(request, 'portfolio/contact.html', context)


def download_resume(request):
    """Vista para descargar el currículum"""
    resume_path = os.path.join(settings.STATIC_ROOT or settings.STATICFILES_DIRS[0], 'files', 'resume.pdf')
    
    if os.path.exists(resume_path):
        with open(resume_path, 'rb') as pdf:
            response = HttpResponse(pdf.read(), content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="curriculum_vitae.pdf"'
            return response
    else:
        raise Http404("El archivo del currículum no fue encontrado.")