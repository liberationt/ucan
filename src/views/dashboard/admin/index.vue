<template>
  <div class="dashboard-editor-container" :style="contentStyleObj" >
    <img src="@/assets/images/homebg.png" alt="">
    <div class="notice" v-show="isShow">
      <span class="iconfont laba">&#xe628;</span>
      <span class="iconfont close" @click="close">&#xe608;</span>
      <el-carousel height="40px" :interval="6000" indicator-position="none"  direction="vertical">
        <el-carousel-item v-for="(item,index) in marqueeData" :key="index">
          <div class="notice-body">
            <span style="cursor: pointer" @click="toDetail">{{ item.title }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

import {getMessageData} from "@/api/systemConfig/user";
import {mapGetters} from 'vuex'

export default {
  name: 'DashboardAdmin',
  components: {

  },
  computed: {
		...mapGetters([
			'message'
		]),
	},
	watch: {
		message: function(newVal, oldVal) {
			if(newVal.bizSysMsgReceiveIPage.records.length !== 0){
				this.marqueeData = _.cloneDeep(newVal.bizSysMsgReceiveIPage.records);
				this.isShow = true;
			}
			else {
				this.marqueeData = [];
				this.isShow = false;
			}
		}
	},
  mounted() {
	  this.getMessageData();
  },
  data() {
    return {
      contentStyleObj:{
        height:''
      },
      isShow: false,
	    marqueeData:[],//跑马灯数据
    }
  },
  created(){
    window.addEventListener('resize', this.getHeight);
    this.getHeight()
  },
  destroyed(){
    window.removeEventListener('resize', this.getHeight)
  },
  methods: {
    toDetail() {
      this.$router.push({
        path: '/message/messageDetails?readStatus=all',
        query: {
          'readStatus': 'unread',
        }
      })
    },
    getHeight(){
      this.contentStyleObj.height=window.innerHeight - 96 + 'px';
    },
    close() {
      this.isShow = false
    },
	  //获取消息数据
	  getMessageData(){
		  getMessageData().then(response => {
			  if (response) {
			  	  if(response.bizSysMsgReceiveIPage.records.length !== 0){
				      this.marqueeData = response.bizSysMsgReceiveIPage.records;
				      this.isShow = true;
                  }
                  else {
				      this.marqueeData = [];
				      this.isShow = false;
                  }
			  }
		  })
	  },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  height: 100%;
  width:100%;
  background-color: rgb(240, 242, 245);
  position: relative;
  margin-top: 10px;
  img{
    height: 100%;
    width:100%;
  }
  .notice {
    width:100%;
    position: absolute;
    top: 0px;
    .iconfont {
      position: absolute;
      z-index: 99;
      color:#ffb627;
      top:10px;
    }
    .laba{
      left: 15px;
    }
    .close{
      right: 15px;
      width:18px;
      height:18px;
      text-align: center;
      border-radius: 50%;
      border:1px solid #ffb627;
      cursor: pointer;
      font-size: 14px;
      line-height: 18px;
    }
    .notice-body {
      color:#ffb627;
      background-color:#fdf1da;
      width: 100%;
      padding: 10px 10px;
      height: 40px;
      line-height: 20px;
      span{
        margin-left: 30px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
        width: 100%;
        padding-right: 100px;
      }
    }
  }
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
