export const removeSlashAndPoint = (str) => {
  return str.replace(/[/.]/g, '')
}

export const extractLastSegment = (input) => {
  const segments = input.split('/')
  return segments[segments.length - 1]
}
