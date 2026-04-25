import Image from './Image'

interface ImageBoxProps {
  src: string
  alt: string
  width: number
  height: number
  children: React.ReactNode
}

const ImageBox = ({ src, alt, width, height, children }) => {
  return (
    <div className="mb-[-25px] mt-8 flex w-full flex-col items-center">
      <Image src={src} alt={alt} width={width} height={height} className="rounded-lg" />
      <div
        className="mt-[-10px] text-[14px] text-gray-800 dark:text-gray-200"
        style={{ maxWidth: width }}
      >
        {children}
      </div>
    </div>
  )
}

export default ImageBox
