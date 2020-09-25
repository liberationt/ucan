<template>
  <div style="width: 100%; height: 100%">
    <el-row v-if="isLogin === true" :gutter="0">

      <!-- 2019-09-26 产品确认去掉logo -->
      <!--		<img class="ucanLogo" src="../../assets/images/ucanLogo.png">-->
      <el-col class="contentLeft" style="overflow: hidden">
        <div class="grid-content bg-content">
          <img class="loginBgImg" src="../../assets/images/loginBgImg.png">
        </div>
      </el-col>
      <el-col class="contentRight">
        <div class="grid-content login-container">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <img src="../../assets/images/pensionCloudLogo.png">
            </div>

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
                name="username"
                type="text"
                autocomplete="off"
                tabindex="1"
              />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  :placeholder="$t('login.password')"
                  name="password"
                  autocomplete="off"
                  tabindex="2"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>

            <el-form-item prop="code" class="codeWrap">
              <el-input
                ref="code"
                v-model="loginForm.code"
                name="code"
                type="text"
                placeholder="请输入验证码"
                tabindex="3"
                @keyup.enter.native="flag&&handleLogin()"
              />
              <img class="codeDiv" :src="codeImgUrl" @click="getCodeImgUrl">
            </el-form-item>
            <!-- <input type="text" > -->
            <el-checkbox
              v-model="checked"
              tabindex="4"
              @keyup.space.native="spaces"
            >记住密码
            </el-checkbox>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:30px;"
              tabindex="5"
              @click.native.prevent="handleLogin"
            >{{ $t('login.logIn') }}
            </el-button>
          </el-form>
        </div>
      </el-col>
      <p class="copyright">技术支持：上海友康信息科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor:pointer" href="http://www.beian.miit.gov.cn"> 沪ICP备11002366号</a>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202011519">
          <img src="../../assets/images/emblembg.png"><span style="margin: 0px 0px 0px 5px;">沪公网安备 31011202011519号</span></a>
      </p>
    </el-row>
    <div v-if="isLogin === false" class="fj-login">
      <div class="fj-login-form">
        <div class="fj-login-logo">
          <img src="../../assets/fjImg/fj-logo.png" alt="">
        </div>
        <div class="fj-login-title">
          上海市康复辅助器具社区租赁管理平台
        </div>
        <div class="fj-login-input">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="fj-login-input-bd"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="username">
              <span class="iconfont-fj fj-icon">&#xe655</span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                :placeholder="$t('login.username')"
                name="username"
                type="text"
                autocomplete="off"
                tabindex="1"
              />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="iconfont-fj fj-icon">&#xe654</span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  :placeholder="$t('login.password')"
                  name="password"
                  autocomplete="off"
                  tabindex="2"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                />
<!--                <span class="show-pwd" @click="showPwd">-->
<!--                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
<!--                </span>-->
              </el-form-item>
            </el-tooltip>

            <el-form-item prop="code" class="codeWrap">
              <span class="iconfont-fj fj-icon">&#xe656</span>
              <el-input
                ref="code"
                v-model="loginForm.code"
                name="code"
                type="text"
                placeholder="请输入验证码"
                tabindex="3"
                @keyup.enter.native="flag&&handleLogin()"
              />
              <img class="codeDiv" :src="codeImgUrl" @click="getCodeImgUrl">
            </el-form-item>
            <!-- <input type="text" > -->
            <el-checkbox
              v-model="checked"
              tabindex="4"
              @keyup.space.native="spaces"
            >记住密码
            </el-checkbox>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:30px;"
              tabindex="5"
              @click.native.prevent="handleLogin"
            >立即登录
            </el-button>
          </el-form>
        </div>
      </div>
      <div class="fj-login-bz">
        <p>©上海市民政局版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沪ICP备11002366号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;沪公网安备 31011202011519号</p>
        <p>技术支持：上海友康信息科技有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { setName } from '@/utils/auth'
