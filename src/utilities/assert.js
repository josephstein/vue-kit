export default function assert (statement, message) {
  if (process.env.NODE_ENV === 'production') { return }
  if (statement === true) { return }
  console.error(`⚠️ ${message}`)
}
