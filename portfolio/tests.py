from django.test import TestCase
from django.urls import reverse
from .models import Project, Skill, Testimonial, BlogPost, ContactMessage, Service
from .forms import ContactForm


class ProjectModelTest(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Proyecto Test",
            description="Descripción del proyecto test",
            technologies="Python, Django",
            date_created="2024-01-01"
        )
    
    def test_project_str(self):
        self.assertEqual(str(self.project), "Proyecto Test")
    
    def test_project_fields(self):
        self.assertEqual(self.project.title, "Proyecto Test")
        self.assertFalse(self.project.featured)


class ViewsTest(TestCase):
    def test_home_view(self):
        response = self.client.get(reverse('portfolio:home'))
        self.assertEqual(response.status_code, 200)
    
    def test_about_view(self):
        response = self.client.get(reverse('portfolio:about'))
        self.assertEqual(response.status_code, 200)
    
    def test_projects_view(self):
        response = self.client.get(reverse('portfolio:projects'))
        self.assertEqual(response.status_code, 200)
    
    def test_contact_view(self):
        response = self.client.get(reverse('portfolio:contact'))
        self.assertEqual(response.status_code, 200)


class ContactFormTest(TestCase):
    def test_valid_form(self):
        form_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'subject': 'Test Subject',
            'message': 'Este es un mensaje de prueba con suficiente longitud.'
        }
        form = ContactForm(data=form_data)
        self.assertTrue(form.is_valid())
    
    def test_invalid_form_short_name(self):
        form_data = {
            'name': 'A',
            'email': 'test@example.com',
            'subject': 'Test Subject',
            'message': 'Este es un mensaje de prueba.'
        }
        form = ContactForm(data=form_data)
        self.assertFalse(form.is_valid())
        self.assertIn('name', form.errors)