import {
  menuList,
  validateCode
} from '@/api/user'
import qs from 'qs'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
      callback()
    }
    return {
      flag: true,
      loginForm: {
        username: '',
        password: '',
        code: '',
        deviceId: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      checked: false,
      codeImgUrl: '', // 图片验证码
      isLogin: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    if (window.location.hostname === process.env.VUE_APP_host) {
      this.isLogin = false
    } else {
      this.isLogin = true
    }
    console.log(window.location.hostname, process.env.VUE_APP_host, this.isLogin)
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    // 挂载之后获取验证码
    this.getCodeImgUrl()
    if (localStorage.getItem('LoginSelf')) {
      this.loginForm.username = JSON.parse(localStorage.getItem('LoginSelf')).username
      this.loginForm.password = JSON.parse(localStorage.getItem('LoginSelf')).password
      this.checked = JSON.parse(localStorage.getItem('LoginSelf')).checked
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    spaces() {
      this.checked = this.checked != true
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
						(!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 获取图片验证码
    getCodeImgUrl() {
      this.loginForm.deviceId = Math.random()
      validateCode(this.loginForm.deviceId).then(res => {
        if (res) {
          this.codeImgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        }
      })
      // this.codeImgUrl =
      // 	process.env.VUE_APP_API_DOMAIN + "/uaa/validata/code/" +
      // 	this.loginForm.deviceId;
    },
    handleLogin() {
      this.flag = false
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then((response) => {
			  this.flag = true
              const queryStr = location.search.slice(1)
              const query = qs.parse(queryStr)
              if (query.redirectType === 'screen') {
                const { access_token, refresh_token } = response
                menuList(access_token).then((res) => {
                  // 跳转回大屏，携带查询字符串 Admin-Token
                  const screenQuery = {
                    'accessToken': access_token,
                    'dataType': res.accountDataType
                  }
                  const screenQueryStr = qs.stringify(screenQuery)
                  location.href = query.redirect + '?' + screenQueryStr
                })
              } else {
                // 存入用户账号
                if (localStorage.getItem('LoginSelf') && this.checked == true) {
                  localStorage.removeItem('LoginSelf')
                  this.loginForm.checked = this.checked
                  localStorage.setItem('LoginSelf', JSON.stringify(this.loginForm))
                } else if (!localStorage.getItem('LoginSelf') && this.checked == true) {
                  this.loginForm.checked = this.checked
                  localStorage.setItem('LoginSelf', JSON.stringify(this.loginForm))
                } else if (localStorage.getItem('LoginSelf') && this.checked == false) {
                  localStorage.removeItem('LoginSelf')
                }
                setName(this.loginForm.username)
                this.$router.push({ path: this.redirect || '/' })
							  this.loading = false
              }
            })
            .catch((res) => {
			  this.getCodeImgUrl()
			  this.flag = true
              this.loginForm.code = ''
              this.loading = false
            })
        } else {
          this.getCodeImgUrl()
          this.flag = true
          return false
        }
      })
    }
  }
}
</script>
<style>
	/* .el-checkbox:focus {
	  outline: none !important;
	} */
