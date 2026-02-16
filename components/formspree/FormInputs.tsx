import { ValidationError } from '@formspree/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormInputsProps {
  name: string
  email: string
  message: string
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  state: any
  t: (key: string) => string
}

export const FormInputs: React.FC<FormInputsProps> = ({
  name,
  email,
  message,
  handleNameChange,
  handleEmailChange,
  handleMessageChange,
  state,
  t,
}) => {
  return (
    <>
      <Input
        required
        autoComplete="name"
        id="fullName"
        type="text"
        name="fullName"
        placeholder={t('name')}
        value={name}
        onChange={handleNameChange}
        className="mb-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white"
      />
      <Input
        required
        autoComplete="email"
        id="email"
        type="email"
        name="email"
        placeholder={t('mail')}
        value={email}
        onChange={handleEmailChange}
        className="mb-2 border-black bg-white text-base text-black dark:border-white dark:bg-black dark:text-white"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <Textarea
        required
        id="message"
        name="message"
        placeholder={t('message')}
        value={message}
        onChange={handleMessageChange}
        className="mb-2 border-black bg-white text-base text-black dark:border-white dark:bg-black dark:text-white"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
    </>
  )
}
