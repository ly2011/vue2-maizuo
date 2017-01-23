<template>
  <div class="wrap" v-scroll="showTop">
    <!--<c-header />-->
    <div class="container">
      <transition :name="transitionName">
        <router-view class="child-view" />
      </transition>
    </div>
    <c-loading v-show="loading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CHeader from './components/Common/header'
import CLoading from './components/Common/loading'
export default {
  data () {
    return {
      show: 'home',
      transitionName: 'slide-left',
      goTop: false
    }
  },
  // dynamically set transition based on route change
  watch: {
    '$route' (to, from) {
      this.show = to.name

      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  computed: mapGetters({
    loading: 'loading'
  }),
  created () {
    console.log(`this.show ${this.show}`)
  },
  beforeCreate () {
  },
  activated () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  methods: {
    // 显示返回顶部按钮
    showTop () {
      if (document.body.scrollTop > 200) {
        this.goTop = true
      } else {
        this.goTop = false
      }
    },
    // 返回顶部
    goTop () {
      let speed = 10
      const timer = setInterval(() => {
        if (document.body.scrollTop > 0) {
          document.body.scrollTop = document.body.scrollTop - speed > 0 ? document.body.scrollTop - speed : 0
          speed += 20
        } else {
          clearInterval(timer)
        }
      }, 16)
    }
  },

  components: {
    CLoading,
    CHeader
  }
}
</script>

<style lang="sass">
@import './assets/scss/base.scss';

.display-transition {
  transition: all 0 .5s;
}

.display-leave {
  opacity: 0;
  transform: translateX(50px);
}

.display-enter {
  opacity: 1;
}
</style>
