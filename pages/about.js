import React from 'react'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'

const DEFAULT_LAYOUT = 'AuthorLayout'

const LifeLineEN = [
  {
    date: 'Apr. 2021 - Aug. 2024',
    description: (
      <>
        <p>
          Full-stack Software Developer at{' '}
          <a
            href="https://monadical.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Monadical
          </a>
          , I contributed to several key projects:
        </p>
        <ul className="ml-8 list-outside list-disc">
          <li>
            <a
              href="https://zohuddle.monadical.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              ZoHuddle
            </a>
            : A ranked-matching video conferencing platform using Django, React, and Twilio API.
          </li>
          <li>
            <a
              href="https://www.samuraiarmy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Samurari-Army
            </a>
            : An NFT platform built on Ethereum.
          </li>
          <li>
            <a
              href="https://virtue.poker/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Virtue Poker
            </a>
            : A blockchain-based poker platform.
          </li>
          <li>
            Cyber Pharmacy: An e-commerce platform for cannabis derivatives with cryptocurrency
            payments.
          </li>
          <li>
            VC Tools: An AI tool using large language models for investor information retrieval.
          </li>
        </ul>
        <p>
          Key achievements include developing full-stack applications, building AI tools,
          contributing to blockchain solutions, and publishing articles on AI and mathematics.
        </p>
      </>
    ),
    company: 'Monadical',
  },
  {
    date: 'Jan. 2010 - Oct. 2021',
    description: (
      <>
        <p>
          Mathematics and Physics Professor at the{' '}
          <a
            href="https://www.udea.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            University of Antioquia
          </a>
          . I taught various courses including:
        </p>
        <ul className="ml-8 list-inside list-disc">
          <li>Machine Learning</li>
          <li>Differential Equations</li>
          <li>Special Mathematics</li>
          <li>Physics</li>
          <li>Thermodynamics</li>
          <li>Fluid Mechanics</li>
          <li>Linear Algebra</li>
          <li>Advanced Calculus</li>
        </ul>
        <p>
          Additionally, I supervised a degree project focused on the intersection of Category Theory
          and Machine Learning.
        </p>
      </>
    ),
    company: 'Universidad de Antioquia',
  },
  {
    date: 'Aug. 2018 - Oct. 2020',
    description: (
      <>
        <p>
          Full-stack Software Developer at{' '}
          <a
            href="https://www.bcfort.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            BCFort
          </a>
          , I led software development, delivering innovative blockchain solutions. Key projects
          included:
        </p>
        <ul className="ml-8 list-outside list-disc">
          <li>
            Developing a private blockchain for mineral traceability using Hyperledger Fabric and
            IBM Blockchain Platform.
          </li>
          <li>Creating a secure blockchain-based voting system.</li>
        </ul>
        <p>
          I managed cloud infrastructure on AWS, GCP, and IBM Cloud, and mentored junior engineers
          to improve team performance.
        </p>
      </>
    ),
    company: 'BCFort',
  },
  {
    date: 'Jan. 2017 - Nov. 2019',
    description: (
      <p>
        Professor at the{' '}
        <a
          href="https://www.usbmed.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
        >
          University of San Buenaventura
        </a>
        , where I taught Thermodynamics, Modern Physics, Differential Equations, and Special
        Mathematics for the Faculty of Engineering.
      </p>
    ),
    company: 'Universidad de San Buenaventura Medellín',
  },
  {
    date: 'Jan. 2010 - Sep. 2013',
    description: (
      <p>
        Completed MSc in Mathematics at the{' '}
        <a
          href="https://www.udea.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
        >
          University of Antioquia
        </a>
        , focusing on the theory of Affine Immersions in Homogeneous Manifolds.
      </p>
    ),
    company: 'Universidad de Antioquia',
  },
  {
    date: 'Jan. 2004 - Oct. 2009',
    description: (
      <p>
        Earned BSc in Mathematics and Physics Education from the{' '}
        <a
          href="https://www.udea.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
        >
          University of Antioquia
        </a>
        , with a focus on advanced mathematics topics and a thesis on teaching fluid mechanics.
      </p>
    ),
    company: 'Universidad de Antioquia',
  },
]

