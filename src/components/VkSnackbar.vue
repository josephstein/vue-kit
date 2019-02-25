<template>
  <b-alert
    :show="message != null"
    :variant="variant"
    @dismissed="clear"
    class="vk-snackbar mt-lg-1"
    dismissible
  >{{ message }}</b-alert>
</template>

<script>
export default {
  name: 'VkSnackbar',
  data: function () {
    return {
      message: null,
      isError: false
    }
  },
  computed: {
    variant: function () {
      return this.isError ? 'danger' : 'success'
    }
  },
  watch: {
    '$route': function (to, from) {
      const snack = this.$snackbar.snack
      if (!snack) {
        return
      }

      if (to.path !== snack.path) {
        this.clear()
      }
    },
    '$snackbar.snack': {
      handler: function (snackbar) {
        if (!snackbar) {
          this.message = null
          this.isError = null
          return
        }

        this.message = snackbar.message
        this.isError = snackbar.isError
      },
      deep: true
    }
  },
  methods: {
    clear () {
      this.message = null
      this.isError = false
      this.$snackbar.clear()
    }
  }
}
</script>
