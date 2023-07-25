import '@tmp/router.js'
import { store, frameEmitter, singleSpaVue, hCoreReference } from '@hsui/core'
if (frameEmitter) {
  frameEmitter.on('register-root-module', ({ root }) => {
    if (!store.hasModule('root')) {
      store.registerModule('root', { ...root, namespaced: true })
    }
  })
  frameEmitter.on('update-root-module', ({ mutation, root }) => {
    if (!store.hasModule('root')) {
      store.registerModule('root', { ...root, namespaced: true })
    }
    const { type, payload } = mutation
    store.commit(type, payload)
  })
  frameEmitter.trigger('app-store-ready')
}
require('@/index.js')
const { Model, options: appOptions } = hCoreReference
export const { bootstrap, mount, unmount } = singleSpaVue({
  Vue: Model,
  appOptions,
  destroyRootInstanceAtUnmount: true,
})
