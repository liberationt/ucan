<template>
  <div class="topic-list-container">
    <div class="top-list-header">
      <h5>{{ title }}</h5>
      <div class="list-line" />
      <div class="list-dropdown" @click="showTopic = !showTopic">
        <i :class="!showTopic ? 'el-icon-arrow-down' : 'el-icon-arrow-up' " />
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="showTopic" class="topic-list-content">
        <!-- 父组件不同渲染内容 插槽信息 -->
        <slot name="topic-list" />
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
export default {
  name: 'TopicList',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      showTopic: true
    }
  }
}
</script>
<style lang="scss" scoped>
.topic-list-container{
  .top-list-header{
    width:100%;
    height:48px;
    line-height:48px;
    display: flex;
    justify-content: flex-start;
    padding:0 20px;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      left:0px;
      top:14px;
      height:20px;
      width:4px;
      background-color:#3367D6;
      z-index:99;
    }
    h5{
      margin:0;
      padding:0;
      font-size:18px;
      font-weight:bold;
      padding-left:10px;
      padding-right:20px;
      background-color:#fff;
      position: absolute;
      top:0px;
      left:8px;
      z-index:10;
    }
    .list-line{
      width: calc(100% - 70px);
      height:1px;
      border-top: 1px dashed #e5e5e5;
      margin-top: 25px;
      margin-left:20px;
      position: absolute;
      z-index:9;
      top:-1px;
      left:0;
    }
    .list-dropdown{
      position: absolute;
      right:10px;
      z-index:100;
      top:14px;
      width:20px;
      height:20px;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
</style>
