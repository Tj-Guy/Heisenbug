import { initRouter, initRouterLayout } from '@hsui/core'

export default initRouter(
  [
    {
      path: '/',
      component: initRouterLayout((layout) => {
        return import('@/layouts/' + layout + '.vue')
      }),
      children: [
        {
          name: 'index',
          path: '',
          component: Index,
        },
        {
          name: 'productManage-index',
          path: 'productManage',
          component: ProductManageIndex,
        },
        {
          name: 'TransactionManage-index',
          path: 'TransactionManage',
          component: TransactionManageIndex,
        },
        {
          name: 'userManage-index',
          path: 'userManage',
          component: UserManageIndex,
        },
        {
          name: '__404__',
          path: '*',
          component: __404__,
        },
      ],
    },
  ],
  { base: '/', mode: 'hash' }
)

function Index() {
  return import(/* webpackChunkName: "index" */ '@/views/index.vue')
}
function ProductManageIndex() {
  return import(
    /* webpackChunkName: "productManage-index" */ '@/views/productManage/index.vue'
  )
}
function TransactionManageIndex() {
  return import(
    /* webpackChunkName: "TransactionManage-index" */ '@/views/TransactionManage/index.vue'
  )
}
function UserManageIndex() {
  return import(
    /* webpackChunkName: "userManage-index" */ '@/views/userManage/index.vue'
  )
}
function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}
