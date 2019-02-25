import isValidEmail from '@/utilities/is-valid-email'
import isValidPhone from '@/utilities/is-valid-phone'
import isEmpty from '@/utilities/is-empty'

const formInputMixin = {
  computed: {
    isReadonly: function () {
      return this.params.isReadonly
    }
  },
  methods: {
    isValid (params, isEmptyValid = false) {
      const { isRequired, type, value, validator } = params
      const valueIsEmpty = isEmpty(value)

      if (isEmptyValid && valueIsEmpty) {
        return true
      }

      if (isRequired && valueIsEmpty) {
        return false
      }

      if (!isRequired && valueIsEmpty) {
        return true
      }

      if (type === 'tel') {
        return isValidPhone(value)
      } else if (type === 'email') {
        return isValidEmail(value)
      } else if (validator && validator() === false) {
        return false
      }

      return true
    }
  }
}

export default formInputMixin
