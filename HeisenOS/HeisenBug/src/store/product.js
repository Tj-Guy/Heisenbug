export const state = () => ({
  productDetail: {
    //这里应该是空着还是？后端传来是不是直接把属性都传了，我这里不需要属性了就？
  },
});
export const mutations = {
  SET_PRODUCT_DETAIL: (state, data) => {
    state.productDetail = data;
  },
};
export const getters = {
  productDetail: (state) => state.productDetail
}
export const actions = {
  setProductDetail: ({ commit }, data) => {
    commit("SET_PRODUCT_DETAIL", data);
  },
};
