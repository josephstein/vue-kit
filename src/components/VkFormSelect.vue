<template>
  <div class="vk-form-select">
    <b-form-group :label="params.label">
      <span
        class="form-control-plaintext form-control-lg"
        v-if="isReadonly"
      >{{ displayValue }}</span>
      <b-form-select
        :disabled="disabled"
        :multiple="multiple"
        :options="internalOptions"
        :required="params.isRequired"
        :size="params.size || 'lg'"
        v-if="!isReadonly"
        v-model="internalValue"
      ></b-form-select>
      <small
        class="form-text text-muted"
        v-if="!isReadonly && showRequired"
      >Required</small>
      <div
        class="underline"
        v-if="isReadonly"
      />
    </b-form-group>
  </div>
</template>

<script>
import formInputMixin from '@/mixins/form-input-mixin'

export default {
  name: 'VKFormSelect',
  mixins: [
    formInputMixin
  ],
  props: {
    params: {
      type: Object,
      required: true,
      validator: function (value) {
        if (value.label == null) { return false }
        if (value.options == null || value.options.length === 0) { return false }
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
      internalOptions: []
    }
  },
  computed: {
    displayValue: function () {
      if (this.multiple) {
        if (this.internalValue.length === 0) { return '-' }
        return this.internalOptions
          .filter(o => this.internalValue.includes(o.value))
          .map(o => o.text)
          .join(', ')
      } else {
        return this.internalOptions
          .find(o => o.value === this.internalValue).text
      }
    },
    showRequired: function () {
      return this.params.isRequired && (this.params.value == null || this.params.value.length === 0)
    },
    multiple: function () {
      return Array.isArray(this.params.value)
    }
  },
  watch: {
    'params.value': {
      handler: function (newValue) {
        this.internalValue = newValue
      },
      immediate: true,
      deep: true
    },
    'params.options': {
      handler: function (newValue) {
        if (this.multiple) {
          this.internalOptions = [ ...newValue ]
        } else {
          this.internalOptions = [
            { value: null, text: '-' },
            ...newValue
          ]
        }
      },
      immediate: true,
      deep: true
    },
    internalValue: {
      handler: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
