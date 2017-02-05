/**
 * home 配置
 */
import api from '../api'
import * as types from '../mutation-types'

const state = {
  detail: null
}

const actions = {
  // 获取banner列表
  getFilmDetail ({ commit }, id) {
    commit(types.COM_LOADING_STATUS, true)
    api.getFilmDetail(id, res => {
      commit(types.COM_CONF, {
        title: res.data.film.name
      })
      commit(types.DETAIL_GET_INFO, res.data)
      commit(types.COM_LOADING_STATUS, false)
    })
  }
}

const getters = {
  getFilmDetail: state => state.detail
}

const mutations = {
  [types.DETAIL_GET_INFO] (state, res) {
    state.detail = res.film
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
