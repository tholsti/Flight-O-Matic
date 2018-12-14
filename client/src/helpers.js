// parses the date to format that's accepted in the Kiwi API query
function parseDate(e) {
  e = e.getDate() + '/' + (e.getMonth() + 1) + '/' + e.getUTCFullYear()
  return e
}

export { parseDate }