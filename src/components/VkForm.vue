<template>
  <div class="vk-form">
    <b-form @submit="onSubmit">
      <vk-toolbar
        :title="title"
        v-if="title"
      >
        <b-btn
          @click="onEdit"
          v-if="!editHidden && !isEditing"
          variant="primary"
        >Edit</b-btn>
        <b-btn
          :disabled="!isSaveEnabled || loading"
          @click="onCancel"
          v-if="!editHidden && isEditing"
          variant="outline-secondary"
        >Cancel</b-btn>
        <b-btn
          :disabled="!isSaveEnabled || loading"
          type="submit"
          v-if="!editHidden && isEditing"
          variant="primary"
        >Save</b-btn>
      </vk-toolbar>
      <slot/>
      <b-btn
        :disabled="!isSaveEnabled || loading"
        class="mt-3"
        size="lg"
        type="submit"
        v-if="editHidden"
        variant="primary"
      >{{ submitTitle }}</b-btn>
    </b-form>
  </div>
</template>

<script>
import formInputMixin from '@/mixins/form-input-mixin'

export default {
  name: 'VKForm',
  mixins: [
    formInputMixin
  ],
  props: {
    title: {
      type: String
    },
    form: {
      type: Object,
      required: true
    },
    editHidden: {
      type: Boolean,
      default: true
    },
    submitTitle: {
      type: String,
      default: 'Save'
    },
    loading: {
      type: Boolean
    }
  },
  data: function () {
    return {
      isEditing: false
    }
  },
  computed: {
    isSaveEnabled: function () {
      for (const [, params] of Object.entries(this.form)) {
        const state = this.isValid(params)
        if (state === false) {
          return false
        }
      }

      return true
    }
  },
  watch: {
    editHidden: {
      handler: function (newValue) {
        this.isEditing = newValue
      },
      immediate: true
    },
    isEditing: {
      handler: function (newValue) {
        this.setReadonly(!newValue)
      },
      immediate: true
    }
  },
  methods: {
    setReadonly (value) {
      for (const [, params] of Object.entries(this.form)) {
        this.$set(params, 'isReadonly', value)
      }
    },
    onEdit () {
      this.isEditing = true
      this.$emit('edit')
    },
    onCancel () {
      this.isEditing = false
      this.$emit('cancel')
    },
    onSubmit (evt) {
      evt.preventDefault()
      if (!this.editHidden) { 
        this.isEditing = false
      }
      this.$emit('submit')
    }
  }
}
</script>
