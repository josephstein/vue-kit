export default function isValidPhone (value) {
  const stripped = String(value).replace(/[-)() ]/g, '')
  return /^\d{10}$/.test(stripped)
}
