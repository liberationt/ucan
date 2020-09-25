<template>
  <section class="app-main" :class="[show === true ? 'index-css' : '']">
    <transition name="fade-transform" mode="out-in">
      <!---->
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
<!--    <div class="app-bottom" :class="[sidebar.opened === true ? 'longFix' : 'shortFix']" v-show="show">-->
    <div class="app-bottom" v-show="show">
      <p class="copyright">技术支持：上海友康信息科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor:pointer" href="http://www.beian.miit.gov.cn"> 沪ICP备11002366号</a>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202011519">
          <img src="../../assets/images/emblembg.png"/><span style="margin: 0px 0px 0px 5px;">沪公网安备 31011202011519号</span></a>
      </p>
    </div>
  </section>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    cachedViews() {
      // const arr = ['IntelligentOldAgeConsultant']
      // return arr
      const arr = JSON.parse(JSON.stringify(this.$store.state.tagsView.cachedViews))
      arr.forEach((item, index) => {
        if (item === '志愿者服务记录') {
          arr[index] = '' +
            'zyzfwjl'
        }
      })
      return arr
    },
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    if (this.$route.meta.index) {
      this.show = true
    } else {
      this.show = false
    }
  },
  watch: {
    $route() {
      if (this.$route.meta.index) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 80px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 80px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 0px);
  }

  .fixed-header+.app-main {
    padding-top: 114px;
  }
}
.app-bottom {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  right: 0;
}
.longFix {
  padding-left: 219px;
}
.shortFix {
  padding-left: 53px;
}
</style>

