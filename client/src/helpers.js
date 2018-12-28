// parses the date to format that's accepted in the Kiwi API query
function parseDate(e) {
    return `${e.getDate()}/${(e.getMonth() + 1)}/${e.getUTCFullYear()}`;
}

export { parseDate };
