import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let options = {}

;['product.js'].forEach((module) => {
  resolveModule(module)
})

function resolveModule(file) {
  let module = require('@/store/' + file)
  if (module.default) {
    module = module.default
  }
  if (file === 'index.js') {
    options = { ...options, ...module }
  } else {
    const moduleName = file.replace(/.js$/, '')
    if (options.modules) {
      options.modules[moduleName] = { namespaced: true, ...module }
    } else {
      options.modules = {}
      options.modules[moduleName] = { namespaced: true, ...module }
    }
  }
}

export default new Vuex.Store(options)
