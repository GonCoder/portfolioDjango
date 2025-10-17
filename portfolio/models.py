from django.db import models
from django.urls import reverse


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    technologies = models.CharField(max_length=300, help_text="Tecnologías separadas por comas")
    date_created = models.DateField()
    featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-date_created']
    
    def __str__(self):
        return self.title


class Skill(models.Model):
    SKILL_TYPES = [
        ('programming', 'Lenguajes de Programación'),
        ('framework', 'Frameworks'),
        ('database', 'Bases de Datos'),
        ('tool', 'Herramientas'),
        ('other', 'Otros'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=SKILL_TYPES)
    proficiency = models.IntegerField(default=50, help_text="Nivel de 1 a 100")
    logo = models.ImageField(upload_to='skills/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=150)
    company = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    date_created = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date_created']
    
    def __str__(self):
        return f"Testimonio de {self.name}"


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.CharField(max_length=300)
    image = models.ImageField(upload_to='blog/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-date_created']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('portfolio:blog_detail', kwargs={'slug': self.slug})


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-date_sent']
    
    def __str__(self):
        return f"Mensaje de {self.name} - {self.subject}"


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Clase de icono Font Awesome")
    price_from = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    def __str__(self):
        return self.title