import Image from './Image'

const ImageBox = ({ src, alt, width, height, children }) => {
  return (
    <div className="mb-[-25px] flex w-full flex-col items-center">
      <Image src={src} alt={alt} width={width} height={height} className="rounded-lg" />
      <div
        className="mt-[-10px] text-[14px] text-gray-800 dark:text-gray-200"
        style={{ width: width }}
      >
        {children}
      </div>
    </div>
  )
}

export default ImageBox
