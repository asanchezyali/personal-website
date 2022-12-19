import NextImage from 'next/image'
import Image from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const SmartImage = ({ type, alt, ...rest }) => {
  if (type === 'next') {
    return <NextImage alt={alt} {...rest} />
  } else {
    return <Image alt={alt} {...rest} />
  }
}

export default SmartImage
