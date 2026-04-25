import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'

type HomeProps = { params: Promise<{ locale: LocaleTypes }> }

export default async function Home(props: HomeProps) {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'home')

  return (
    <section className="hero" style={{ minHeight: 'calc(100dvh - 64px)', display: 'flex', alignItems: 'center' }}>
      <div className="copy">
        <span className="status-pill"><span className="dot"></span> {t('hero.roll')}</span>
        <h1 style={{ fontSize: 'clamp(36px, 5.2vw, 60px)', lineHeight: 1.05, margin: '18px 0' }}>
          {t('hero.title_1')}
        </h1>
        <p className="muted" style={{ fontSize: 18, maxWidth: '52ch' }}>{t('hero.title_2')}</p>
      </div>
    </section>
  )
}
