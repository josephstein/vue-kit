<template>
  <div
    :class="{ 'back-hidden': backHidden }"
    class="vk-toolbar"
  >
    <b-btn
      @click="onBack"
      class="back"
      size="sm"
      v-if="!backHidden"
    >Back</b-btn>
    <h3
      class="title"
      v-if="title"
    >{{ title }}</h3>
    <div class="actions">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VkToolbar',
  props: {
    backHidden: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    }
  },
  methods: {
    onBack () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>
.vk-toolbar {
  display: grid;
  grid-template-columns: 30px auto auto;
  grid-template-rows: 68px;
  grid-template-areas: "back title actions";
  align-items: center;

  margin-bottom: 10px;
}
.back-hidden {
  grid-template-columns: auto auto !important;
  grid-template-areas: "title actions";
}
.back {
  margin: 0 0 0 -10px !important;
  grid-area: back;
}
.title {
  grid-area: title;
}
.actions {
  grid-area: actions;
  justify-self: end;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.actions > * {
  margin-left: 5px !important;
}
</style>
