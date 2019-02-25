<template>
  <div class="vk-form-input">
    <b-form-group
      :description="isReadonly ? null : description"
      :label="params.label"
    >
      <b-form-textarea
        :disabled="disabled"
        :formatter="formatter"
        :placeholder="placeholder"
        :plaintext="isReadonly"
        :readonly="isReadonly"
        :required="required"
        :rows="3"
        :size="size"
        :state="state === false ? false : null"
        v-if="params.type === 'textarea'"
        v-model.trim="internalValue"
      />
      <b-form-input
        :disabled="disabled"
        :formatter="formatter"
        :placeholder="placeholder"
        :plaintext="plaintext"
        :readonly="isReadonly"
        :required="required"
        :size="size"
        :state="state === false ? false : null"
        :type="bootstrapType"
        v-else
        v-model.trim="internalValue"
      />
      <b-form-invalid-feedback id="inputLiveFeedback">{{ invalidFeedback }}</b-form-invalid-feedback>
      <div
        class="vk-underline"
        v-if="isReadonly"
      />
    </b-form-group>
  </div>
</template>

<script>
import formInputMixin from '@/mixins/form-input-mixin'
import phoneNumber from 'awesome-phonenumber'

export default {
  name: 'VKFormInput',
  mixins: [
    formInputMixin
  ],
  props: {
    params: {
      type: Object,
      required: true,
      validator: function (value) {
        if (value.label == null) { return false }
        return true
      }
    },
    disabled: {
      type: Boolean
    }
  },
  data: function () {
    return {
      internalValue: '',
      invalidFeedback: null
    }
  },
  computed: {
    required: function () {
      return this.params.isRequired
    },
    size: function () {
      return this.params.size || 'lg'
    },
    plaintext: function () {
      return this.isReadonly
    },
    placeholder: function () {
      return this.isReadonly ? null : this.params.placeholder
    },
    state: function () {
      return this.isValid(this.params, true)
    },
    description: function () {
      if (this.isValid(this.params, false)) { return null }
      if (this.invalidFeedback) { return null }
      return this.params.isRequired ? 'Required' : null
    },
    bootstrapType: function () {
      const type = this.params.type
      if (!type) { return 'text' }

      const bootstrapTypes = [
        'text',
        'password',
        'email',
        'number',
        'url',
        'tel',
        'search',
        'date',
        'datetime',
        'datetime-local',
        'month',
        'week',
        'time',
        'range',
        'color'
      ]

      return bootstrapTypes.includes(type) ? type : 'text'
    },
    formatter: function () {
      if (this.params.type === 'email') {
        return this.lowerCaseInput
      } else {
        return null
      }
    }
  },
  watch: {
    'params.value': {
      handler: function (newValue) {
        this.internalValue = newValue

        this.handleValidation()
        this.formatPhoneIfNeeded()
      },
      immediate: true,
      deep: true
    },
    internalValue: {
      handler: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    lowerCaseInput (value) {
      return value.toLowerCase()
    },
    handleValidation () {
      const { type, invalidFeedback } = this.params

      let error = null
      if (type === 'email' && this.state === false) {
        error = 'Invalid email'
      } else if (type === 'tel' && this.state === false) {
        error = 'Invalid phone'
      } else if (invalidFeedback && this.state === false) {
        error = invalidFeedback()
      }

      this.invalidFeedback = error
    },
    formatPhoneIfNeeded () {
      if (this.params.type !== 'tel') { return }

      const value = this.params.value
      const formatted = phoneNumber(value, 'US').getNumber('national')
      this.internalValue = formatted || value
    }
  }
}
</script>
