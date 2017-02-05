<template>
  <div class="detail" v-if="detail">
    <div class="cover">
      <img :src="detail.cover.origin" alt="">
    </div>
    <div class="desc">
      <div class="title cells__title">影片简介</div>
      <div class="info cells">
        <div class="cell">
          <div class="cell__hd">
            <div class="label">导演：</div>
          </div>
          <div class="cell__bd">
            {{detail.director}}
          </div>
        </div>
        <div class="cell">
          <div class="cell__hd">
            <div class="label">主演：</div>
          </div>
          <div class="cell__bd">
            <span v-for="item in detail.actors">
              {{item.name}}
            </span>
          </div>
        </div>
        <div class="cell">
          <div class="cell__hd">
            <div class="label">地区语言：</div>
          </div>
          <div class="cell__bd">
            {{detail.nation}}({{detail.language}})
          </div>
        </div>
        <div class="cell">
          <div class="cell__hd">
            <div class="label">类型：</div>
          </div>
          <div class="cell__bd">
            {{detail.category}}
          </div>
        </div>
        <div class="cell">
          <div class="cell__hd">
            <div class="label">上映日期：</div>
          </div>
          <div class="cell__bd">
            {{detail.premiereAt | formatDay}}
          </div>
        </div>
        <div class="cell">
          <div class="cell__bd">
            {{detail.synopsis}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    const id = this.$route.params.id
    if (id) {
      this.$store.dispatch('getFilmDetail', id)
    }
  },
  computed: mapGetters({
    detail: 'getFilmDetail'
  }),
  filters: {
    formatDay (time) {
      const date = new Date(time * 1)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()

      return year + '-' + month + '-' + day
    }
  }
}
</script>
<style lang="sass" scoped>
.cells__title {
  margin-top: .77em;
  margin-bottom: .3em;
  padding-left: 15px;
  padding-right: 15px;
  color: #999;
  font-size: 16px;
}
.cells {
  line-height: 1.41176471;
  font-size: 12px;
  overflow: hidden;
  position: relative;
}
.cell {
  padding: 10px 15px;
  position: relative;
  display: flex;
  align-items: center;
}
.label {
  display: block;
  width: 105px;
  word-wrap: break-word;
  word-break: break-all;
}
.info {
  span {
    display: inline-block;
    margin-right: 1px;
    &:after {
      content: "|";
    }
    &:last-child:after {
      content: '';
    }
  }
}
.cover {
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
