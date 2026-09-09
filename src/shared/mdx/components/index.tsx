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
import StackList from './StackList'
import CaseSummary from './CaseSummary'
import VectorPlot from './VectorPlot'
import MatrixPlayground from './MatrixPlayground'
import LinearCombo from './LinearCombo'
import { PseudoCodeLine, PseudoCode } from './PseudoCode'

export const components: MDXComponents = {
  PseudoCode,
  PseudoCodeLine,
  ImageBox,
  StackList,
  CaseSummary,
  VectorPlot,
  MatrixPlayground,
  LinearCombo,
  TOCInline,
  a: CustomLink,
  pre: CodeBlock,
  table: TableWrapper,
  Audioplayer,
  WebsiteEmbed,
  MathBox,
  Reference,
}
