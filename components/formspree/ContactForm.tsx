'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

const digitalSolutions = [
  'mobileDev',
  'desktopDev',
  'ai',
  'blockchain',
  'cloudDevops',
  'other',
] as const

interface ContactFormProps {
  onClose: () => void
}

interface ErrorMessageProps {
  message?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1 block text-xs text-[#FF6B6B]"
    >
      {message}
    </motion.span>
  )
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'contact-form')

  const contactFormSchema = z.object({
    companyName: z.string().min(1, t('companyName.error')),
    email: z.string().email(t('email.error')),
    needs: z.array(z.string()).min(1, t('solutions.error')),
    urgency: z.string().min(1, t('urgency.error')),
    message: z.string().optional(),
  })

  type ContactFormData = z.infer<typeof contactFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      const message = `
        Nueva solicitud de contacto:
        Empresa: ${data.companyName}
        Email: ${data.email}
        Necesidades: ${data.needs.join(', ')}
        Urgencia: ${data.urgency}
        Mensaje: ${data.message || 'No especificado'}
      `

      const phoneNumber = '3133835407'
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappLink, '_blank')
      onClose()
    } catch (error) {
      console.error('Error al enviar el formulario:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClassName = `
    mt-2 block w-full rounded-lg border bg-gray-900/30 px-4 py-3 
    text-white placeholder-gray-400 backdrop-blur-sm
    transition-all duration-300
    border-gray-700/50
    focus:border-[#30C5D2] focus:bg-gray-900/50 focus:ring-1 focus:ring-[#30C5D2]
    hover:border-[#30C5D2]/30 hover:bg-gray-900/40
  `

  const labelClassName = `
    block text-sm font-medium text-gray-300
    transition-colors duration-300
  `

  const selectClassName = `
    mt-2 block w-full appearance-none rounded-lg border bg-gray-900/30 
    px-4 py-3 text-white backdrop-blur-sm
    transition-all duration-300
    border-gray-700/50
    focus:border-[#30C5D2] focus:bg-gray-900/50 focus:ring-1 focus:ring-[#30C5D2]
    hover:border-[#30C5D2]/30 hover:bg-gray-900/40
  `

  const checkboxGroupClassName = `
    mt-3 grid grid-cols-2 gap-4 rounded-lg border border-gray-700/50 
    bg-gray-900/30 p-4 backdrop-blur-sm
    transition-all duration-300
    hover:border-[#30C5D2]/30 hover:bg-gray-900/40
  `

  const checkboxClassName = `
    h-4 w-4 rounded border-gray-600 bg-gray-800/50
    text-[#30C5D2] transition-colors duration-300
    focus:ring-2 focus:ring-[#30C5D2] focus:ring-offset-0
    hover:border-[#30C5D2]/50
  `

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="companyName" className={labelClassName}>
          {t('companyName.label')}
        </label>
        <input
          id="companyName"
          placeholder={t('companyName.placeholder')}
          {...register('companyName')}
          className={inputClassName}
        />
        <ErrorMessage message={errors.companyName?.message} />
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          {t('email.label')}
        </label>
        <input
          id="email"
          type="email"
          placeholder={t('email.placeholder')}
          {...register('email')}
          className={inputClassName}
        />
        <ErrorMessage message={errors.email?.message} />
      </div>

      <div>
        <fieldset>
          <legend className={labelClassName}>{t('solutions.label')}</legend>
          <div className={checkboxGroupClassName}>
            {digitalSolutions.map((solution) => (
              <div key={solution} className="relative flex items-center space-x-3">
                <input
                  id={`need-${solution}`}
                  {...register('needs')}
                  type="checkbox"
                  value={solution}
                  className={checkboxClassName}
                />
                <label
                  htmlFor={`need-${solution}`}
                  className="text-sm text-gray-300 transition-colors duration-300 hover:text-[#30C5D2]"
                >
                  {t(`solutions.options.${solution}`)}
                </label>
              </div>
            ))}
          </div>
          <ErrorMessage message={errors.needs?.message} />
        </fieldset>
      </div>

      <div>
        <label htmlFor="urgency" className={labelClassName}>
          {t('urgency.label')}
        </label>
        <select id="urgency" {...register('urgency')} className={selectClassName}>
          <option value="">{t('urgency.placeholder')}</option>
          <option value="immediate">{t('urgency.options.immediate')}</option>
          <option value="shortTerm">{t('urgency.options.shortTerm')}</option>
          <option value="mediumTerm">{t('urgency.options.mediumTerm')}</option>
          <option value="exploring">{t('urgency.options.exploring')}</option>
        </select>
        <ErrorMessage message={errors.urgency?.message} />
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          {t('message.label')}
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          placeholder={t('message.placeholder')}
          className={`${inputClassName} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`
          group relative w-full overflow-hidden rounded-lg 
          bg-gradient-to-r from-[#30C5D2] to-[#9821e2]
          p-[1px] transition-all duration-300
          ${!isValid || isSubmitting ? 'opacity-50' : 'hover:scale-[1.02]'}
        `}
        whileHover={{ scale: isValid && !isSubmitting ? 1.02 : 1 }}
      >
        <div
          className={`
            relative rounded-lg bg-gray-900/90 px-8 py-4
            transition-all duration-300
            group-hover:bg-gray-900/70
          `}
        >
          <span className="block text-center text-lg font-semibold text-white">
            {isSubmitting ? t('submit.sending') : t('submit.default')}
          </span>
        </div>
      </motion.button>
    </form>
  )
}
