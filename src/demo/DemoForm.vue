<template>
  <div class="demo-form">
    <vk-form
      :form="form"
      :submit-title="submitTitle"
      @submit="onSubmit"
      title="Sign-up"
    >
      <vk-form-input
        :params="form.email"
        v-model="form.email.value"
      />
      <vk-form-input
        :params="form.name"
        v-model="form.name.value"
      />
      <vk-form-input
        :params="form.phone"
        v-model="form.phone.value"
      />
    </vk-form>

    <b-card
      bg-variant="light"
      class="mt-5"
      header="formObject"
    >{{ formObject }}</b-card>

    <b-modal v-model="modalShow">Signed up successfully</b-modal>
  </div>
</template>

<script>
import formMixin from '@/mixins/form-mixin'

export default {
  name: 'DemoForm',
  mixins: [
    formMixin
  ],
  data: function () {
    return {
      inFlight: false,
      modalShow: false,
      form: {
        email: {
          value: '',
          isRequired: true,
          label: 'Email',
          placeholder: 'Enter email',
          type: 'email'
        },
        name: {
          value: '',
          isRequired: true,
          label: 'Name',
          placeholder: 'Enter full name'
        },
        phone: {
          value: '',
          isRequired: true,
          label: 'Phone',
          type: 'tel'
        }
      }
    }
  },
  computed: {
    submitTitle: function () {
      return this.inFlight ? 'Signing up...' : 'Sign Up'
    }
  },
  methods: {
    onSubmit () {
      this.inFlight = true
      setTimeout(() => {
        this.modalShow = true
        this.inFlight = false
      }, 2000)
    }
  }
}
</script>
