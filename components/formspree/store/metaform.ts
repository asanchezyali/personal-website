import { z } from 'zod'

export const digitalSolutions = [
  'Desarrollo de sitio web',
  'Aplicación móvil',
  'E-commerce',
  'CRM personalizado',
  'Sistema de gestión de contenidos (CMS)',
  'Automatización de procesos',
  'Inteligencia artificial y machine learning',
  'Análisis de datos y BI',
  'Seguridad informática',
  'Cloud computing',
  'Internet de las cosas (IoT)',
  'Realidad virtual/aumentada',
  'Marketing digital y SEO',
  'Integración de sistemas',
  'Consultoría tecnológica',
] as const

export const contactFormSchema = z.object({
  companyName: z.string().min(1, 'El nombre de la empresa es requerido'),
  email: z.string().email('Email inválido'),
  companySize: z.enum(['1-10', '11-50', '51-200', '200+'], {
    required_error: 'Selecciona el tamaño de la empresa',
  }),
  industry: z.string().min(1, 'La industria es requerida'),
  budget: z.enum(['0-500000', '500000-1000000', '1000000-5000000', '5000000+'], {
    required_error: 'Selecciona un rango de presupuesto',
  }),
  needs: z.array(z.string()).min(1, 'Selecciona al menos una opción'),
  urgency: z.enum(['Inmediato', 'Corto plazo', 'Mediano plazo', 'Largo plazo'], {
    required_error: 'Selecciona el nivel de urgencia',
  }),
  source: z.enum(
    [
      'Redes sociales',
      'Evento físico',
      'Evento online',
      'Búsqueda en internet',
      'Referido',
      'Otro',
    ],
    {
      required_error: 'Selecciona cómo nos conociste',
    }
  ),
})
