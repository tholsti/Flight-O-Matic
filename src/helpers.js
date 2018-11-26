function parseDate(e) {
  e = e.getDate() + '/' + (e.getMonth() + 1) + '/' + e.getUTCFullYear()
  return e
}

export { parseDate }