</style>
<style lang="scss">
	@import "../../styles/variables.scss";

	$bg: #283443;
	$light_gray: #fff;
	$cursor: #fff;

	@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
		.login-container .el-input input {
			color: $cursor;
		}
	}

	/* reset element-ui css */
	.login-container {
		.el-input {
			display: inline-block;
			height: 44px;
			line-height: 44px;
			width: 100%;
			padding-left: 40px;
			padding-right: 20px;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				/*padding: 12px 5px 12px 15px;*/
				color: $light_gray;
				height: 44px;
				caret-color: $cursor;
				font-size: $fontSize16;

				&:-webkit-autofill {
					box-shadow: 0 0 0px 1000px #0f498f inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}

		.el-form-item {
			border: 1px solid #cfdbe9;
			-webkit-border-radius: 25px;
			-moz-border-radius: 25px;
			border-radius: 25px;
			color: #454545;
			font-size: $fontSize18;
			margin-bottom: 24px;
      padding: 1px 0;
		}

		.el-button {
			font-size: $fontSize16;
			-webkit-border-radius: 25px;
			-moz-border-radius: 25px;
			border-radius: 25px;
			height: 44px;
			background: #1281f2;
			background: -moz-linear-gradient(top, #1281f2 0%, #0567cc 100%);
			background: -webkit-gradient(
							linear,
							left top,
							left bottom,
							color-stop(0%, #1281f2),
							color-stop(100%, #0567cc)
			);
			background: -webkit-linear-gradient(top, #1281f2 0%, #0567cc 100%);
			background: -o-linear-gradient(top, #1281f2 0%, #0567cc 100%);
			background: -ms-linear-gradient(top, #1281f2 0%, #0567cc 100%);
			background: linear-gradient(to bottom, #1281f2 0%, #0567cc 100%);
			/* ie9 一下处理 */
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1281f2', endColorstr='#0567cc', GradientType=0);
		}

		.el-form-item__content {
			font-size: $fontSize18;
		}

		.el-checkbox {
			margin-bottom: 20px;
			color: #ffffff;
			font-style: $fontSize16;
		}
	}
  .fj-login {
    width: 100%;
    height: 100%;
    background: url("../../assets/fjImg/fj-bg.png") center no-repeat;
    background-size: 100% 100%;
    position: relative;
    .fj-login-form {
      position: absolute;
      width: 460px;
      height:520px;
      background: #ffffff;
      border-radius: 8px;
      right: 8%;
      top: 50%;
      margin-top: -260px;
      .fj-login-logo {
        text-align: center;
        width: 100%;
        margin-top: 30px;
      }
      .fj-login-title {
        font-size: 24px;
        width: 100%;
        text-align: center;
        color: #082054;
        font-weight: bold;
        margin-top: 20px;
      }
      .fj-login-input {
        width: 100%;
        padding: 0 50px;
        margin-top: 30px;
        .fj-login-input-bd {
          .el-form-item {
            margin-bottom: 24px;
          }
          .el-input__inner {
            height: 46px;
            border-radius: 24px;
            text-indent: 35px;
          }
          .el-input {
            border: none;
          }
          .el-button--medium {
            font-size: 18px;
            height: 48px;
            border-radius: 24px;
            background: #3367D6;
            border: 1px solid #3367D6;
            margin-top: 24px;
          }
        }
      }
    }
  }
  .fj-icon {
    position: absolute;
    top:6px;
    left: 17px;
    z-index: 999;
    color: #7083ae;
    font-size: 20px;
  }
  .fj-login-bz {
    width: 100%;
    position: absolute;
    bottom: 10px;
    p {
      width: 100%;
      color: rgba(255,255,255,0.8);
      text-align: center;
      text-shadow: 2px 2px 2px #3367d6;
    }
  }
</style>

<style lang="scss" scoped>
	$bg: #0f488f;
	$dark_gray: #cfdbe9;
	$light_gray: #eee;

	.login-container {
		height: 100%;
		width: 100%;
		background-color: $bg;
		overflow: hidden;

		.login-form {
			position: relative;
			width: 75%;
			max-width: 440px;
			padding-top: 34%;
			margin: 0 auto;
			overflow: hidden;
		}

		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;

			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}

		.svg-container {
			padding: 4px 5px 4px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
			position: absolute;
			top: 0;
			left: 0;
		}

		.title-container {
			position: relative;
			text-align: center;
			margin-bottom: 48px;

			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}

			.set-language {
				color: #fff;
				position: absolute;
				top: 3px;
				font-size: 18px;
				right: 0px;
				cursor: pointer;
			}
		}

		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}
	}

	//self
	.el-row {
		position: relative;
		height: 100%;
		.el-col {
			height: 100%;
		}
	}

	.bg-content {
		position: relative;
		background-color: #2662c7;
		height: 100%;
	}

	.ucanLogo {
		position: absolute;
		top: 30px;
		left: 40px;
		z-index: 1;
	}

	.loginBgImg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 75%;
		max-height: 75%;
	}

	.el-row {
		.el-col.contentLeft {
			width: 76%;
		}
		.el-col.contentRight {
			width: 24%;
		}
	}

	.codeWrap {
		color: #454545;
		font-size: 18px;
		margin-bottom: 20px;
		border: none;

		.el-input {
			padding: 0;
			width: 60%;
			border: 1px solid #cfdbe9;
			border-radius: 25px;
		}

		.codeDiv {
			float: right;
			width: calc(40% - 20px);
			height: 44px;
			background-color: #fff;
		}
	}

	.copyright {
		position: absolute;
		bottom: 0;
		font-size: 16px;
		color: #ffffff;
		text-align: center;
		width: 76%;
		z-index: 1;
    img{
      position:relative;
      top:3px;
      margin-left: 20px;
    }
	}
	@media (max-width: 754px) {
		.el-row {
			.el-col.contentLeft {
				width: 0;
				display: none;
			}
			.el-col.contentRight {
				width: 100%;
			}
		}
		.copyright{
			width: 100%;
		}
	}
</style>
