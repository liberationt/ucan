<template>
  <div class="queryBg">
    <div class="queryBgCon">
      <div class="pgquery"> 评估查询</div>
      <el-input v-model="input" style="width:400px;" placeholder="请输入老人身份证查询" />
      <el-button type="primary" icon="el-icon-search" @click="toDetails">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  methods: {
    toDetails() {
      // this.$router.push()
      this.$router.push({
        path: `/evaluationQuery/details`,
        query: { '_title': `查看评估查询` }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .queryBg{
        background:#fff;
        height:calc( 100vh - 120px );
        .queryBgCon{
            position: absolute;
            left: 50%;
            top:40%;
            transform: translate(-50%,-50%);
        }
        .pgquery{
            text-align: center;
            margin-bottom:80px;
            font-size:40px;
            font-weight: 700;
            background-image: linear-gradient(0deg,#011764,#0b48b4);
            -webkit-background-clip:text;
            color: transparent;

        }
    }
</style>
