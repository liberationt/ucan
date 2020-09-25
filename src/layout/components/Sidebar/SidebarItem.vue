<template>
	<div v-if="!item.hidden" class="menu-wrapper xxxxxxxx">
		<el-submenu :index="item.name" v-if="item.children !== null && item.name !== '首页'">
			<template slot="title">
				<span class="iconfont" style="padding-right: 10px;"
				      v-html="item.meta.icon === '#' ? '' : item.meta.icon"></span>
				<span slot="title">{{item.name}}</span>
			</template>
			<span v-for="(childMenu, childIndex) in item.children" :key="childIndex">
        <el-menu-item :index="childMenu.path" v-if="!childMenu.children">
          <span class="iconfont" style="padding-right: 10px; " v-html="childMenu.meta.icon === '#' ? '' : childMenu.meta.icon"></span>
          <span >{{childMenu.name}}</span>
          <span style="position: absolute;width: 100%;height: 50px;left: 0" v-if="isHttp(childMenu.path)" @click.stop="toScreen(childMenu.path)"></span>
        </el-menu-item>
        <sidebar-item :key="childIndex" :item="childMenu" v-if="childMenu.children"/>
      </span>
		</el-submenu>
		<el-menu-item :index="item.path" v-if="item.children === null || item.name === '首页'">
			<span class="iconfont" style="padding-right: 10px;" v-html="item.meta.icon"></span>
			<span slot="title">{{item.name}}</span>
		</el-menu-item>
	</div>
</template>

<script>
	import path from 'path'
	import {generateTitle} from '@/utils/i18n'
	import {isExternal} from '@/utils/validate'
	import Item from './Item'
	import FixiOSBug from './FixiOSBug'
  import {mapGetters} from 'vuex'
  import { getToken } from '@/utils/auth'
  import qs from 'qs';
	export default {
		name: 'SidebarItem',
		components: {Item},
    computed: {
      ...mapGetters([
        'data',
      ])
    },
		mixins: [FixiOSBug],
		props: {
			// route object
			item: {
				type: Object,
				required: true
			},
			isNest: {
				type: Boolean,
				default: false
			},
			basePath: {
				type: String,
				default: ''
			}
		},
		data() {
			// To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
			// TODO: refactor with render function
			this.onlyOneChild = null
			return {}
		},
		methods: {
		  isHttp(str) {
        if(str.substr(0, 4) == "http"){
          return true
        }
      },
      toScreen(url) {
        let screenQuery = {
          'accessToken': getToken(),
          'dataType': this.data.accountDataType
        };
        let screenQueryStr = qs.stringify(screenQuery);
        let href = url + '?' + screenQueryStr;
        window.open(href)
      },
			hasOneShowingChild(children = [], parent) {
				const showingChildren = children.filter(item => {
					if (item.hidden) {
						return false
					} else {
						// Temp set(will be used if only has one showing child)
						this.onlyOneChild = item
						return true
					}
				})

				// When there is only one child router, the child router is displayed by default
				if (showingChildren.length === 1) {
					return true
				}

				// Show parent if there are no child router to display
				if (showingChildren.length === 0) {
					this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
					return true
				}

				return false
			},
			resolvePath(routePath) {
				if (isExternal(routePath)) {
					return routePath
				}
				if (isExternal(this.basePath)) {
					return this.basePath
				}
				return path.resolve(this.basePath, routePath)
			},

			generateTitle
		}
	}
</script>
