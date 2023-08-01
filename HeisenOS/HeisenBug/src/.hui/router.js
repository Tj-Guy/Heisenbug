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
          name: 'productManage-modifyProduct',
          path: 'productManage/modifyProduct',
          component: ProductManageModifyProduct,
        },
        {
          name: 'productManage-productDetail',
          path: 'productManage/productDetail',
          component: ProductManageProductDetail,
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
          name: 'userManage-cardManagement',
          path: 'userManage/cardManagement',
          component: UserManageCardManagement,
        },
        {
          name: 'userManage-createUser',
          path: 'userManage/createUser',
          component: UserManageCreateUser,
        },
        {
          name: 'userManage-deleteUser',
          path: 'userManage/deleteUser',
          component: UserManageDeleteUser,
        },
        {
          name: 'userManage-modifyUser',
          path: 'userManage/modifyUser',
          component: UserManageModifyUser,
        },
        {
          name: 'userManage-searchUser',
          path: 'userManage/searchUser',
          component: UserManageSearchUser,
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
function ProductManageModifyProduct() {
  return import(
    /* webpackChunkName: "productManage-modifyProduct" */ '@/views/productManage/modifyProduct.vue'
  )
}
function ProductManageProductDetail() {
  return import(
    /* webpackChunkName: "productManage-productDetail" */ '@/views/productManage/productDetail.vue'
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
function UserManageCardManagement() {
  return import(
    /* webpackChunkName: "userManage-cardManagement" */ '@/views/userManage/cardManagement.vue'
  )
}
function UserManageCreateUser() {
  return import(
    /* webpackChunkName: "userManage-createUser" */ '@/views/userManage/createUser.vue'
  )
}
function UserManageDeleteUser() {
  return import(
    /* webpackChunkName: "userManage-deleteUser" */ '@/views/userManage/deleteUser.vue'
  )
}
function UserManageModifyUser() {
  return import(
    /* webpackChunkName: "userManage-modifyUser" */ '@/views/userManage/modifyUser.vue'
  )
}
function UserManageSearchUser() {
  return import(
    /* webpackChunkName: "userManage-searchUser" */ '@/views/userManage/searchUser.vue'
  )
}
function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}
