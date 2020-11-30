import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      // 设置过期时间2h -> 110分钟, 保证当前使用的token不是过期token
      const time = +new Date() + 110 * 3600 * 1000;
      localStorage.setItem('token_expires', '' + time);
    },
    DELETE_TOKEN(state) {
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('token_expires');
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    }
  },
  modules: {},
  getters: {
    token: state => state.token
  }
});
