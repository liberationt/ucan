<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
    <div class="elDelogLogin">
      <el-dialog
        ref="dailog"
        width="30%"
        title="初始密码修改"
        :show-close="false"
        :visible="dialogTableVisible"
      >
        <div>
          <el-steps :active="active" align-center>
            <el-step title="初次登录" />
            <el-step title="修改初始密码" />
            <el-step title="完成" />
          </el-steps>
          <div v-if="active==1" class="topTip">您好，为了您的账号安全，请点击下一步修改初始密码</div>
          <div v-if="active!=3" style="width:50%;margin:0 auto;">
            <el-form ref="form" :model="form" status-icon :rules="rules" class="demo-ruleForm">
              <el-form-item v-show="active==1" label="登陆账号" :label-width="formLabelWidth">
                <el-input v-model="form.loginName" :disabled="true" size="medium" />
              </el-form-item>
              <el-form-item v-show="active==2" label="当前密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" :type="passwordType" placeholder="请输入当前密码" size="medium" @keyup.enter.native="submitForm('form')" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-form-item v-show="active==2" label="新密码" :label-width="formLabelWidth" prop="newPassword">
                <el-input v-model="form.newPassword" :type="passwordType1" placeholder="请输入新密码" size="medium" @keyup.enter.native="submitForm('form')" />
                <span class="show-pwd" @click="showPwd1">
                  <svg-icon :icon-class="passwordType1 === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
              <el-form-item v-show="active==2" label="确认密码" :label-width="formLabelWidth" prop="confirmPass">
                <el-input v-model="form.confirmPass" :type="passwordType2" placeholder="请再次输入新密码" size="medium" @keyup.enter.native="submitForm('form')" />
                <span class="show-pwd" @click="showPwd2">
                  <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-form>
            <div v-if="active!=1" slot="footer" class="dialog-footer">
              <el-button @click="resetForm('form')">上一步</el-button>
              <el-button type="primary" @click="submitForm('form')">下一步</el-button>
            </div>
            <div v-else slot="footer" class="dialog-footer">
              <el-button type="primary" style="width:75%" @click="nextTip">下一步</el-button>
            </div>
          </div>
          <div v-if="active===3" class="ImgTip">
            <div style="margin:20px 0">
              <img v-if="isSuccess===true" src="@/assets/images/chenggong.png" alt="">
              <img v-else src="@/assets/images/filer.png">
            </div>
            <p v-if="isSuccess===true">修改密码成功</p>
            <p v-else>网络开小差了，导致密码修改失败，请重新修改</p>
            <el-button v-if="isSuccess===true" type="primary" @click="returnDialogTableVisible">返回首页</el-button>
            <el-button v-else type="primary" @click="again">重新修改</el-button>
          </div>
          <div v-if="active==2" class="tip">
            <h4>温馨提示</h4>
            <p>1、密码长度不能低于8个字符</p>
            <p>2、密码必须由数字、英文字符和特殊字符组成</p>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import { updatePass, OneLoginChecked, getPassWord } from '@/api/user'
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    // 是否包含一位数字
    const regNumber = /(?=.*[\d])/
    // 是否包含一位字母
    const regLetter = /(?=.*[a-zA-Z])/
    // 是否包含一位特殊字符
    const regCharacter = /(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])/
    // 校验新密码
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空！请重新输入'))
      } else {
        if (value.length > 16) {
          callback(new Error('密码长度不超过16个字符。'))
        } else if (value.length < 8) {
          callback(new Error('密码长度不低于8个字符。'))
        } else {
          if (!/^[a-zA-Z\d]{1}/.test(value)) {
            callback(new Error('密码必须以英文字母或数字开头！'))
          } else {
            if (!regNumber.test(value)) {
              callback(new Error('密码必须由数字，英文字母和特殊字符组成!'))
            } else if (!regLetter.test(value)) {
              callback(new Error('密码必须由数字，英文字母和特殊字符组成!'))
            } else if (!regCharacter.test(value)) {
              callback(new Error('密码必须由数字，英文字母和特殊字符组成!'))
            } else {
              callback()
            }
          }
        }
      }
    }
    // 校验第二次输入新密码
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空！请重新输入'))
      } else {
        if (value.length > 16) {
          callback(new Error('密码长度不超过16个字符。'))
        } else if (value.length < 8) {
          callback(new Error('密码长度不低于8个字符。'))
        } else {
          if (!/^[a-zA-Z\d]{1}/.test(value)) {
            callback(new Error('密码必须以英文字母或数字开头！'))
          } else {
            if (!regNumber.test(value)) {
              callback(new Error('密码必须由数字，英文字母和特殊字符组成!'))
            } else if (!regLetter.test(value)) {
              callback(new Error('密码必须由数字，英文字母和特殊字符组成!'))
            } else if (!regCharacter.test(value)) {
              callback(new Error('密码必须由数字，英文字母和特殊字符组成!'))
            } else {
              if (value !== this.form.newPassword) {
                callback(new Error('两次输入密码不一致!请重新输入'))
              } else {
                callback()
              }
            }
          }
        }
      }
    }
    const passWordValidator = (rule, value, callback) => {
      const data = {
        password: value
      }
      getPassWord(data).then(res => {
        if (res.code == 0) {
          callback()
        } else {
          callback(new Error(res.msg))
        }
      })
    }
    return {
      currentRole: 'adminDashboard',
      dialogTableVisible: false,
      form: {
        loginName: '',
        password: '',
        newPassword: '',
        confirmPass: ''
      },
      isSuccess: false,
      active: 1,
      passwordType: 'password',
      passwordType1: 'password',
      passwordType2: 'password',
      formLabelWidth: '25%',
      rules: {
        password: [
          { required: true, message: '当前密码不能为空，请填写！', trigger: 'blur' },
          { required: true, validator: passWordValidator, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { required: true, validator: validatePass, trigger: 'change' }
        ],
        confirmPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { required: true, validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.form.password = ''
    OneLoginChecked().then(res => {
      if (res.msg == 0) {
        this.$store.dispatch('permission/isShowSider', false).then(() => {
          this.dialogTableVisible = true
        })
      } else {
        this.$store.dispatch('permission/isShowSider', true).then(() => {
          this.dialogTableVisible = false
        })
      }
    })
  },
  mounted() {
    if (localStorage.getItem('username')) {
      this.form.loginName = localStorage.getItem('username')
      // this.form.password=localStorage.getItem("password")
    }
  },
  methods: {
    returnDialogTableVisible() {
      this.$store.dispatch('permission/isShowSider', true).then(() => {
        this.dialogTableVisible = false
      })
    },
    nextTip() {
      this.active += 1
    },
    resetForm() {
      this.active -= 1
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    showPwd1() {
      if (this.passwordType1 === 'password') {
        this.passwordType1 = ''
      } else {
        this.passwordType1 = 'password'
      }
    },
    showPwd2() {
      if (this.passwordType2 === 'password') {
        this.passwordType2 = ''
      } else {
        this.passwordType2 = 'password'
      }
    },
    again() {
      this.active = 1
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = this.form
          updatePass(params).then(response => {
            if (response.code === 0) {
              this.isSuccess = true
            } else {
              this.$message.error(response.msg)
              this.isSuccess = false
            }
            this.active = 3
          })
            .catch(error => {
              reject(error)
              this.active = 3
              this.isSuccess = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container{
    background: #f6f9f7;
  }
  .topTip{
    text-align: center;
    line-height: 30px;
    color:red;
    font-weight: 700;
  }
  .tip{
    color:red;
  }
  .ImgTip{
    text-align: center;
    margin:0 auto;
    p{
      margin:20px 0;
    }
  }
</style>
