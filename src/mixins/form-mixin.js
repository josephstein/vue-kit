import formInputMixin from './form-input-mixin'
import assert from '@/utilities/assert'
import isEmpty from '@/utilities/is-empty'
import cloneDeep from 'lodash/cloneDeep'
import dateFormatter from '@/utilities/date-formatter'

const formMixin = {
  mixins: [
    formInputMixin
  ],
  computed: {
    query: function () {
      assert(this.form != null, 'Expected this.form to not be null')
      if (this.form == null) { return }

      const query = {}
      for (const [key, value] of Object.entries(this.form)) {
        if (isEmpty(value.value)) { continue }
        query[key] = value.value
      }
      return query
    },
    isSaveEnabled: function () {
      assert(this.form != null, 'Expected this.form to not be null')
      if (this.form == null) { return false }

      for (const [, params] of Object.entries(this.form)) {
        const state = this.inputState(params)
        if (state === false) {
          return false
        }
      }

      return true
    },
    formObject: function () {
      const obj = {}
      Object.keys(this.form).forEach(key => {
        const type = fieldType(this.form[key])
        let value = this.form[key].value

        switch (type) {
          case 'text':
          case 'textarea':
          case 'tel':
            value = !isEmpty(value) ? value.trim() : null
            break
          case 'email':
            value = !isEmpty(value) ? value.trim().toLowerCase() : null
            break
          case 'number':
            value = !isEmpty(value) ? Number(value) : null
            break
          case 'radio':
          case 'checkbox':
            break
          case 'date':
            value = !isEmpty(value) ? dateFormatter(value, 'iso') : null
            break
          case 'daterange':
            if (isEmpty(value) || value.length !== 2 || isEmpty(value[0]) || isEmpty(value[1])) {
              value = null
            } else {
              value = [dateFormatter(value[0], 'iso'), dateFormatter(value[1], 'iso')]
            }
            break
          case 'boolean':
            if (isEmpty(value)) { value = false }
            break
          default:
            /* eslint-disable-next-line no-console */
            console.warn(`Unhandled type: ${type}`)
        }

        obj[key] = value
      })

      return cloneDeep(obj)
    }
  },
  methods: {
    populate (data) {
      if (isEmpty(data)) { return }
      if (isEmpty(this.form)) { return }

      Object.keys(this.form).forEach(key => {
        const type = fieldType(this.form[key])
        const value = data[key]

        switch (type) {
          case 'text':
          case 'textarea':
          case 'email':
          case 'number':
          case 'radio':
          case 'tel':
            this.form[key].value = !isEmpty(value) ? value : ''
            break
          case 'date':
            this.form[key].value = !isEmpty(value) ? dateFormatter(value, 'iso') : ''
            break
          case 'boolean':
            this.form[key].value = value
            break
          case 'checkbox':
            this.form[key].value = !isEmpty(value) ? [...value] : []
            break
          default:
            /* eslint-disable-next-line no-console */
            console.warn(`Unhandled type (${type})`)
        }
      })
    }
  }
}

function fieldType (attrs) {
  if (attrs.type) { return attrs.type }
  if (Array.isArray(attrs.value)) { return 'checkbox' }
  return 'text'
}

export default formMixin
