/**
 * api 配置
 */
import fetch from 'isomorphic-fetch'

const url = 'http://m.maizuo.com/v4/api'

export default {
  // 根据请求的时间戳获取 banner 列表
  getBannerList (cb) {
    fetch(`${url}/billboard/home?t=${new Date() * 1}&callback=?`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 获取首页热映电影
  getNowPlaying (cb) {
    fetch(`${url}/film/now-playing?_t=${new Date() * 1}&page=1&count=5`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 获取热映列表
  getNowPlayList (page, cb) {
    fetch(`${url}/film/now-playing?page=${page}&count=10`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 获取首页即将上映电影
  getComingSoon (cb) {
    fetch(`${url}/film/coming-soon?_t=${new Date() * 1}&page=1&count=3`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 获取即将上映列表
  getComingList (page, cb) {
    fetch(`${url}/film/coming-soon?page=${page}&count=10`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 根据id获取相关影片信息
  getFilmDetail (id, cb) {
    fetch(`${url}/film/${id}?_t=${new Date() * 1}`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 获取相关影院
  getCinemaList (id, cb) {
    fetch(`${url}/film/${id}/cinema?_t=${new Date() * 1}`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  },
  // 根据影片id跟影院id获取相关电影票时段
  getScheduleList (filmid, cinemaid, cb) {
    fetch(`${url}/schedule/?_t=${new Date() * 1}&film=${filmid}&cinema=${cinemaid}`, {
      mode: 'no-cors',
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }, error => {
      return Promise.reject(error)
    })
  }
}
