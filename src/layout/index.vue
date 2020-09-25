<template>
  <div :class="classObj" class="app-wrapper">
    <div class="header-top">
      <img v-if="sysLogo" :src="sysLogo" alt="">
      <img v-else src="../assets/images/logo.png" alt="">
      <span class="header-title">
        {{ sysUserConfig && sysUserConfig.sysName || '友康养老云 | 后台管理系统' }}</span>
      <div class="right-menu">
        <!--<template v-if="device!=='mobile'">
				  <search id="header-search" class="right-menu-item" />
				  <error-log class="errLog-container right-menu-item hover-effect" />
				  <screenfull id="screenfull" class="right-menu-item hover-effect" />
				  <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
					<size-select id="size-select" class="right-menu-item hover-effect" />
				  </el-tooltip>
				  <lang-select class="right-menu-item hover-effect" />
				</template>-->

        <el-dropdown
          v-if="showIt"
          class="avatar-container right-menu-item hover-effect"
          style="margin-right: 15px;"
          @command="changeDataType"
        >
          <div class="avatar-wrapper">
            {{ dataType }}
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in accountDataOptions"
              :key="index"
              :divided="index !== 0 ? true : false"
              :command="item"
            >
              {{ item.dictLabel }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!--信息管理start-->
        <!--trigger="click" 点击触发-->
        <el-dropdown class="avatar-container right-menu-item hover-effect" style="margin-right: 0;">
          <div class="avatar-wrapper">
            <el-badge v-if="msgAllTotal !== 0" :value="msgAllTotal" class="item messageSolid">
              <i class="el-icon-message-solid" />
            </el-badge>
            <div v-else class="item messageSolidNull">
              <i class="el-icon-message-solid" />
            </div>
          </div>
          <!--:style="msgAllTotal !== 0 ? 'padding: 0;width: 300px;':'width:0;height:0;overflow:hidden;padding:0;margin:0;border:none;'"-->
          <el-dropdown-menu slot="dropdown" style="padding: 0;width: 300px;">
            <el-tabs v-model="messageSolidActiveName" class="messageSolidTabs" @tab-click="handleClickMessageSolid">
              <el-tab-pane :label="'消息（'+msgTotal+'）'" name="first">
                <div v-if="msgData.bizSysMsgReceiveIPage.total">
                  <p v-for="(item,index) in msgData.bizSysMsgReceiveIPage.records" :key="index" class="msgItemdiv" @click="showMsgDetaileText(item,'a')">
                    <!--网站公告-->
                    <span v-if="item.msgType === 'web_ment'" class="itemTitleIcon" style="background-color:#EDC707;">
                      <i class="iconfont iconwzgg" />
                    </span>
                    <!--系统通知-->
                    <span v-else-if="item.msgType === 'sys_notification'" class="itemTitleIcon" style="background-color:#4E9DE2;">
                      <i class="iconfont iconxttz" />
                    </span>
                    <!--工作通知-->
                    <span v-else-if="item.msgType === 'job_notice'" class="itemTitleIcon" style="background-color:#E76949;">
                      <i class="iconfont icongztz" />
                    </span>
                    【{{ item.msgTypeName }}】{{ item.title }}
                  </p>
                </div>
                <p v-else style="text-align: center;margin: 0 0 10px 0;color: #adadad;">暂无消息</p>
                <div class="messageSolidMore" @click="jumptoMessageDetails()">查看更多</div>
              </el-tab-pane>
              <el-tab-pane :label="'待办（'+msgTotal_daiban+'）'" name="second">
                <div v-if="msgData.agendaTotalVoList.total" style="padding-bottom: 10px;">
                  <p v-for="(item,index) in msgData.agendaTotalVoList.agenda" :key="index" class="msgItemdiv" @click="jumptoMessageDetails_daiban(item.agendaType)">
                    <!--待办事项-->
                    <span class="itemTitleIcon" style="background-color:#73CA45;">
                      <i class="iconfont icondbsx" />
                    </span>
                    {{ item.promptTitle }}
                  </p>
                </div>
                <p v-else style="text-align: center;margin: 0 0 10px 0;color: #adadad;">暂无消息</p>
              </el-tab-pane>
            </el-tabs>
          </el-dropdown-menu>
        </el-dropdown>
        <!--信息管理end-->

        <el-dropdown class="avatar-container right-menu-item hover-effect">
          <div class="avatar-wrapper">
            <i class="fa fa-user-circle-o" aria-hidden="true" style="font-size: 24px;position: relative;top: 5px;margin-right: 10px;" />
            {{ name }}
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                {{ $t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="userInfomation">账号信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="updatePassword">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout1">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}" class="fullFixedHeader">
        <navbar>
          <tags-view v-if="needTagsView" />
        </navbar>
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <!--<settings />-->
      </right-panel>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
// import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters } from 'vuex'
import {
  accountDataType,
  getCharacters,
  getMessageData,
  getMessageReadStatus
} from '@/api/systemConfig/user'
import { closeSelectedTag } from '@/utils/rooterJump'
import eventBus from '@/utils/eventBus'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device',
      'data',
      'sysUserConfig',
      'message'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    sysLogo() {
      if (this.sysUserConfig && this.sysUserConfig.sysLogo) {
        return process.env.VUE_APP_API_IMGURL + this.sysUserConfig.sysLogo
      } else {
        return ''
      }
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    message: function(newVal, oldVal) {
      this.msgData = _.cloneDeep(newVal)
      this.msgData.bizSysMsgReceiveIPage.records = this.msgData.bizSysMsgReceiveIPage.records === null ? [] : this.msgData.bizSysMsgReceiveIPage.records
      this.msgData.bizSysMsgReceiveIPage.total = !this.msgData.bizSysMsgReceiveIPage.total ? 0 : this.msgData.bizSysMsgReceiveIPage.total
      this.msgData.agendaTotalVoList.agenda = this.msgData.agendaTotalVoList.agenda === null ? [] : this.msgData.agendaTotalVoList.agenda
      this.msgData.agendaTotalVoList.total = !this.msgData.agendaTotalVoList.total ? 0 : this.msgData.agendaTotalVoList.total
      this.msgAllTotal = this.msgData.bizSysMsgReceiveIPage.total + this.msgData.agendaTotalVoList.total
      this.msgTotal = this.msgData.bizSysMsgReceiveIPage.total
      this.msgTotal_daiban = this.msgData.agendaTotalVoList.total
    }
  },
  data() {
    return {
      accountDataOptions: [],
      dataType: '正式账号',
      showIt: true,

      messageSolidActiveName: 'first',
      msgData: {
        agendaTotalVoList: {
          agenda: [],
          total: ''
        },
        bizSysMsgReceiveIPage: {
          records: []
        }
      },

      msgAllTotal: 0, // 消息总数量
      msgTotal: 0, // 未读消息数
      msgTotal_daiban: 0, // 代办未读数量
      messageDropdownMenu: false
    }
  },
  created() {
    eventBus.$on('change', (message) => {
      // 一些操作，message就是从top组件传过来的值
      this.msgAllTotal = message
    })
  },
  mounted() {
    this.changeSystemColor()
    this.getData()
    this.getCharacter()
    this.getMessageData()
    if (this.data.accountDataType === 'test') {
      this.dataType = '测试账号'
    }
    switch (this.data.accountDataType) {
      case 'test':
        this.dataType = '测试账号'
        break
      case 'prod':
        this.dataType = '正式账号'
        break
      case 'trial':
        this.dataType = '试用账号'
        break
    }
    if (localStorage.getItem('dataType')) {
      localStorage.removeItem('dataType')
      if (this.data.accountDataType) {
        localStorage.setItem('dataType', this.data.accountDataType)
      }
    } else {
      if (this.data.accountDataType) {
        localStorage.setItem('dataType', this.data.accountDataType)
      }
    }
  },
  methods: {
    // 消息面板的change事件
    handleClickMessageSolid(tab, event) {
    },
    // 点击查看当前消息的详情
    showMsgDetaileText(val, tag) {
      const h = this.$createElement
      let messageCotent = ''
      if (tag === 'a') {
        messageCotent = h('p', null, [
          h('p', { style: 'overflow:hidden;' }, [
            h('p', { style: 'float:left;width:70px;font-weight: bold;' }, '消息标题：'),
            h('p', { style: 'float:left;width:370px;' }, val.title)
          ]),
          h('p', { style: 'overflow:hidden;' }, [
            h('p', { style: 'float:left;width:70px;font-weight: bold;' }, '消息类型：'),
            h('p', { style: 'float:left;width:370px;' }, val.msgTypeName)
          ]),
          h('p', { style: 'overflow:hidden;' }, [
            h('p', { style: 'float:left;width:70px;font-weight: bold;' }, '发布对象：'),
            h('p', { style: 'float:left;width:370px;' }, val.sendObjTypeName)
          ]),
          h('p', { style: 'overflow:hidden;' }, [
            h('p', { style: 'float:left;width:70px;font-weight: bold;' }, '消息内容：'),
            h('p', { style: 'float:left;width:370px;max-height:150px;overflow:auto;' }, val.content)
          ])
        ])
      } else {
        messageCotent = h('p', null, [
          h('p', { style: 'overflow:hidden;' }, [
            h('p', { style: 'float:left;width:70px;font-weight: bold;' }, '消息内容：'),
            h('p', { style: 'float:left;width:370px;max-height:150px;overflow:auto;' }, val.title)
          ])
        ])
      }

      this.$msgbox({
        title: '查看消息',
        message: messageCotent,
        showCancelButton: false,
        confirmButtonText: '确定'
        // cancelButtonText: '取消',
      }).then(() => {
        // this.$message('消息已读');
        this.$message({
          type: 'success',
          message: '消息已读'
        })
        this.getMessageReadStatus(val.id)
      }).catch(() => {
        this.getMessageReadStatus(val.id)
      })
    },
    // 跳转到消息列表
    jumptoMessageDetails() {
      let readStatus = ''
      if (this.msgData && this.msgData.bizSysMsgReceiveIPage.total === 0 || !this.msgData) {
        readStatus = 'all'
      } else {
        readStatus = 'unread'
      }
      this.$router.push({
        path: `/message/messageDetails`,
        query: { 'readStatus': readStatus }
      })
    },
    // 跳转到代办的详情页
    jumptoMessageDetails_daiban(val) {
      // to police
      if (val === 'policyInfo') {
        this.$router.push({
          path: `/streetPlatform/policyInfoConfig/policyInfoAudit`
        })
      }
    },
    // 改变系统颜色
    changeSystemColor() {
      switch (this.data.sysRoles[0].roleKey) {
        // 运营样式
        case 'sup_admin':
        case 'sys_admin':
        case 'operate_summary_manage':
        case 'operate_manage':
          document.getElementById('app').className = 'yunying'
          break
          // 运维样式
        case 'dev_manage':
          document.getElementById('app').className = 'yunwei'
          break
          // 企业样式
        default:
          document.getElementById('app').className = 'qiye'
      }
    },
    // 账户权限
    getCharacter() {
      getCharacters().then(response => {
        if (response === true) {
          this.showIt = true
        } else {
          this.showIt = false
        }
      })
    },
    // 获取账号数据类型
    getData() {
      accountDataType().then(response => {
        this.accountDataOptions = response.rows
      })
    },
    // 改变数据类型
    changeDataType(item) {
      localStorage.removeItem('dataType')
      localStorage.setItem('dataType', item.dictValue)
      localStorage.getItem('dataType')
      this.dataType = item.dictLabel
    },
    // 获取消息数据
    getMessageData() {
      getMessageData().then(response => {
        if (response) {
          response.bizSysMsgReceiveIPage.records = response.bizSysMsgReceiveIPage.records === null ? [] : response.bizSysMsgReceiveIPage.records
          response.bizSysMsgReceiveIPage.total = !response.bizSysMsgReceiveIPage.total ? 0 : response.bizSysMsgReceiveIPage.total
          response.agendaTotalVoList.agenda = response.agendaTotalVoList.agenda === null ? [] : response.agendaTotalVoList.agenda
          response.agendaTotalVoList.total = !response.agendaTotalVoList.total ? 0 : response.agendaTotalVoList.total
          this.msgData = response

          this.msgAllTotal = this.msgData.bizSysMsgReceiveIPage.total + this.msgData.agendaTotalVoList.total
          this.msgTotal = this.msgData.bizSysMsgReceiveIPage.total
          this.msgTotal_daiban = this.msgData.agendaTotalVoList.total

          this.$store.commit('message/ADD_MESSAGE_LIST', response)
        } else {
          this.$message.error('消息接口请求失败！')
        }
      }).catch(() => {
        this.$message.error('消息接口请求失败！')
      })
    },
    // 改变已读消息的状态
    getMessageReadStatus(id) {
      getMessageReadStatus(id).then(response => {
        if (response.code === 0) {
          this.getMessageData()

          // 判断tab菜单是否有‘消息列表’标签，如果有：则让‘消息列表’的未读消息刷新新数据。如果没有：则不进行任何操作
          this.visitedViews.forEach(item => {
            if (item.name === 'messageDetails') {
              this.$store.commit('message/ADD_TABBAR_ITEM_NAME', id)
            }
          })
        } else {
          this.$message.error('改变消息状态接口失败！')
        }
      }).catch(() => {
        this.$message.error('改变消息状态接口失败！')
      })
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    userInfomation() {
      this.$router.push('/userInfo/index')
    },
    updatePassword() {
      this.$router.push(`/user/updatePassword`)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.pushLogin()
    },
    pushLogin() {
      return new Promise((resolve, reject) => {
        this.$router.push(`/login`)
      })
    },
    logout1() {
      this.$confirm('确认退出登录？', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        })
      })
    }
  }
}
</script>

