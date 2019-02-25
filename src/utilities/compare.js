export default function compare (a, b, asc) {
  if (a == null || b == null) {
    if (a == null) {
      return asc ? -1 : 1
    } else if (b == null) {
      return asc ? 1 : -1
    } else {
      return 0
    }
  } else if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, 'en', { sensitivity: 'accent', numeric: true }) * (asc ? 1 : -1)
  } else if ((a instanceof Date && b instanceof Date) || (typeof a === 'number' && typeof b === 'number') || (typeof a === 'boolean' && typeof b === 'boolean')) {
    if (a - b === 0) {
      return 0
    } else if (asc) {
      return a - b < 0 ? -1 : 1
    } else {
      return a - b < 0 ? 1 : -1
    }
  } else {
    const aType = typeof a
    const bType = typeof b
    if (aType === bType) {
      console.warn(`Unhandled sort type (a = ${typeof a}, b = ${typeof b})`)
    } else {
      console.warn(`Can't compare two different types. Please double check inputs`)
    }
  }
}
