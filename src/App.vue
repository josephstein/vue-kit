<template>
  <div id="app">
    <h1>VueKit</h1>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Form">
          <demo-form/>
        </b-tab>
        <!-- <b-tab title="Edit Form">
          <demo-form-edit/>
        </b-tab>
        <b-tab title="Form Input">
          <demo-form-input/>
        </b-tab>
        <b-tab title="Form Select">
          <demo-form-select/>
        </b-tab>-->
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import DemoForm from './demo/DemoForm'
// import DemoFormEdit from './demo/DemoFormEdit'
// import DemoFormInput from './demo/DemoFormInput'
// import DemoFormSelect from './demo/DemoFormSelect'

export default {
  name: 'app',
  components: {
    DemoForm
    // DemoFormEdit,
    // DemoFormInput,
    // DemoFormSelect
  }
}
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  max-width: 700px;
  margin: 20px auto;
}

#app .tabs > div > div {
  margin-top: 20px;
}
</style>