<style>
	@import "~@/styles/changeStyle/index.scss";
	@import "~@/styles/form.css";
</style>
<style lang="scss" scoped>
	@import "~@/styles/mixin.scss";
	@import "~@/styles/variables.scss";

	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;

		&.mobile.openSidebar {
			position: fixed;
			top: 0;
		}
		.header-top {
			width: 100%;
			height: 54px;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			img {
				width: 32px;
				height: 32px;
				margin: 12px;
			}
			.header-title {
				display: inline-block;
				font-size: 22px;
				color: #ffffff;
				vertical-align: top;
				line-height: 54px;
			}
		}
		:root .header-top {
			filter: none;
		}
	}

	.sidebar-container {
		height: calc(100% - 54px) !important;
		top: 54px !important;
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	/*.fixed-header{
	  position: fixed;
	  top: 0;
	  right: 0;
	  z-index: 9;
	  width: calc(100% - #{$sideBarWidth});
	  transition: width 0.28s;
	}

	.hideSidebar .fixed-header {
	  width: calc(100% - 54px)
	}*/

	.mobile .fixed-header {
		width: 100%;
	}

	/*将头部菜单区域fixed定位*/
	.fullFixedHeader {
		position: fixed;
		width: calc(100% - #{$sideBarWidth});
		transition: width 0.28s;
		top: 54px;
		right: 0;
		z-index: 999;
	}

	.hideSidebar .fullFixedHeader {
		width: calc(100% - 54px);
	}

	.mobile .fullFixedHeader {
		width: 100%;
	}

	.app-main {
		padding-top: 84px;
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;

		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 8px;
			height: 100%;
			font-size: 18px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background .3s;

				&:hover {
					background: rgba(0, 0, 0, .025)
				}
			}
		}
		.user-header {
			vertical-align: top;
			padding-top: 16px;
			padding-left: 10px;
			color: #ffffff;
		}
		.avatar-container {
			margin-right: 30px;

			.avatar-wrapper {
				position: relative;
				font-size: 14px;
				color: #ffffff;
				line-height: 54px;
				margin-right: 10px;
				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 20px;
					font-size: 14px;
				}
			}
		}
	}

	.messageSolid{
		position: relative;
		top: 0px;
		height: 30px;
		margin: -15px 0 0 0;
		cursor: pointer;

		.el-icon-message-solid{
			font-size: 28px;
			color: #ffffff;
		}
	}
	.messageSolidNull{
		.el-icon-message-solid{
			font-size: 28px;
			color: #ffffff;
			position: relative;
			top: 7px;
		}
	}
