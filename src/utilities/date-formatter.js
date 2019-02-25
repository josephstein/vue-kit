import Moment from 'moment'

/**
 * Date Formatter.
 *
 * Convert dates into various format types. Useful for
 * displaying dates on frontend or converting into native, iso formats.
 *
 * short    = 'Jan 31',
 * date     = '01/31/2018',
 * datetime = '01/31/2018 02:00PM',
 * iso      = '2018-01-31T15:00:00.000Z',
 * js       = javascript date object
 *
 * @param {string} value Value to convert.
 * @param {string} type [short, date, datetime, iso, js] Requested format .
 *
 */
export default function dateFormatter (value, type) {
  if (value === null || value === undefined) { return null }

  // iso
  let convertedValue = convertedISODateStringValue(value, type)
  if (convertedValue != null) { return convertedValue }

  // date | datetime
  convertedValue = convertedUIDateStringValue(value, type)
  if (convertedValue != null) { return convertedValue }

  // js
  convertedValue = convertedISODateTimeValue(value, type)
  if (convertedValue != null) { return convertedValue }

  // js string
  convertedValue = convertedISODateTimeStringValue(value, type)
  if (convertedValue != null) { return convertedValue }

  // Unknown Format
  return -1
}

/*
 *
 * SUB-TASKS FOR CONVERTING 'FROM' TO ALL 'TO' TYPES
 *
 */

// From: YYYY-MM-DD
function convertedISODateStringValue (value, type) {
  if (typeof value !== 'string') { return null }
  if (value.length !== 10) { return null }

  const match = value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
  if (!match || match.length === 0) { return null }
  const v = match[0]

  switch (type) {
    case 'short':
      return Moment(UiDateToJs(isoDateToUiDate(v))).format('MMM D')
    case 'date':
      return isoDateToUiDate(v)
    case 'datetime':
      return jsToUiDateTime(UiDateToJs(isoDateToUiDate(v)))
    case 'iso':
      return v
    case 'js':
      return UiDateToJs(isoDateToUiDate(v))
    default:
      return -1
  }
}

// From: MM/DD/YYYY
function convertedUIDateStringValue (value, type) {
  if (typeof value !== 'string') { return null }
  if (value.length !== 10) { return null }

  const match = value.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
  if (!match || match.length === 0) { return null }
  const v = match[0]

  switch (type) {
    case 'short':
      return Moment(UiDateToJs(v)).format('MMM D')
    case 'date':
      return v
    case 'datetime':
      return jsToUiDateTime(UiDateToJs(v))
    case 'iso':
      return UiDateToIsoDate(v)
    case 'js':
      return UiDateToJs(v)
    default:
      return -1
  }
}

// From: YYYY-MM-DDTHH:MM:SS.000Z
function convertedISODateTimeValue (value, type) {
  if (!(value instanceof Date)) { return null }

  switch (type) {
    case 'short':
      return Moment(value).format('MMM D')
    case 'date':
      return jsToUiDate(value)
    case 'datetime':
      return jsToUiDateTime(value)
    case 'iso':
      return jsToIsoDate(value)
    case 'js':
      return value
    default:
      return -1
  }
}

// From: 'YYYY-MM-DDTHH:MM:SS.000Z'
function convertedISODateTimeStringValue (value, type) {
  if (typeof value !== 'string') { return null }

  switch (type) {
    case 'short':
      return Moment(value, Moment.ISO_8601).local().format('MMM D')
    case 'date':
      return Moment(value, Moment.ISO_8601).local().format('MM/DD/YYYY')
    case 'datetime':
      return Moment(value, Moment.ISO_8601).local().format('MM/DD/YYYY h:mm A')
    case 'iso':
      return Moment(value, Moment.ISO_8601).local().format('YYYY-MM-DD')
    case 'js':
      return Moment(value).toDate()
    default:
      return -1
  }
}

/*
 *
 * SUB-TASKS FOR CONVERTING INDIVIDUAL TYPES
 *
 */

// 1985-11-31T15:00:00.000Z => "11/31/1985"
function jsToUiDate (date) {
  return Moment(date).format('MM/DD/YYYY')
}

// 1985-11-31T15:00:00.000Z => "11/31/1985 3:00 PM"
function jsToUiDateTime (date) {
  return Moment(date).format('MM/DD/YYYY h:mm A')
}

// 1985-11-31T15:00:00.000Z => "1985-11-31"
function jsToIsoDate (date) {
  return Moment(date).format('YYYY-MM-DD')
}

// "11/31/1985" => 1985-11-31T15:00:00.000Z
function UiDateToJs (dateString) {
  return Moment(dateString, 'MM/DD/YYYY', true).toDate()
}

// "11/31/1985" => "1985-11-31"
function UiDateToIsoDate (dateString) {
  let components = dateString.split('/')
  return `${components[2]}-${components[0]}-${components[1]}`
}

// "1985-11-31" => "11/31/1985"
function isoDateToUiDate (dateString) {
  let components = dateString.split('-')
  return `${components[1]}/${components[2]}/${components[0]}`
}
