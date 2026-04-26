import TOCInline from 'pliny/ui/TOCInline'
import CodeBlock from './CodeBlock'
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
  pre: CodeBlock,
  table: TableWrapper,
  Audioplayer,
  WebsiteEmbed,
  MathBox,
  Reference,
}
