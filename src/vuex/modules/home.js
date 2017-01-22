/**
 * home 配置
 */
import api from '../api'
import * as types from '../mutation-types'

const state = {
  banner: [],
  nowplay: [],
  coming: []
}

const actions = {
  // 获取banner列表
  getBannerList ({ commit }) {
    commit(types.COM_LOADING_STATUS, true)
    api.getBannerList(res => {
      console.log('getBannerList: ', res)
      commit(types.HOME_GET_BANNER_LIST, res.data)
      commit(types.COM_LOADING_STATUS, false)
    })
  },
  // 获取热映
  getNowPlaying ({ commit }) {
    commit(types.COM_LOADING_STATUS, true)
    api.getNowPlaying(res => {
      commit(types.HOME_GET_NOWPLAYING_LIST, res.data)
      commit(types.COM_LOADING_STATUS, false)
    })
  },
  // 获取即将上映
  getComingSoon ({ commit }) {
    commit(types.COM_LOADING_STATUS, true)
    api.getComingSoon(res => {
      commit(types.HOME_GET_COMINGSOON_LIST, res.data)
      commit(types.COM_LOADING_STATUS, false)
    })
  }
}

const getters = {
  getBannerList: state => state.banner,
  getNowPlaying: state => state.nowplay,
  getComingSoon: state => state.coming
}

const mutations = {
  [types.HOME_GET_BANNER_LIST] (state, res) {
    state.banner = res.billboards
    console.log('banner: ', state.banner)
  },
  [types.HOME_GET_NOWPLAYING_LIST] (state, res) {
    state.nowplay = res.films
  },
  [types.HOME_GET_COMINGSOON_LIST] (state, res) {
    state.coming = res.films
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
