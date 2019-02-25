export default function isEmpty (value) {
  return (
    value === null ||
    value === undefined ||
    value.length === 0 ||
    (typeof value === 'object' && !(value instanceof Date) && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value === '')
  )
}
