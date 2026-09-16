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
import DragVector from './DragVector'
import LinearSystem2D from './LinearSystem2D'
import EliminationSteps from './EliminationSteps'
import MatMulGrid from './MatMulGrid'
import Broadcasting from './Broadcasting'
import TransposeGrid from './TransposeGrid'
import Conditioning from './Conditioning'
import GradientSteps from './GradientSteps'
import CosineSimilarity from './CosineSimilarity'
import SolutionSet from './SolutionSet'
import LUFactors from './LUFactors'
import SolveCost from './SolveCost'
import MinusOneTrick from './MinusOneTrick'
import NumericalRank from './NumericalRank'
import GaussJordanInverse from './GaussJordanInverse'
import InverseAccuracy from './InverseAccuracy'
import FillIn from './FillIn'
import SolverChooser from './SolverChooser'
import SubspaceTest from './SubspaceTest'
import ShapeOrientation from './ShapeOrientation'
import ProjectionOnto from './ProjectionOnto'
import BestSubspace from './BestSubspace'
import GramSchmidt from './GramSchmidt'
import DependenceDegree from './DependenceDegree'
import CoordinatesInBasis from './CoordinatesInBasis'
import EnergyCompaction from './EnergyCompaction'
import LowRankImage from './LowRankImage'
import LoRABudget from './LoRABudget'
import LinearityCheck from './LinearityCheck'
import LayerCollapse from './LayerCollapse'
import TransformGallery from './TransformGallery'
import HomogeneousCompose from './HomogeneousCompose'
import Diagonalise from './Diagonalise'
import SimilarityInvariants from './SimilarityInvariants'
import FourSubspaces from './FourSubspaces'
import MinimumNorm from './MinimumNorm'
import AffineHyperplane from './AffineHyperplane'
import AffineCombination from './AffineCombination'
import SVDEllipse from './SVDEllipse'
import EigenVsSingular from './EigenVsSingular'
import ScalingLaw from './ScalingLaw'
import AttentionMask from './AttentionMask'
import DecodingStrategies from './DecodingStrategies'
import KVCacheCost from './KVCacheCost'
import PermutationOrder from './PermutationOrder'
import SentencePairTask from './SentencePairTask'
import SpanCorruption from './SpanCorruption'
import CrossAttention from './CrossAttention'
import ParameterBudget from './ParameterBudget'
import MaskingGranularity from './MaskingGranularity'
import ScaledDotProduct from './ScaledDotProduct'
import NormPlacement from './NormPlacement'
import Distillation from './Distillation'
import CompressionStack from './CompressionStack'
import FeatureVsFineTune from './FeatureVsFineTune'
import AdaptationCost from './AdaptationCost'
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
  DragVector,
  LinearSystem2D,
  EliminationSteps,
  MatMulGrid,
  Broadcasting,
  TransposeGrid,
  Conditioning,
  GradientSteps,
  CosineSimilarity,
  SolutionSet,
  LUFactors,
  SolveCost,
  MinusOneTrick,
  NumericalRank,
  GaussJordanInverse,
  InverseAccuracy,
  FillIn,
  SolverChooser,
  SubspaceTest,
  ShapeOrientation,
  ProjectionOnto,
  BestSubspace,
  GramSchmidt,
  DependenceDegree,
  CoordinatesInBasis,
  EnergyCompaction,
  LowRankImage,
  LoRABudget,
  LinearityCheck,
  LayerCollapse,
  TransformGallery,
  HomogeneousCompose,
  Diagonalise,
  SimilarityInvariants,
  FourSubspaces,
  MinimumNorm,
  AffineHyperplane,
  AffineCombination,
  SVDEllipse,
  EigenVsSingular,
  ScalingLaw,
  AttentionMask,
  DecodingStrategies,
  KVCacheCost,
  PermutationOrder,
  SentencePairTask,
  SpanCorruption,
  CrossAttention,
  ParameterBudget,
  MaskingGranularity,
  ScaledDotProduct,
  NormPlacement,
  Distillation,
  CompressionStack,
  FeatureVsFineTune,
  AdaptationCost,
  TOCInline,
  a: CustomLink,
  pre: CodeBlock,
  table: TableWrapper,
  Audioplayer,
  WebsiteEmbed,
  MathBox,
  Reference,
}
