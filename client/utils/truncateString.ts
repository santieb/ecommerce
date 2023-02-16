const truncateString = (str: string, length=20): string => {
  if (str.length <= length) return str

  return str.slice(0, length-3) + '...'
}

export default truncateString