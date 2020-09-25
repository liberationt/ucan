<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ generateTitle(tag.title) }}
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        {{ $t('tagsView.refresh') }}
      </li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">
        {{ $t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">
        {{ $t('tagsView.closeOthers') }}
      </li>
      <li @click="closeAllTags(selectedTag)">
        {{ $t('tagsView.closeAll') }}
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import { generateTitle } from '@/utils/i18n'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  created() {
    // window.addEventListener('beforeunload',()=>{
    //   sessionStorage.setItem('state', this.$store.state.tagsView.visitedViews)
    // })
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    isActive(route) {
      return route.path === this.$route.path
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      if (view.query.modelType !== undefined && view.query.modelType === 'edit') {
        this.$confirm(
          "该页面的信息尚未保存，确定要关闭页面吗",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
              if (this.isActive(view)) {
                this.toLastView(visitedViews, view)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作！"
            });
          });
      } else {
        this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
      }
    },
    closeOthersTags() {
      let isCLose = true
      for (let i = 0; i < this.visitedViews.length; i++){
        if (this.visitedViews[i].name !== this.selectedTag.name) {
          if (this.visitedViews[i].query && this.visitedViews[i].query.modelType === 'edit') {
            isCLose = false
            break
          }
        }
      }
      if (isCLose === false) {
        this.$confirm(
          "编辑页面的信息尚未保存，确定要关闭其他页面吗",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$router.push(this.selectedTag)
            this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
              this.moveToCurrentTag()
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作！"
            });
          });
      } else {
        this.$router.push(this.selectedTag)
        this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
          this.moveToCurrentTag()
        })
      }
    },
    closeAllTags(view) {
      let isCLose = true
      for (let i = 0; i < this.visitedViews.length; i++){
        if (this.visitedViews[i].query && this.visitedViews[i].query.modelType === 'edit') {
          isCLose = false
          break
        }
      }
      if (isCLose === false) {
        this.$confirm(
          "编辑页面的信息尚未保存，确定要关闭全部页面吗",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
              if (this.affixTags.some(tag => tag.path === view.path)) {
                return
              }
              this.toLastView(visitedViews, view)
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作！"
            });
          });
      } else {
        this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
          if (this.affixTags.some(tag => tag.path === view.path)) {
            return
          }
          this.toLastView(visitedViews, view)
        })
      }

    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY - 55
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 42px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;
  /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);*/
  .tags-view-wrapper {
    height: 100%;
    background:#fff;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 42px;
      line-height: 42px;
      color: #495060;
      background: #fff;
      padding: 0 24px;
      font-size: 14px;
      border-right:1px solid #c0c8ce!important;
      // border-right: #c0c8ce;
      &:first-of-type {
        margin-left: 38px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #eaf0fb;
        color: #3367d6;
       /* border-color: #1890ff;*/
        border: none;

        /*&::before {*/
          /*content: '';*/
          /*background: #fff;*/
          /*display: inline-block;*/
          /*width: 8px;*/
          /*height: 8px;*/
          /*border-radius: 50%;*/
          /*position: relative;*/
          /*margin-right: 2px;*/
        /*}*/
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
        font-size: 16px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
