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
          name: 'productManage-createProduct',
          path: 'productManage/createProduct',
          component: ProductManageCreateProduct,
        },
        {
          name: 'productManage-productDetail',
          path: 'productManage/productDetail',
          component: ProductManageProductDetail,
        },
        {
          name: 'productManage-productIndex',
          path: 'productManage/productIndex',
          component: ProductManageProductIndex,
        },
        {
          name: 'TransactionManage-buy',
          path: 'TransactionManage/buy',
          component: TransactionManageBuy,
        },
        {
          name: 'TransactionManage-liquidate',
          path: 'TransactionManage/liquidate',
          component: TransactionManageLiquidate,
        },
        {
          name: 'TransactionManage-ordersModification',
          path: 'TransactionManage/ordersModification',
          component: TransactionManageOrdersModification,
        },
        {
          name: 'TransactionManage-redeem',
          path: 'TransactionManage/redeem',
          component: TransactionManageRedeem,
        },
        {
          name: 'userManage-bankCard-index',
          path: 'userManage/bankCard',
          component: UserManageBankCardIndex,
        },
        {
          name: 'userManage-createUser-index',
          path: 'userManage/createUser',
          component: UserManageCreateUserIndex,
        },
        {
          name: 'userManage-searchUser-index',
          path: 'userManage/searchUser',
          component: UserManageSearchUserIndex,
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
function ProductManageCreateProduct() {
  return import(
    /* webpackChunkName: "productManage-createProduct" */ '@/views/productManage/createProduct.vue'
  )
}
function ProductManageProductDetail() {
  return import(
    /* webpackChunkName: "productManage-productDetail" */ '@/views/productManage/productDetail.vue'
  )
}
function ProductManageProductIndex() {
  return import(
    /* webpackChunkName: "productManage-productIndex" */ '@/views/productManage/productIndex.vue'
  )
}
function TransactionManageBuy() {
  return import(
    /* webpackChunkName: "TransactionManage-buy" */ '@/views/TransactionManage/buy.vue'
  )
}
function TransactionManageLiquidate() {
  return import(
    /* webpackChunkName: "TransactionManage-liquidate" */ '@/views/TransactionManage/liquidate.vue'
  )
}
function TransactionManageOrdersModification() {
  return import(
    /* webpackChunkName: "TransactionManage-ordersModification" */ '@/views/TransactionManage/ordersModification.vue'
  )
}
function TransactionManageRedeem() {
  return import(
    /* webpackChunkName: "TransactionManage-redeem" */ '@/views/TransactionManage/redeem.vue'
  )
}
function UserManageBankCardIndex() {
  return import(
    /* webpackChunkName: "userManage-bankCard-index" */ '@/views/userManage/bankCard/index.vue'
  )
}
function UserManageCreateUserIndex() {
  return import(
    /* webpackChunkName: "userManage-createUser-index" */ '@/views/userManage/createUser/index.vue'
  )
}
function UserManageSearchUserIndex() {
  return import(
    /* webpackChunkName: "userManage-searchUser-index" */ '@/views/userManage/searchUser/index.vue'
  )
}
function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}
