<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="fonr-zero-four">
        您要找的页面不存在！
      </div>
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/404_images/img404.png" alt="404">
      </div>
      <div class="bnt-404">
        <div class="bullshit">
          <router-link to="/" class="bullshit__return-home">
            返回首页
          </router-link>
        </div>
        <div class="bullshit" @click="goBack">
          <span>后退一步</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '网管说这个页面你不能进......'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
  @import "../../styles/font/font.css";
  .wscn-http404-container{
    width:100%;
    text-align: center;
  }
  .wscn-http404{
    width:500px;
    height: 500px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    top:50%;
    margin-top: -250px;
  }
  .pic-404{
    margin-top: 50px;
  }
  .bullshit{
    width:100px;
    background: #fff000;
    line-height: 40px;
    border-radius: 5px;
    font-size: 18px;
    color: #ffffff;
    float: left;
    margin: 0 50px;
    cursor: pointer;
  }
  .bnt-404{
    margin-top: 100px;
    padding: 0 50px;
  }
</style>
