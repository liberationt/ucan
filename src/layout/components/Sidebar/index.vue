<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="ggggg"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        :unique-opened="true"
        mode="vertical"
        router
        @select="handleSelect"
      >
        <template v-if="isShow">
          <sidebar-item
            v-for="(route, index) in permission_routes"
            :key="index"
            :item="route"
            :base-path="route.url"
          />
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { menuList } from '@/api/user'

export default {
  components: { SidebarItem, Logo },
  watch: {
    $route(to, from) {
      sessionStorage.removeItem('btns')
      const btns = []
      if (this.$route.meta.btns && this.$route.meta.btns.length > 0) {
        this.$route.meta.btns.forEach(item => {
          btns.push(item.name)
        })
      }
      sessionStorage.setItem('btns', JSON.stringify(btns))
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes',
      'isShow'

    ]),
    ...mapState({
      routes: state => state.permission.routes
    }),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      menusList: []
    }
  },
  mounted() {
    sessionStorage.removeItem('btns')
    const btns = []
    if (this.$route.meta.btns && this.$route.meta.btns.length > 0) {
      this.$route.meta.btns.forEach(item => {
        btns.push(item.name)
      })
    }
    sessionStorage.setItem('btns', JSON.stringify(btns))
  },
  methods: {
    // 获取当前选中菜单名字
    handleSelect(key, keyPath) {
    }
  }
}
</script>
