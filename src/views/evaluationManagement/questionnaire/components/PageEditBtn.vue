<template>
  <div :class="['questionaire-edit--btn', isEditFix ? 'edit--btn__fixed': '']">
    <el-button type="primary" class="base-btn" @click="handleHrefEdit">编辑</el-button>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isEditFix: false
    }
  },
  mounted() {
    // -- scroll监听
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() { // -- 移除scroll监听
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() { // 监听滚动处理
      const offsetY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isEditFix = offsetY >= 150
    },
    handleHrefEdit() { // 路由跳转
      this.$router.push({
        path: this.options.path,
        query: this.options.query
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.questionaire-edit--btn{
    height:40px;
    width:100%;
    z-index:999;
    text-align: right;
  &.edit--btn__fixed{
    background-color: #fff;
    height: 65px;
    width:calc(100% - 240px);
    position: fixed;
    bottom:0px;
    right:10px;
    z-index:999;
    padding-top:16px;
    padding-right:10px;
    box-shadow: 0px -1px 4px 0 rgba(0,0,0,0.1);
  }
}
</style>
