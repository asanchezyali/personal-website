import React from 'react'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'
import MonadicalLogo from '@/components/logos/Monadical'
import Image from '@/components/Image'
import Link from 'next/link'

const DEFAULT_LAYOUT = 'AuthorLayout'

const LifeLineEN = [
  {
    date: 'Feb. 2024 - Current',
    description: (
      <p>
        This year, I am back at the
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            University of Antioquia
          </a>
        </Link>
        , where I am currently working on give a course on the Mathematics Laboratory with Python.
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
  {
    date: 'Apr. 2021 - Current',
    description: (
      <>
        <p>
          Currently, I work as a full-stack software developer at the company{' '}
          <a
            href="https://monadical.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Monadical
          </a>
          . Here I have had the opportunity to participate in several projects related to standard
          software, blockchain, and artificial intelligence. Some of these projects include:
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
            : a video conferencing application where participants create profiles and rate each
            other based on common interests. Implemented with Django on the backend, integrating the
            Twilio video conferencing API, and a React frontend. WebSocket communication through
            Django channels.
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
            : an NFT platform for G2-Sports.
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
            : a web-based poker platform that allows anyone to create their own cash table,
            tournament, or club in 60 seconds or less, and invite their friends.
          </li>
          <li>
            <a
              href="https://solanart.io/collections/cyberpharmacist"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Cyber Pharmacy
            </a>
            : a marketplace for NFTs and weed derivatives.
          </li>
        </ul>
        <br />
        <>And I have also had the opportunity to write some articles for the company's blog:</>
        <ul className="ml-8 list-outside list-disc">
          <li>
            <a
              href="https://monadical.com/posts/modular-arithmetic.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              "How to build a modular arithmetic library in Python"
            </a>
            , where I explain how to create a library for modular arithmetic, using operator
            overloading and redefining built-in functions for NumPy.
          </li>
          <li>
            <a
              href="https://monadical.com/posts/how-to-build-a-talking-avatar-with-azure-cognitive-langchain-and-openai.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              "Kraken the Code: How to Build a Talking Avatar"
            </a>
            , where I teach how to create your own conversational avatar with Azure Cognitive,
            LangChain, and OpenAI. You can see the result{' '}
            <a
              href="https://github.com/Monadical-SAS/zippy-avatar-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              here
            </a>
            .
          </li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://monadical.com/">
        <a target="_blank" rel="noopener noreferrer">
          <MonadicalLogo className="w-16" />
        </a>
      </Link>
    ),
  },
  {
    date: 'Sep. 2021 - Apr. 2023',
    description: (
      <p>
        I served as advisor for student{' '}
        <Link href="https://www.luispapiernik.dev/">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Luis Papiernik
          </a>
        </Link>
        's thesis on {''}
        <a
          href={'/files/papiernik-thesis.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
          download
        >
          Category Theory Applied to Supervised Learning Algorithms
        </a>{' '}
        at the{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            University of Antioquia
          </a>
        </Link>
        .
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
  {
    date: 'Agu. 2018 - Oct. 2020',
    description: (
      <>
        <p>
          At{' '}
          <Link href="https://www.bcfort.com/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              BCFort
            </a>
          </Link>
          , I was in charge of Backend Software Development for various projects, using Python,
          Node.js, MongoDB, IPFS and Blockchain; analyze data using Pandas, JupyterLab Hub, and
          MongoDB; manage servers on AWS, GCLOUD, and IBM CLOUD; monitor and manage tasks for
          various development teams; and train and select junior software developers.I participated
          in the following projects:
        </p>
        <br />
        <ul className="ml-8 list-outside list-disc">
          <li>
            Private blockchain for mineral traceability using Hyperledger Fabric and IBM blockchain
            Platform.
          </li>
          <li>
            {' '}
            Blockchain of documents and voting system using Python, Node.js, Ethereum and Telegram
            Bots.
          </li>
          <li>Theory of Relativity</li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://www.bcfort.com/">
        <a target="_blank" rel="noopener noreferrer">
          <Image
            src="/logos/BCFort.jpeg"
            alt="UdeA"
            width={570}
            height={570}
            className="rounded-lg"
          />
        </a>
      </Link>
    ),
  },

  {
    date: 'Jan. 2017 - Nov. 2019',
    description: (
      <>
        <p>
          Mathematics and Physics Professor at the{' '}
          <Link href="https://www.usbmed.edu.co/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              University of Antioquia
            </a>
          </Link>
          , Mathematics professor at the University of San Buenaventura, I had the opportunity to
          teach several courses including:
        </p>
        <br />
        <ul className="ml-8 list-inside list-disc">
          <li>Vector Calculus</li>
          <li>Numerical Methods with Python</li>
          <li>Calculus of Complex Variables</li>
          <li>Differential Equations</li>
          <li>Thermodinamics</li>
          <li>Theory of Relativity</li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://www.usbmed.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/USB.svg" alt="UdeA" width={570} height={570} className="rounded-lg" />
        </a>
      </Link>
    ),
  },
  {
    date: 'Jan. 2010 - Oct. 2021',
    description: (
      <>
        <p>
          Mathematics and Physics Professor at the{' '}
          <Link href={'https://www.udea.edu.co/'}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              University of Antioquia
            </a>
          </Link>
          , Mathematics professor at the University of Antioquia, I had the opportunity to teach
          several courses including:
        </p>
        <br />
        <ul className="ml-8 list-inside list-disc">
          <li>Vector Calculus</li>
          <li>Linear Algebra</li>
          <li>Euclidean Geometry</li>
          <li>Machine Learning</li>
          <li>History of Mathematics</li>
          <li>Fluid Mechanics</li>
          <li>Mechanics of Motion</li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },

  {
    date: 'Jan. 2010 - Sep. 2013',
    description: (
      <p>
        MSc in Mathematics at the{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            University of Antioquia
          </a>
        </Link>
        , where I worked with{' '}
        <Link href={'https://www.researchgate.net/profile/Carlos-Marin-7'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Carlos Alberto Marin
          </a>
        </Link>
        , on the theory of{' '}
        <a
          href={'/files/own-thesis.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
          download
        >
          Affine Immersions in Homogeneous Manifolds
        </a>{' '}
        (in Spanish). During this period, I also worked as a professor at the University of
        Antioquia and had the opportunity to meet one of my best friends,{' '}
        <Link href={'https://github.com/juanArias8'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Juan David Arias
          </a>
        </Link>
        , with whom I began to program and explore the world of machine learning.
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
  {
    date: 'Jan. 2004 - Oct. 2009',
    description: (
      <p>
        BSc in Mathematics and Physics Education from the{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            University of Antioquia
          </a>
        </Link>
        . During my studies, I focused on various advanced mathematics topics, including complex
        analysis, abstract algebra, differential geometry, and number theory. My undergraduate
        thesis focused on teaching fluid mechanics, combining my passion for physics with education.
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
]

const LifeLineES = [
  {
    date: 'Feb. 2024 - Actual',
    description: (
      <p>
        Este año, estoy de vuelta en la{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Universidad de Antioquia
          </a>
        </Link>
        , donde actualmente trabajo en el curso de Laboratorio de Matemáticas con Python.
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
  {
    date: 'Abr. 2021 - Actual',
    description: (
      <>
        <p>
          Actualmente, trabajo como desarrollador de software full-stack en la empresa{' '}
          <a
            href="https://monadical.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Monadical
          </a>
          . Aquí he tenido la oportunidad de participar en varios proyectos relacionados con
          software estándar, blockchain e inteligencia artificial. Algunos de estos proyectos
          incluyen:
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
            : una aplicación de videoconferencia donde los participantes crean perfiles y se
            califican entre sí en función de intereses comunes. Implementado con Django en el
            backend, integrando la API de videoconferencia de Twilio y un frontend de React.
            Comunicación por WebSocket a través de canales de Django.
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
            : una plataforma NFT para G2-Sports.
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
            : una plataforma de póker basada en la web que permite a cualquiera crear su propia mesa
            de efectivo, torneo o club en 60 segundos o menos e invitar a sus amigos.
          </li>
          <li>
            <a
              href="https://solanart.io/collections/cyberpharmacist"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Cyber Pharmacy
            </a>
            : un mercado para NFTs y derivados de la marihuana.
          </li>
        </ul>
        <br />
        <>
          Y también he tenido la oportunidad de escribir algunos artículos para el blog de la
          empresa:
        </>
        <ul className="ml-8 list-outside list-disc">
          <li>
            <a
              href="https://monadical.com/posts/modular-arithmetic.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              "How to build a modular arithmetic library in Python"
            </a>
            , donde explico cómo crear una biblioteca para aritmética modular, utilizando la
            sobrecarga de operadores y la redefinición de funciones integradas para NumPy.
          </li>
          <li>
            <a
              href="https://monadical.com/posts/how-to-build-a-talking-avatar-with-azure-cognitive-langchain-and-openai.html"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              "Kraken the Code: How to Build a Talking Avatar"
            </a>
            , donde enseño cómo crear tu propio avatar conversacional con Azure Cognitive, LangChain
            y OpenAI. Puedes ver el resultado{' '}
            <a
              href="https://github.com/Monadical-SAS/zippy-avatar-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              aquí
            </a>
            .
          </li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://monadical.com/">
        <a target="_blank" rel="noopener noreferrer">
          <MonadicalLogo className="w-16" />
        </a>
      </Link>
    ),
  },
  {
    date: 'Sep. 2021 - Abr. 2023',
    description: (
      <p>
        Fui asesor de la tesis del estudiante{' '}
        <Link href="https://www.luispapiernik.dev/">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Luis Papiernik
          </a>
        </Link>{' '}
        sobre{' '}
        <a
          href={'/files/papiernik-thesis.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
          download
        >
          Teoría de Categorías Aplicada a Algoritmos de Aprendizaje Supervisado
        </a>{' '}
        en la{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Universidad de Antioquia
          </a>
        </Link>
        .
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
  {
    date: 'Ago. 2018 - Oct. 2020',
    description: (
      <>
        <p>
          En{' '}
          <Link href="https://www.bcfort.com/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              BCFort
            </a>
          </Link>
          , estuve a cargo del Desarrollo de Software de Backend para varios proyectos, utilizando
          Python, Node.js, MongoDB, IPFS y Blockchain; analizar datos utilizando Pandas, JupyterLab
          Hub y MongoDB; administrar servidores en AWS, GCLOUD e IBM CLOUD; supervisar y gestionar
          tareas para varios equipos de desarrollo; y formar y seleccionar desarrolladores de
          software junior. Participé en los siguientes proyectos:
        </p>
        <br />
        <ul className="ml-8 list-outside list-disc">
          <li>
            Blockchain privada para la trazabilidad de minerales utilizando Hyperledger Fabric y la
            plataforma de blockchain de IBM.
          </li>
          <li>
            {' '}
            Blockchain de documentos y sistema de votación utilizando Python, Node.js, Ethereum y
            Bots de Telegram.
          </li>
          <li>Teoría de la Relatividad</li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://www.bcfort.com/">
        <a target="_blank" rel="noopener noreferrer">
          <Image
            src="/logos/BCFort.jpeg"
            alt="UdeA"
            width={570}
            height={570}
            className="rounded-lg"
          />
        </a>
      </Link>
    ),
  },

  {
    date: 'Ene. 2017 - Nov. 2019',
    description: (
      <>
        <p>
          Profesor de Matemáticas y Física en la{' '}
          <Link href="https://www.usbmed.edu.co/">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Universidad de Antioquia
            </a>
          </Link>
          , Profesor de Matemáticas en la Universidad de San Buenaventura, tuve la oportunidad de
          enseñar varios cursos incluyendo:
          <br />{' '}
        </p>
        <ul className="ml-8 list-inside list-disc">
          <li>Cálculo Vectorial</li>
          <li>Métodos Numéricos con Python</li>
          <li>Cálculo de Variables Complejas</li>
          <li>Ecuaciones Diferenciales</li>
          <li>Termodinámica</li>
          <li>Teoría de la Relatividad</li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://www.usbmed.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/USB.svg" alt="UdeA" width={570} height={570} className="rounded-lg" />
        </a>
      </Link>
    ),
  },
  {
    date: 'Ene. 2010 - Oct. 2021',
    description: (
      <>
        <p>
          Profesor de Matemáticas y Física en la{' '}
          <Link href={'https://www.udea.edu.co/'}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary-500 underline"
            >
              Universidad de Antioquia
            </a>
          </Link>
          , tuve la oportunidad de enseñar varios cursos incluyendo:
          <br />
        </p>
        <ul className="ml-8 list-inside list-disc">
          <li>Cálculo Vectorial</li>
          <li>Álgebra Lineal</li>
          <li>Geometría Euclidiana</li>
          <li>Aprendizaje Automático</li>
          <li>Historia de las Matemáticas</li>
          <li>Mecánica de Fluidos</li>
          <li>Mecánica del Movimiento</li>
        </ul>
      </>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },

  {
    date: 'Ene. 2010 - Sep. 2013',
    description: (
      <p>
        MSc en Matemáticas en la{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Universidad de Antioquia
          </a>
        </Link>
        , donde trabajé con{' '}
        <Link href={'https://www.researchgate.net/profile/Carlos-Marin-7'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Carlos Alberto Marin
          </a>
        </Link>
        , en la teoría de{' '}
        <a
          href={'/files/own-thesis.pdf'}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-primary-500 underline"
          download
        >
          Inmersiones Afines en Variedades Homogéneas
        </a>{' '}
        (en español). Durante este período, también trabajé como profesor en la Universidad de
        Antioquia y tuve la oportunidad de conocer a uno de mis mejores amigos,{' '}
        <Link href={'https://github.com/juanArias8'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Juan David Arias
          </a>
        </Link>
        , con quien comencé a programar y explorar el mundo del aprendizaje automático.
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
  {
    date: 'Ene. 2004 - Oct. 2009',
    description: (
      <p>
        Licenciatura en Educación Matemática y Física de la{' '}
        <Link href={'https://www.udea.edu.co/'}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-primary-500 underline"
          >
            Universidad de Antioquia
          </a>
        </Link>
        . Durante mis estudios, me centré en varios temas avanzados de matemáticas, incluyendo
        análisis complejo, álgebra abstracta, geometría diferencial y teoría de números. Mi tesis de
        pregrado se centró en la enseñanza de la mecánica de fluidos, combinando mi pasión por la
        física con la educación.
      </p>
    ),
    logo: (
      <Link href="https://www.udea.edu.co/">
        <a target="_blank" rel="noopener noreferrer">
          <Image src="/logos/UdeA.svg" alt="UdeA" width={570} height={570} />
        </a>
      </Link>
    ),
  },
]

const EventCard = ({ date, description, logo }) => {
  return (
    <div className="flex flex-col xl:flex-row">
      <div className="hidden xl:block">
        <div className=" flex  h-full flex-row">
          <p className="mt-[-5px] w-[180px] flex-none text-right text-gray-500 dark:text-gray-400">
            {date}
          </p>

          <div className="mx-4 flex flex-col items-center">
            <div className="h-4 w-4 flex-shrink-0 flex-grow-0 rounded-full bg-primary-500"></div>
            <div className="w-[2px] flex-grow bg-primary-500"></div>
          </div>
          <div className="mr-11 mt-[-30px] flex h-20 w-20 flex-none items-center justify-center rounded-md bg-gray-100 p-3">
            {logo}
          </div>
        </div>
      </div>
      <div className="block xl:hidden">
        <div className="mb-4 flex flex-row items-end">
          <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-100 p-3">
            {logo}
          </div>
          <p className="ml-4 text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>

      <div className="mb-16 w-auto border-b-[1px] border-gray-200  pb-8 leading-[1.75] text-gray-600 xl:mt-[-35px] dark:border-gray-700 dark:text-gray-300">
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
  console.log(language)
  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
      <h2 className="my-12 w-full text-center text-2xl font-bold text-gray-900 xl:w-[320px] dark:text-gray-100">
        Mi Carrera y Educación
      </h2>
      {LifeLine.map((event, index) => (
        <EventCard
          key={index}
          date={event.date}
          description={event.description}
          logo={event.logo}
        />
      ))}
    </>
  )
}
