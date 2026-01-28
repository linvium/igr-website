export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("sr-RS", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("sr-RS", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export const formatYear = (year: number): string => {
  return year.toString()
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}
