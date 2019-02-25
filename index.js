import * as components from '@/components'

const VueComponents = {
  install (Vue) {
    for (const plugin in components) {
      Vue.component(plugin, components[plugin])
    }
  }
}

export * from '@/mixins'
export * from '@/utilities'
export * from '@/controllers'

export default VueComponents
