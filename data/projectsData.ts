type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'Tuksury Hapkido Club Digital Transformation',
      description: `Discover how a traditional Hapkido club transformed its digital presence with PiAgents, improving student retention and operational efficiency through strategic digital solutions.`,
      imgSrc: '/static/images/blog/tuksury/tuksury.png',
      href: '/blog/tuksury',
    },
  ],

  es: [
    {
      title: 'Transformación digital del Club Tuksury Hapkido',
      description: `Descubre cómo un club tradicional de Hapkido transformó su presencia digital con PiAgents, mejorando la retención de estudiantes y la eficiencia operativa mediante soluciones digitales estratégicas.`,
      imgSrc: '/static/images/blog/tuksury/tuksury.png',
      href: '/blog/tuksury',
    },
  ],
}

export default projectsData
