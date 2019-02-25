export default function isValidZip (value) {
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(value)
}