</style>

<style>
	.el-badge__content.is-fixed{
		top: 12px !important;
	}
	.messageSolidTabs > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav{
		width: 100% !important;
	}
	.messageSolidTabs > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item{
		padding: 0 !important;
		width: 50%;
		text-align: center;
	}
	.messageSolidTabs > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar{
		width: 50%;
	}
	.msgItemdiv{
		margin: 0;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		cursor: pointer;
		height: 24px;
		padding: 0 10px;
	}
	.msgItemdiv:hover{
		color: #1890ff;
		text-decoration: underline;
	}
	.massageDetailsDialog > .el-dialog{
		width: 260px !important;
	}
	.messageSolidMore{
		text-align: center;
		height: 38px;
		line-height: 38px;
		cursor: pointer;
		border-top: 1px solid #e1e1e1;
		color: #1890ff;
	}
	.marqueeDiv{
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -30%;
		z-index: 99;
		width: 60%;
		height: 30px;
		line-height: 30px;
		background-color: rgb(253, 241, 218);
		color: #FFA900;
		padding: 0 40px 0 30px;
	}
	.marqueeDiv > .msgIcon{
		position: absolute;
		top: 5px;
		left: 5px;
		cursor: pointer;
		font-size: 20px;
		color: #FFA900;
	}
	.marqueeDiv > .el-icon-circle-close{
		position: absolute;
		top: 5px;
		right: 10px;
		cursor: pointer;
		font-size: 20px;
		color: #FFA900;
	}
	.marqueeDiv > marquee > span{
		padding: 0 20px;
	}
	.messageSolidTabs > .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar{
		width: 129px !important;
	}
</style>
