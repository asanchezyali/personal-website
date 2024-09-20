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
  return SourceType[type] || SourceType.web
}

const Reference = ({ type, url, text }) => {
  const Source = getSourceType(type)

  return (
    <div className="mb-4 flex space-x-2">
      <div className="h-5 w-5 flex-shrink-0">
        <Source className="h-full w-full" />
      </div>
      <CustomLink href={url} className="mt-[-5px] max-w-[750px] truncate">
        {text}
      </CustomLink>
    </div>
  )
}

export default Reference
