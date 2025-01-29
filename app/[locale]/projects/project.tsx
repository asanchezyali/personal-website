'use client'
import projectsData from '@/data/projectsData'
import Card from '@/components/projectcard'
import { LocaleTypes } from '../i18n/settings'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'

const Project = () => {
  const locale = useParams()?.locale as LocaleTypes
  const projectArray = projectsData[locale]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.8, // Delay all children to start after header
        staggerChildren: 0.2, // Stagger each project card
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="w-full" variants={container} initial="hidden" animate="show">
      {projectArray?.map((project) => (
        <motion.div key={project.title} variants={item}>
          <Card
            title={project.title}
            description={project.description}
            imgSrc={project.imgSrc}
            href={project.href}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Project
