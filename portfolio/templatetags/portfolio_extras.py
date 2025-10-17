from django import template

register = template.Library()

@register.filter
def split(value, delimiter=','):
    """Divide una cadena por el delimitador especificado"""
    if value:
        return [item.strip() for item in value.split(delimiter)]
    return []

@register.filter  
def strip(value):
    """Elimina espacios en blanco al inicio y final"""
    if value:
        return value.strip()
    return value