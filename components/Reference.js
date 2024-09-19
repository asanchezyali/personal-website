import React from 'react'
import Arxiv from './logos/Arxiv'
import Github from './logos/Github'
import Jupyter from './logos/Jupyter'
import Image from './logos/Image'
import YouTube from './logos/YouTube'
import Web from './logos/Web'
import HuggingFace from './logos/HuggingFace'
import CustomLink from './Link'

const SourceType = {
  arxiv: Arxiv,
  github: Github,
  jupyter: Jupyter,
  image: Image,
  youtube: YouTube,
  web: Web,
  huggingface: HuggingFace,
}

const getSourceType = (type) => {
  console.log(type)
  return SourceType[type] || SourceType.web
}

const truncateText = (text, maxLength) => {
  const str = String(text)
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + ' ...'
}

const Reference = ({ type, url, text }) => {
  const Source = getSourceType(type)
  const truncatedText = truncateText(text, 70)

  return (
    <div className="mb-2 flex items-center space-x-2">
      <Source className="h-5 w-5" />
      <CustomLink href={url} className="inline-block">
        {truncatedText}
      </CustomLink>
    </div>
  )
}

export default Reference
