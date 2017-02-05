<template lang="html">
  <div class="home">
    <!--banner-->
    <div class="banner">
      <swiper class="banner-swiper">
        <swiper-slide class="slide" v-for="item in banner">
          <a :href="item.url" target="_blank">
            <img class="film-logo" :src="item.imageUrl" alt="">
          </a>
        </swiper-slide>
      </swiper>
    </div>
    <!--now-playing-->
    <div class="now-playing">
      <div class="item" v-for="item in nowplay">
        <router-link :to="{name: 'detail', params: { id: item.id }}">
          <img class="film-logo" :src="item.cover.origin" alt="">
          <div class="desc">
            <div class="info">
              <div class="film-name">{{item.name}}</div>
              <div class="film-info">{{item.cinemaCount}}家影院上映 {{item.watchCount}}人购票</div>
            </div>
            <div class="count">{{item.grade}}</div>
          </div>
        </router-link>
      </div>
    </div>
    <!--coming-soon-->
    <div class="coming-title">
      <h3>即将上映</h3>
    </div>
    <div class="coming-soon">
      <div class="item" v-for="item in coming">
        <router-link :to="{name: 'detail', params: { id: item.id }}">
          <img class="film-logo" :src="item.cover.origin" alt="">
          <div class="desc">
            <div class="info">
                <div class="film-name">{{item.name}}</div>
                <!--<p>{{item.cinemaCount}}家影院上映 {{item.watchCount}}人购票</p>-->
              </div>
              <!--<div class="count">{{item.grade}}</div>-->
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: [],
  data () {
    return {
      swiperOption: {
        autoplay: 3000,
        autoHeight: true,
      },
    }
  },
  created () {
    // this.$store.commit('COM_CONF', {
    //   title: '卖座电影'
    // })
    this.$store.dispatch('comConf', {
      title: '卖座电影'
    })

    // console.log('banner: ', this.banner)

    if (this.banner.length === 0) {
      this.$store.dispatch('getBannerList')
    }
    if (this.nowplay.length === 0) {
      this.$store.dispatch('getNowPlaying')
    }
    if (this.coming.length === 0) {
      this.$store.dispatch('getComingSoon')
    }
  },
  computed: mapGetters({
    banner: 'getBannerList',
    nowplay: 'getNowPlaying',
    coming: 'getComingSoon'
  }),
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      // console.log(`我是组件实例vm: `, vm)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="sass" scoped>
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, .5, .8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
.film-logo {
  object-fit: cover;
  width: 100%;
}
.desc {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    padding-left: 28px;
    height: 50px;
    flex: 1 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .film-name {
      color: #333;
      font-size: 12px;
      line-height: 15px;
      user-select: text;
    }
    .film-info {
      font-size: 8px;
      color: #9a9a9a;
      line-height: 15px;
    }
  }
  .count {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    margin-right: 15px;
    color: #f78360;
  }
}

</style>
