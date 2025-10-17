from django.contrib import admin
from .models import Project, Skill, Testimonial, BlogPost, ContactMessage, Service


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created', 'featured')
    list_filter = ('featured', 'date_created')
    search_fields = ('title', 'description')
    list_editable = ('featured',)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'date_created')
    list_filter = ('date_created',)
    search_fields = ('name', 'company')


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created', 'published')
    list_filter = ('published', 'date_created')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('published',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'date_sent', 'read')
    list_filter = ('read', 'date_sent')
    search_fields = ('name', 'subject', 'email')
    list_editable = ('read',)
    readonly_fields = ('date_sent',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price_from')
    search_fields = ('title', 'description')