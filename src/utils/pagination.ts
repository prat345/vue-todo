export const getPagination = (page: number, pageNum: number) => {
  const arr = [...Array(pageNum).keys()]
  const out = []
  if (arr.length <= 3) {
    return Array.from({ length: arr.length }, (_, index) => index + 1)
  }
  if (page <= 2) {
    out.push(1, 2, '...', arr.length)
    return out
  }
  if (arr.length - page < 3) {
    out.push(arr.length - 2, arr.length - 1, arr.length)
    return out
  }
  for (let i = 1; i < arr.length; i++) {
    if (page - i > 2 || i > page) continue
    out.push(i)
  }
  // if (arr.length - page <= 2) out.push(arr.length-1,arr.length)
  if (arr.length - page > 2) out.push('...', arr.length)
  return out
}