const LifeLineES = [
  {
    date: 'Abr. 2021 - Ago. 2024',
    description: (
      <>
        <p>
          Desarrollador Software Full-Stack en{' '}
          <a
            href="https://monadical.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Monadical
          </a>
          , contribuí a varios proyectos clave:
        </p>
        <ul className="ml-8 list-outside list-disc">
          <li>
            <a
              href="https://zohuddle.monadical.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              ZoHuddle
            </a>
            : Una plataforma de videoconferencia con emparejamiento clasificado, utilizando Django,
            React y la API de Twilio.
          </li>
          <li>
            <a
              href="https://www.samuraiarmy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Samurari-Army
            </a>
            : Una plataforma NFT construida en Ethereum.
          </li>
          <li>
            <a
              href="https://virtue.poker/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Virtue Poker
            </a>
            : Una plataforma de póker basada en blockchain.
          </li>
          <li>
            Cyber Pharmacy: Una plataforma de comercio electrónico para derivados del cannabis con
            pagos en criptomonedas.
          </li>
          <li>
            VC Tools: Una herramienta de IA que utiliza modelos de lenguaje grandes para la
            recuperación de información para inversores.
          </li>
        </ul>
        <p>
          Logros clave incluyen el desarrollo de aplicaciones full-stack, la construcción de
          herramientas de IA, la contribución a soluciones blockchain y la publicación de artículos
          sobre IA y matemáticas.
        </p>
      </>
    ),
    company: 'Monadical',
  },
  {
    date: 'Ene. 2010 - Oct. 2021',
    description: (
      <>
        <p>
          Profesor de Matemáticas y Física en la{' '}
          <a
            href="https://www.udea.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Universidad de Antioquia
          </a>
          . Impartí varios cursos incluyendo:
        </p>
        <ul className="ml-8 list-inside list-disc">
          <li>Aprendizaje Automático</li>
          <li>Ecuaciones Diferenciales</li>
          <li>Matemáticas Especiales</li>
          <li>Física</li>
          <li>Termodinámica</li>
          <li>Mecánica de Fluidos</li>
          <li>Álgebra Lineal</li>
          <li>Cálculo Avanzado</li>
        </ul>
        <p>
          Además, supervisé un proyecto de grado centrado en la intersección de la Teoría de
          Categorías y el Aprendizaje Automático.
        </p>
      </>
    ),
    company: 'Universidad de Antioquia',
  },
  {
    date: 'Ago. 2018 - Oct. 2020',
    description: (
      <>
        <p>
          Desarrollador de Software Full-Stack en{' '}
          <a
            href="https://www.bcfort.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            BCFort
          </a>
          , lideré el desarrollo de software, entregando soluciones innovadoras de blockchain. Los
          proyectos clave incluyeron:
        </p>
        <ul className="ml-8 list-outside list-disc">
          <li>
            Desarrollo de una blockchain privada para la trazabilidad de minerales utilizando
            Hyperledger Fabric y la plataforma IBM Blockchain.
          </li>
          <li>Creación de un sistema de votación seguro basado en blockchain.</li>
        </ul>
        <p>
          Gestioné la infraestructura en la nube en AWS, GCP e IBM Cloud, y mentoré a ingenieros
          junior para mejorar el rendimiento del equipo.
        </p>
      </>
    ),
    company: 'BCFort',
  },
  {
    date: 'Ene. 2017 - Nov. 2019',
    description: (
      <p>
        Profesor en la{' '}
        <a
          href="https://www.usbmed.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
        >
          Universidad de San Buenaventura
        </a>
        , donde impartí Termodinámica, Física Moderna, Ecuaciones Diferenciales y Matemáticas
        Especiales para la Facultad de Ingeniería.
      </p>
    ),
    company: 'Universidad de San Buenaventura Medellín',
  },
  {
    date: 'Ene. 2010 - Sep. 2013',
    description: (
      <p>
        Completé mi Maestría en Matemáticas en la{' '}
        <a
          href="https://www.udea.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
        >
          Universidad de Antioquia
        </a>
        , enfocándome en la teoría de Inmersiones Afines en Variedades Homogéneas.
      </p>
    ),
    company: 'Universidad de Antioquia',
  },
  {
    date: 'Ene. 2004 - Oct. 2009',
    description: (
      <p>
        Obtuve mi Licenciatura en Educación Matemática y Física de la{' '}
        <a
          href="https://www.udea.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
        >
          Universidad de Antioquia
        </a>
        , con un enfoque en temas avanzados de matemáticas y una tesis sobre la enseñanza de la
        mecánica de fluidos.
      </p>
    ),
    company: 'Universidad de Antioquia',
  },
]

const EventCard = ({ date, description, company }) => {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="hidden xl:block">
        <div className=" flex  h-full flex-row">
          <p className="mt-[-5px] w-[304px] flex-none text-right text-gray-500 dark:text-gray-400">
            {date}
          </p>

          <div className="mx-4 flex flex-col items-center">
            <div className="h-4 w-4 flex-shrink-0 flex-grow-0 rounded-full bg-primary-500"></div>
            <div className="w-[2px] flex-grow bg-primary-500"></div>
          </div>
        </div>
      </div>
      <div className="block xl:hidden">
        <div className="mb-4 flex flex-col">
          <p className="text-xl font-bold">{company}</p>
          <p className=" text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>

      <div className="mb-16 w-auto border-b-[1px] border-gray-200  pb-8 leading-[1.75] text-gray-600 xl:mt-[-35px] dark:border-gray-700 dark:text-gray-300">
        <p className="hidden text-xl font-bold xl:block">{company}</p>
        {description}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const AboutInEN = await getFileBySlug('authors', ['default'])
  const AboutInES = await getFileBySlug('authors', ['default.es'])
  const authorDetails = { AboutInEN, AboutInES }
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { language } = React.useContext(LanguageContext)
  const { mdxSource, frontMatter } = authorDetails[`AboutIn${language.toUpperCase()}`]
  const LifeLine = language === 'en' ? LifeLineEN : LifeLineES
  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <h2 className="mb-20 mt-12 w-full text-center text-2xl font-bold text-gray-900 xl:w-[320px] dark:text-gray-100">
        {language === 'en' ? 'Professional Life Line' : 'Línea de Vida Profesional'}
      </h2>
      {LifeLine.map((event, index) => (
        <EventCard
          key={index}
          date={event.date}
          description={event.description}
          company={event.company}
        />
      ))}
    </>
  )
}
