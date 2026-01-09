import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from '../newletter/BlogNewsLetterForm'
import type { MDXComponents } from 'mdx/types'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Audioplayer from './Audioplayer'
import WebsiteEmbed from './WebsiteEmbed'
import MathBox from './MathBox'
import ImageBox from './ImageBox'
import Reference from './Reference'
import { PseudoCodeLine, PseudoCode } from './PseudoCode'

export const components: MDXComponents = {
  PseudoCode,
  PseudoCodeLine,
  ImageBox,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Audioplayer,
  WebsiteEmbed,
  MathBox,
  Reference,
}
