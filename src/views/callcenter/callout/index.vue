<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input
            v-model.trim="form.customerNumber"
            clearable
            placeholder="请输入手机号"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="座席工号">
          <el-input v-model.trim="form.cno" style="width: 240px;" clearable @keyup.enter.native="calloutphonesubmit()" />
        </el-form-item>
        <el-form-item label="外显号码">
          <el-input v-model.trim="form.clid" style="width: 240px;" clearable @keyup.enter.native="calloutphonesubmit()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="base-btn" @click="onSubmit">外呼查询 </el-button>
          <!-- <el-button type="warning" class="base-btn" @click="onReset">重置 </el-button>  -->
          <el-button type="primary" size="small" class="base-btn" @click="callOnline()">坐席上线(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callOffline()">坐席下线(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="calloutphonesubmit()">坐席呼叫(外呼)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="calloutCancel()">外呼取消(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callUnlink()">坐席挂机(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callRefuse()">坐席拒接(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callTransfer()">坐席呼叫转移(后端)</el-button>

          <el-button type="primary" size="small" class="base-btn" @click="callPause()">置忙(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callUnPause()">置闲(后端)</el-button>

          <el-button type="primary" size="small" class="base-btn" @click="callInteract()">坐席交互(后端)</el-button>

          <el-button type="primary" size="small" class="base-btn" @click="callHold()">保持(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callUnHold()">取消保持(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callMute()">静音(后端)</el-button>
          <el-button type="primary" size="small" class="base-btn" @click="callUnMute()">取消静音(后端)</el-button>

          <!--
                    <el-button type="primary" size="small" class="base-btn" @click="callinsubmit()">(软电话)登录(前端)(IP)</el-button>
                    <el-button type="primary" size="small" class="base-btn" @click="calllogOut()">(软电话)退出(前端)(IP)</el-button>
                    <el-button type="primary" size="small" class="base-btn" @click="sipLink()">软电话接听(IP)</el-button>
                    <el-button type="primary" size="small" class="base-btn" @click="sipunlink()">软电话挂断(IP)</el-button>
                    <el-button type="primary" size="small" class="base-btn" @click="siptransfer()">软电话转移(IP)</el-button>-->
          <!--  -->
          <el-button type="primary" size="small" class="base-btn" @click="getPersonData('18217127380')">测试呼入弹屏</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <!--<el-button type="primary" size="small" @click="calloutphonesubmit()" class="base-btn" v-has="{class: '呼叫'}">呼叫</el-button>-->
          <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
          <div v-else class="totalWrap">无法找到匹配信息</div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
          >
            <!-- <el-table-column type="selection" width="50" fixed="left"></el-table-column> -->
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号码"
              prop="customerNumber"
              min-width="90"
              header-align="left"
            />
            <el-table-column
              label="坐席"
              prop="cno"
              min-width="90"
              header-align="left"
            />
            <el-table-column
              label="呼叫时间"
              prop="createTime"
              min-width="90"
              header-align="left"
            />
            <!--fixed="right"-->
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData(form)"
          />

          <!--
          <myDialog
            @dialogHide="dialogHanderHide"
            @addTableRowSubmit="addTableRowSubmit"
            @editTableRowSubmit="editTableRowSubmit"
            :templateParameter="templateParameter"
          ></myDialog>  -->

          <myDialog
            :ajax-data="ajaxData"
            :ffffff="modelform"
            :real-time-update-message-data="realTimeUpdateMessageData"
            :dialog-table-visible="isShow"
            :table-row-value="tableRowValue"
            :model-type="modelType"
            :table-data-f-w-s="tableData_FWS"
            :form-f-w-s="form_FWS"
            @dialogHide="dialogHanderHide"
          />

        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination'
import myDialog from './components/dialog'
import { findList, calloutphone, callBombScreen, findPersonInfo, findCallBombList, callTransfer, addTableRowData, editTableRowData, getTableData, getMessageData, describeCdrInsert } from '@/api/callcenterConfig/callout'
import { callOnline, callOffline, callUnlink, callRefuse, callPause, callUnPause, calloutCancel, callInteract, callHold, callUnHold, callMute, callUnMute } from '@/api/callcenterConfig/callline'

// import {RESPONSE_TYPE,ClinkClient,RESPONSE} from "@/api/callcenterConfig/clink-client"

export default {
  components: { myDialog, Pagination },
  data() {
    return {
      form: {
        customerNumber: '18217127380',
        cno: '2000',
        clid: '075521245503', // 80012157000
        pageSize: 10,
        pageNum: 1
      },
      // formx: {
      //   mobile:"",//
      // },
      modelform: {
        fullName: '',
        mobile: '',
        sex: '',
        idCard: ''
      },
      total: 0,
      tableData: [],
      tableRowValue: '', // 表格当前行数据
      loading: false, // 弹框提交按钮加载动画
      loadingSubmit: false, // 查询按钮加载动画
      loadingReset: false, // 重置按钮加载动画
      isShow: false, // 弹框显示隐藏
      modelType: '', // 弹框的类型，可编辑或可新增
      // loading: false, //弹框提交按钮加载动画
      // 模板传参
      // templateParameter: {
      //   //isShow: false,//弹框显示隐藏
      //   tableRowValue: '',//表格当前行数据
      //   modelType: '',//弹框的类型，可编辑或可新增
      //   loading: false,//弹框提交按钮加载动画
      //   childRow: false,//是否是‘添加子行’打开弹框
      // }
      tableData_FWS: [], // 表格数据
      form_FWS: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
  // this.onSubmit
  },
  methods: {
    onSubmit() {
      this.loadingSubmit = true
      this.form.pageNum = 1
      // this.loadingSubmit = true;
      // let parmas = {
      //   status: this.form.phone,
      // };
      findList(this.form).then(res => {
        if (res.code === 0) {
          // alert('查询成功');
          this.total = res.data.total
          this.tableData = res.data.list
        }
      }).catch(error => {
        this.loadingSubmit = false
      })
    },
    getData(form) {
      // let params = this.form;
      findList(form).then(response => {
        if (response.code === 0) {
          // alert('result')
          // this.total = response.total
          // this.tableData = response.rows

          this.total = response.data.total
          this.tableData = response.data.list

          // this.loadingReset = false;
          // this.loadingSubmit = false;
          // this.exportData = JSON.parse(JSON.stringify(response.rows));
        }
      }).catch(error => {
        // this.loadingReset = false;
        // this.loadingSubmit = false;
        // his.$message.error("操作失败！");
        this.loadingSubmit = false
      })
    },

    ajaxData() {
      const params = this.form
      getTableData(params).then(response => {
        if (response.code === 0 && response.rows && response.rows !== 0) {
          this.form.count = response.total
          this.tableData = response.rows
          // this.loadingReset = false;
          // this.loadingSubmit = false;
        }
      }).catch(error => {
        // this.loadingReset = false;
        // this.loadingSubmit = false;
        this.loadingSubmit = false
      })
    },
    // 添加行-提交数据
    addTableRowSubmit(params) {
      this.templateParameter.loading = true
      addTableRowData(params).then(response => {
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: response.msg
          })
          this.ajaxData()
          this.templateParameter.loading = false
          return false
        } else {
          this.$message.error(response.msg)
          this.templateParameter.loading = false
          return false
        }
      }).catch(error => {
        reject(error)
        this.$message.error('操作失败！')
        this.templateParameter.loading = false
        return false
      })
    },
    // 编辑-提交数据
    editTableRowSubmit(params) {
      this.templateParameter.loading = true
      if (this.templateParameter.tableRowValue !== params) {
        editTableRowData(params).then(response => {
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.ajaxData()
            this.templateParameter.loading = false
          } else {
            this.$message.error(response.msg)
            this.templateParameter.loading = false
          }
        }).catch(error => {
          reject(error)
          this.$message.error('操作失败！')
          this.templateParameter.loading = false
        })
      } else {
        this.$message.error('操作失败！')
        this.templateParameter.loading = false
      }
    },
    dialogHanderHide() {
      this.isShow = false
    },
    // 实时更新消息面板的数据
    realTimeUpdateMessageData() {
      getMessageData().then(response => {
        if (response) {
          this.$store.commit('message/ADD_MESSAGE_LIST', response)
        } else {
          this.$message.error('消息接口请求失败！')
        }
      }).catch(() => {
        this.$message.error('消息同步接口请求失败！')
      })
    },

    // 呼叫
    calloutphonesubmit() {
      const paramsform = this.form
      // alert(paramsform);
      const customerNumber = paramsform.customerNumber
      alert(customerNumber)
      paramsform.cno = '2000'
      paramsform.clid = '075521245503' // 80012157000    固话带分机以 “-” 分隔
      paramsform.customerNumber = customerNumber
      // paramsform.customerNumber = "18217127380";
      // alert(paramsform.cno)
      calloutphone(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 上线
    callOnline() {
      const paramsform = this.form
      // alert(paramsform);
      const customerNumber = paramsform.customerNumber
      // alert(customerNumber)
      paramsform.cno = '2000' // 7000
      paramsform.bindTel = '0001' // 80012157000  paramsform.bindTel = '075521245503'
      paramsform.customerNumber = customerNumber
      // paramsform.loginStatus = 2  //默认登陆 置忙
      // paramsform.description = '忙碌'
      paramsform.loginStatus = 1 // 默认登陆 置忙
      // paramsform.customerNumber = "18217127380";
      // alert(paramsform.cno)
      callOnline(paramsform).then(response => { // api 坐席上线
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })

      const that = this
      // var params = {}
      // params.sipPhone = true // 是否使用软电话
      // params.debug = true // 是否开启控制台日志
      // ClinkAgent.setup(params, callback); //初始设置

      var loginparams = {}
      loginparams.identifier = 'youkang168' // 企业编号
      loginparams.cno = '2000' // 座席号
      // loginparams.loginStatus = 2 // 初始状态 initStatus    1空闲   2忙碌
      // loginparams.description = '忙碌'
      loginparams.loginStatus = 1
      loginparams.password = '123456' // 座席密码

      // 1.绑定软电话
      // loginparams.bindTel = '2007' // 绑定电话  80012157000  02759566355  18217127380   7000  2007    file:///E:/callcentersource/ws-bj.clink.cn/index.html#  工具条
      // loginparams.bindType = 3 // 电话类型   1电话号码  2分机号码  3软电话

      // 2.绑定话机
      loginparams.bindTel = '0001' // 绑定电话  80012157000  02759566355  18217127380   7000  2007    file:///E:/callcentersource/ws-bj.clink.cn/index.html#  工具条
      loginparams.bindType = 2

      // alert("callinsubmit2")
      ClinkAgent.login(loginparams) // 工具条登录   需要工具条上线才会触发工具条的事件

      // alert("callinsubmit1")
      ClinkAgent.setup({ sipPhone: false, debug: true }, function() {
        //  以登录为例，注册回调方法
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGIN, function(result) {
          if (result.code === 0) {
            alert('登录成功x')
          } else {
            alert('登录失败')
          }
        })

        ClinkAgent.registerCallback(ClinkAgent.ResponseType.UNLINK, function(result) { // 挂断
          if (result.code === 0) {
            alert('电话挂断成功xx')
          } else {
            alert('电话挂断失败x')
          }
        })

        // 注册退出响应回调方法
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGOUT, function(result) {
          if (result.code === 0) {
            // 退出成功
            alert('退出成功x')
          } else {
            // 退出失败
            alert('退出失败')
          }
        })
        // 置忙
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.PAUSE, function(result) {
          if (result.code === 0) {
            alert('置忙成功xx')
          } else {
            alert('置忙失败')
          }
        })
        // 置闲
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.UNPAUSE, function(result) {
          if (result.code === 0) {
            alert('置闲成功xxx')
          } else {
            alert('置闲失败')
          }
        })
        // 交互
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.INTERACT, function(result) {
          if (result.code === 0) {
            alert('交互成功x')
          } else {
            alert('交互失败')
          }
        })

        // 保持
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.HOLD, function(result) {
          if (result.code === 0) {
            alert('保持成功')
          } else {
            alert('保持失败')
          }
        })
        // 保持接回
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.UNHOLD, function(result) {
          if (result.code === 0) {
            alert('保持接回成功')
          } else {
            alert('保持接回失败')
          }
        })
        // 静音
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.MUTE, function(result) {
          if (result.code === 0) {
            alert('静音成功')
          } else {
            alert('静音失败')
          }
        })
        // 取消静音
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.UNMUTE, function(result) {
          if (result.code === 0) {
            alert('取消静音成功')
          } else {
            alert('取消静音失败')
          }
        })

        // 软电话 转移回调 注册
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.TRANSFER, function(event) {
          alert('event' + event)
        }) // 转移

        ClinkAgent.registerListener(ClinkAgent.EventType.KICKOUT, function(token) {
          // unlogin();
          alert('被踢下线：' + JSON.stringify(token))
        })

        // ClinkAgent.registerListener(ClinkAgent.ResponseType.UNLINK, function(event) { // 挂断
        //   alert("电话挂断成功xx!")
        // });

        // 弹屏、响铃   可从弹屏事件中获取customerNumberKey的值，进行外呼
        ClinkAgent.registerListener(ClinkAgent.EventType.RINGING, function(token) {
          alert('EventType.RINGING: ' + token)
          var resultRinging = {}
          resultRinging.customerNumber = token.customerNumber
          resultRinging.customerNumberType = token.customerNumberType
          resultRinging.customerAreaCode = token.customerAreaCode
          resultRinging.callType = token.callType
          resultRinging.uniqueId = token.uniqueId
          resultRinging.mainUniqueId = token.mainUniqueId
          resultRinging.type = token.type
          resultRinging.event = token.event
          resultRinging.enterpriseId = token.enterpriseId
          resultRinging.cno = token.cno
          resultRinging.code = token.code
          resultRinging.action = token.action
          resultRinging.calleeNumber = token.calleeNumber

          // 获取方法  获取用户信息
          // that.getPersonDataList(resultRinging.customerNumber)
          // 保存 呼入弹屏信息
          // that.saveCallBombScreen(resultRinging)

          that.describeCdrInsert(resultRinging) // 呼入/呼出 通话记录保存

          // 打开弹窗   赋值给弹屏
          that.isShow = true // 打开弹框
          that.tableRowValue = {}// 行数据格式
          that.modelType = 'add'// 将弹框设为新增状态
        })

        // 座席状态
        ClinkAgent.registerListener(ClinkAgent.EventType.STATUS, function(token) {
          alert('EventType.cno: ' + token.cno + ' code: ' + token.code + ' action: ' + token.action + ' loginStatus: ' + token.loginStatus + ' deviceStatus: ' + token.deviceStatus + ' pauseDescription: ' + token.pauseDescription + ' callType: ' + token.callType)
        })
      })
    },

    // 下线
    callOffline() {
      const paramsform = this.form
      // alert(paramsform);
      const customerNumber = paramsform.customerNumber
      // alert(customerNumber)
      paramsform.cno = '2000'
      paramsform.clid = '0001' // 80012157000
      paramsform.customerNumber = customerNumber
      // paramsform.customerNumber = "18217127380";
      // alert(paramsform.cno)
      callOffline(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })

      // var params = {}
      // params.sipPhone = true // 是否使用软电话
      // params.debug = true // 是否开启控制台日志

      // alert("callsubmit1")
      // 初始设置
      // ClinkAgent.setup({ sipPhone: false, debug: true }, function() {
      //   // 注册退出响应回调方法
      //   ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGOUT, function(result) {
      //     if (result.code === 0) {
      //       // 退出成功
      //       alert('退出成功')
      //     } else {
      //       // 退出失败
      //       alert('退出失败')
      //     }
      //   })
      // });

      // alert("callsubmit2")
      var params = {}
      params.logoutModel = 1 // 退出方式，0：退出后台在线、1：完全退出
      params.removeBinding = 0// 解绑电话，0：不解绑、1：解绑
      ClinkAgent.logout(params) // 退出   工具条和API的退出，只针对某个座席
    },

    // 挂机
    callUnlink() {
      const paramsform = this.form
      // alert(paramsform);
      const customerNumber = paramsform.customerNumber
      alert('挂机: ' + customerNumber)
      paramsform.cno = '2000'
      paramsform.clid = '075521245503' // 80012157000
      paramsform.customerNumber = customerNumber
      // paramsform.customerNumber = "18217127380";
      // alert(paramsform.cno)
      callUnlink(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 拒接
    callRefuse() {
      const paramsform = this.form
      // alert(paramsform);
      const customerNumber = paramsform.customerNumber
      alert(customerNumber)
      paramsform.cno = '2000'
      paramsform.clid = '075521245503' // 80012157000
      paramsform.customerNumber = customerNumber
      // paramsform.customerNumber = "18217127380";
      // alert(paramsform.cno)
      callRefuse(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 1. 坐席上线 外呼  话机接听  接通  坐席呼叫转移  (如果软电话登录则转到软电话)  设置的固话登录则转到固话
    // 座席通道不存在  转移座席忙  座席状态错误  座席不在线  转移座席不在线
    // 呼叫转移      2007坐席接入后，转接到2006坐席     (如果转移座席不在线   软电话/固话坐席 登录在线  如果软电话在线，则固话转移失败<登录初始化为固话才能转接> 或者相反)
    callTransfer() {
      const paramsform = this.form
      const customerNumber = paramsform.customerNumber
      paramsform.cno = '2000' // 当前通话的座席 2007 要往外转的坐席
      paramsform.clid = '075521245503' // 80012157000
      paramsform.customerNumber = '2001' // 转移到指定坐席 2006
      // alert(paramsform.cno)
      callTransfer(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 坐席置忙
    callPause() {
      // const paramsform = this.form
      // paramsform.cno = '2007' // 当前通话的座席 2007 要往外转的坐席
      // paramsform.decription = '忙碌' //
      // callPause(paramsform).then(response => {
      //   if (response.code === 0) {
      //     // this.$message({
      //     //   type: "success",
      //     //   message: response.msg
      //     // });
      //     // this.ajaxData();
      //     // this.loading = false;
      //     alert('responsesuccess')
      //   } else {
      //     // this.$message.error(response.msg);
      //     // this.loading = false;
      //     alert('responsefail')
      //   }
      // }).catch(error => {
      //   alert('responseerror')
      //   // reject(error);
      //   // this.$message.error("操作失败！");
      //   // this.loading = false;
      // })

      var params = {}
      params.pauseType = 1 // 类型，1：置忙、2：休息
      params.pauseDescription = '忙碌'// 置忙描述:  小休 午饭 WC 勿打扰 忙碌
      ClinkAgent.pause(params) //  置忙   工具条和API的 置忙，只针对某个座席
    },

    // 坐席置闲
    callUnPause() {
      // const paramsform = this.form
      // paramsform.cno = '2007' // 当前通话的座席 2007 要往外转的坐席
      // callUnPause(paramsform).then(response => {
      //   if (response.code === 0) {
      //     // this.$message({
      //     //   type: "success",
      //     //   message: response.msg
      //     // });
      //     // this.ajaxData();
      //     // this.loading = false;
      //     alert('responsesuccess')
      //   } else {
      //     // this.$message.error(response.msg);
      //     // this.loading = false;
      //     alert('responsefail')
      //   }
      // }).catch(error => {
      //   alert('responseerror')
      //   // reject(error);
      //   // this.$message.error("操作失败！");
      //   // this.loading = false;
      // })

      var params = {}
      // params.cno = '2007' //
      ClinkAgent.unpause(params) // 置闲
    },

    // 坐席交互  只能转到ivr上
    callInteract() {
      const paramsform = this.form
      paramsform.cno = '2000' // 座席工号，4-6 位数字
      paramsform.ivrId = 6909 // 语音导航id
      paramsform.ivrNode = '2001' // 语音导航节点，如果不传此值则从语音导航的根节点开始
      callInteract(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })

      var params = {}
      params.ivrId = 6909 // 语音导航id
      params.ivrNode = '2001' // 语音导航节点
      ClinkAgent.interact(params)
    },

    // 外呼取消
    calloutCancel() {
      const paramsform = this.form
      paramsform.cno = '2000' // 当前通话的座席 2007 要往外转的坐席
      // eslint-disable-next-line no-undef
      calloutCancel(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 保持
    callHold() {
      const paramsform = this.form
      paramsform.cno = '2000' // 当前通话的座席 2007 要往外转的坐席
      callHold(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },
    // 取消保持
    callUnHold() {
      const paramsform = this.form
      paramsform.cno = '2000' // 当前通话的座席 2007 要往外转的坐席
      callUnHold(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 静音
    callMute() {
      const paramsform = this.form
      paramsform.cno = '2000' // 当前通话的座席 2007 要往外转的坐席
      paramsform.direction = 'in' // 静音类型，in：座席侧静音，out：客户侧静音，all：双方全静音
      callMute(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },
    // 取消静音
    callUnMute() {
      const paramsform = this.form
      paramsform.cno = '2000' // 当前通话的座席 2007 要往外转的坐席
      paramsform.direction = 'in' // 静音类型，in：座席侧静音，out：客户侧静音，all：双方全静音
      callUnMute(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          // this.ajaxData();
          // this.loading = false;
          alert('responsesuccess')
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 软电话 登录  登录、登出是针对座席的    //呼入会进入ivr，呼入的具体流程在语音导航里设置
    callinsubmit() {
      const that = this
      var params = {}
      params.sipPhone = true // 是否使用软电话
      params.debug = true // 是否开启控制台日志
      // ClinkAgent.setup(params, callback); //初始设置

      var loginparams = {}
      loginparams.identifier = 'youkang168' // 企业编号
      loginparams.cno = '2000' // 座席号
      loginparams.loginStatus = 1 // 初始状态 initStatus    1空闲   2忙碌
      loginparams.password = '123456' // 座席密码

      // 1.绑定软电话
      loginparams.bindTel = '2000' // 绑定电话  80012157000  02759566355  18217127380   7000  2007    file:///E:/callcentersource/ws-bj.clink.cn/index.html#  工具条
      loginparams.bindType = 3 // 电话类型   1电话号码  2分机号码  3软电话

      // 2.绑定话机
      // loginparams.bindTel = "7000"; //绑定电话  80012157000  02759566355  18217127380   7000  2007    file:///E:/callcentersource/ws-bj.clink.cn/index.html#  工具条
      // loginparams.bindType = 2;

      // alert("callinsubmit1")

      ClinkAgent.setup({ sipPhone: true, debug: true }, function() {
        // ClinkAgent.registerListener(ClinkAgent.EventType.STATUS, handleState); // 座席状态
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_START, handleState); // 预览外呼呼叫客户
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_RINGING, handleState); // 预览外呼客户响铃
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_BRIDGE, handleState);  // 预览外呼客户接听
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_START, handleState); // 咨询开始
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_LINK, handleState); // 咨询接听
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_ERROR, handleState); // 咨询失败
        // ClinkAgent.registerListener(ClinkAgent.EventType.UNCONSULT, handleState); // 咨询接回/挂断/取消
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_THREEWAY, handleState); // 咨询三方
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_THREEWAY_UNLINK, handleState);  // 咨询三方挂断
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_TRANSFER, handleState);  // 咨询转移
        // ClinkAgent.registerListener(ClinkAgent.EventType.RINGING, handleRinging);  // 弹屏、响铃   可从弹屏事件中获取customerNumberKey的值，进行外呼
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL, function (token) { });     // 预览外呼
        // ClinkAgent.registerListener(ClinkAgent.EventType.KICKOUT, function (token) { });     // 被踢下线
        // ClinkAgent.registerListener(ClinkAgent.EventType.BREAK_LINE, breakLineInfo); // 断线

        //  以登录为例，注册回调方法
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGIN, function(result) {
          if (result.code === 0) {
            // 登录成功
            alert('登录成功')
          } else {
            // 登录失败
            alert('登录失败')
          }
          // ClinkAgent.sipLink();
          // alert("接听开始")
        })
        // ClinkAgent.EventType.sipLink()

        // 软电话 转移回调 注册
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.TRANSFER, function(event) {
          alert('event' + event)
        }) // 转移

        ClinkAgent.registerCallback(ClinkAgent.ResponseType.UNLINK, function(event) {
          alert('电话挂断成功!')
        }) // 挂断

        ClinkAgent.registerListener(ClinkAgent.EventType.KICKOUT, function(token) {
          // unlogin();
          alert('被踢下线：' + JSON.stringify(token))
        })

        // ClinkAgent.registerListener(ClinkAgent.ResponseType.SIP_UNLINK, function (token) {
        //   Response.registerCallback(ClinkAgent.ResponseType.SIP_UNLINK, function(event) {
        //     alert("软电话挂断注册成功!")
        //   }); // 软电话挂断
        // });
        //
        //   ClinkAgent.registerListener("sipLink", function (token) {
        //     Response.registerCallback("sipLink", function(event) {
        //       alert("软电话接听注册成功!")
        //     }); // 软电话接听
        //   });

        // 座席操作相关回调方法注册  //软电话 接听 注册
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.SIP_LINK, function(result) {
          alert('SIP_LINK')
          if (result.code === 0) {
            alert('软电话sip接听注册成功!')
          } else {
            alert('软电话sip接听注册失败!')
          }
        })

        // 软电话 挂断 注册
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.SIP_UNLINK, function(result) {
          alert('SIP_UNLINK')
          if (result.code === 0) {
            alert('软电话sip挂断注册成功!')
          } else {
            alert('软电话sip挂断注册失败!')
          }
        })

        // Response.registerCallback(RESPONSE_TYPE.SIP_UNLINK, function(event) {
        //     alert("软电话挂断注册成功!")
        // }); // 软电话挂断
        //
        // Response.registerCallback(RESPONSE_TYPE.SIP_LINK, function(event) {
        //   alert("软电话接听册成功!")
        // }); // 软电话接听
        //
        // Response.registerCallback(RESPONSE_TYPE.SIP_CALL, function(event) {
        //   alert("软电话外呼!")
        // });

        // linkAgent.registerListener(ClinkAgent.EventType.sipLink, function (token) {
        //   alert("EventType.sipLink: "+token)
        // });

        // ClinkAgent.registerListener(ClinkAgent.EventType.STATUS, function (token) {
        //     alert("EventType.STATUS: "+token)
        // });
        // 弹屏、响铃   可从弹屏事件中获取customerNumberKey的值，进行外呼
        ClinkAgent.registerListener(ClinkAgent.EventType.RINGING, function(token) {
          // alert("EventType.RINGING: "+token);
          var resultRinging = {}
          resultRinging.customerNumber = token.customerNumber
          resultRinging.customerNumberType = token.customerNumberType
          resultRinging.customerAreaCode = token.customerAreaCode
          resultRinging.callType = token.callType
          resultRinging.uniqueId = token.uniqueId
          resultRinging.mainUniqueId = token.mainUniqueId
          resultRinging.type = token.type
          resultRinging.event = token.event
          resultRinging.enterpriseId = token.enterpriseId
          resultRinging.cno = token.cno
          resultRinging.code = token.code
          resultRinging.action = token.action
          resultRinging.calleeNumber = token.calleeNumber

          // console.log(token.customerNumber,token.customerNumberType,token.customerAreaCode)
          // alert("customerNumber: "+resultRinging.customerNumber);

          // 获取方法  获取用户信息
          // that.getPersonDataList(resultRinging.customerNumber)
          // 保存 呼入弹屏信息
          that.saveCallBombScreen(resultRinging)

          // 打开弹窗   赋值给弹屏
          that.isShow = true // 打开弹框
          that.tableRowValue = {}// 行数据格式
          that.modelType = 'add'// 将弹框设为新增状态
          // this.templateParameter.childRow = false;//是否是‘添加子行’打开弹框
        })
      })

      // alert("callinsubmit2")
      ClinkAgent.login(loginparams) // 登录

      // Response.registerCallback(ClinkClient.ResponseType.SIP_UNLINK, function(event) {
      //   alert("软电话挂断注册成功!")
      // }); // 软电话挂断
      //
      // Response.registerCallback(RESPONSE_TYPE.SIP_LINK, function(event) {
      //   alert("软电话接听注册成功!")
      // }); // 软电话接听
      //
      // Response.registerCallback(RESPONSE_TYPE.SIP_CALL, function(event) {
      //   alert("软电话外呼!")
      // });

      // 软电话接听
      // ClinkClient.sipLink = function () {
      //   logger.debug("ClinkAgent.sipLink: sip接听");
      //   if (!CallSession.isSessionAlive()) {
      //     logger.debug("ClinkAgent.sipLink: sip接听失败, session已经销毁");
      //     return;
      //   }
      //   SipPhone.sipAnswer();
      // };

      // alert("callinsubmit3")
    },

    // //保存 监听呼入弹屏信息
    saveCallBombScreen(paramsform) {
      callBombScreen(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          const parmas = {
            customerNumber: paramsform.customerNumber
          }
          this.handleEdit(parmas) // 跳转到新的Tab页

          // // 查询用户基本信息 base
          // this.getPersonData(paramsform.customerNumber) // 弹出框展示
          // // 查询记录列表 List
          // this.getCallBombList(paramsform.customerNumber); //弹出框展示
          // this.isShow = true;

          // this.loading = false;
          // alert("responsesuccess")
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    describeCdrInsert(paramsform) {
      describeCdrInsert(paramsform).then(response => {
        if (response.code === 0) {
          // this.$message({
          //   type: "success",
          //   message: response.msg
          // });
          const parmas = {
            customerNumber: paramsform.customerNumber
          }
          this.handleEdit(parmas) // 跳转到新的Tab页

          // // 查询用户基本信息 base
          // this.getPersonData(paramsform.customerNumber) // 弹出框展示
          // // 查询记录列表 List
          // this.getCallBombList(paramsform.customerNumber); //弹出框展示
          // this.isShow = true;

          // this.loading = false;
          // alert("responsesuccess")
        } else {
          // this.$message.error(response.msg);
          // this.loading = false;
          alert('responsefail')
        }
      }).catch(error => {
        alert('responseerror')
        // reject(error);
        // this.$message.error("操作失败！");
        // this.loading = false;
      })
    },

    // 打开新的tab 页面 展示信息  (path 必须带参数才会路由到新的页面)
    handleEdit(parmas) {
      // alert('xs：'+parmas.customerNumber);
      var customerNumber = parmas.customerNumber
      // var customerNumber=Math.random(); //不同的值开新的页面，同样的值不会重复开页面
      this.$router.push({
        path: `/callinInfo/details/customerNumber=` + customerNumber,
        query: { 'modelType': 'edit', '_title': `处理${customerNumber}`, 'customerNumber': customerNumber }
      })
      // this.seeSharex(parmas);  //浏览器上开新窗口
    },

    // router-link <router-link :to='url' target='_blank></router-link>
    // 在浏览器上开新窗口   Vue 路由跳转 新窗口打开页面
    seeSharex(parmas) {
      var customerNumber = parmas.customerNumber
      const routeUrl = this.$router.resolve({
        path: '/callinInfo/details/customerNumber=' + customerNumber,
        query: { 'modelType': 'edit', '_title': `编辑${customerNumber}`, 'customerNumber': customerNumber }
      })
      window.open(routeUrl.href, '_blank')
    },

    // 弹出toolbar  新浏览器窗口
    // 1.如果一个前端子系统包括后台和toolbar，则弹出的toolbar 可能附带外层框架信息(被包裹),这个怎么解决 。 共享token。
    // 2.如果两个前端子系统，一个后台，一个toolbar  则两个怎么绑定唯一。 之间的登录退出，弹屏怎么触发。 (两个token还是 共享token)
    seeShareToolbar(parmas) {
      var customerNumber = parmas.customerNumber
      const routeUrl = this.$router.resolve({
        path: '/callinInfo/teltoolbar/customerNumber=' + customerNumber,
        query: { 'modelType': 'edit', '_title': `编辑${customerNumber}`, 'customerNumber': customerNumber }
      })
      // window.open(routeUrl.href, '_blank')
      window.open(routeUrl.href, '_blank', 'toolbar=yes, width=700, height=300') // 要控制只能弹出一个toolbar窗口
    },

    // 根据监听弹屏 获取通话用户信息 dialog 展示
    getPersonData(customerNumber) {
      const that = this
      this.loadingSubmit = true
      // this.loadingSubmit = true;
      const parmas = {
        customerNumber: customerNumber
      }
      // alert('parmas：'+parmas.customerNumber)
      findPersonInfo(parmas).then(res => {
        if (res.code === 0) {
          // console.log(res.data.mobile+","+res.data.fullName+","+res.data.sex+","+res.data.idCard);
          // alert(res.data.mobile+","+res.data.fullName+","+res.data.sex+","+res.data.idCard);
          that.modelform = res.data
          // that.getCallBombList(parmas) // test
          // that.isShow = true

          // var tims;
          // clearTimeout(tims);  //清除延迟执行
          // tims = setTimeout(function(){   //设置延迟执行
          //   console.log('ok');
          // },5000);
          // alert('testxx');

          // that.handleEdit(parmas) // 跳转到新的Tab页 ,在当前窗口内  //test
          // that.seeSharex(parmas); //在当前浏览器上面开新的窗口
          that.seeShareToolbar(parmas)
        }
      }).catch(err => {

      })
    },

    // 根据监听弹屏 获取通话用户通话记录信息列表 dialog 展示
    getCallBombList(customerNumber) {
      // alert('getCallBombList：'+customerNumber)
      // this.form.pageNum = 1;
      this.loadingSubmit = true
      // let parmas = {
      //   customerNumber: customerNumber
      // };
      findCallBombList(customerNumber).then(res => {
        if (res.code === 0) {
          // alert('查询成功');
          // this.total = res.data.total;
          // this.tableData=res.data.list;
          // console.log(res.data.list.customerNumber+","+res.data.list.cno)
          // alert('getCallBombList res');

          this.tableData_FWS = res.data.list

          this.form_FWS.total = res.data.total
          this.form_FWS.pageNum = res.data.pageNum
          this.form_FWS.pageSize = res.data.pageSize

          // that.tableRowValue = res.rows;
        }
      }).catch(err => {

      })
    },

    // 软电话 退出  登录、登出是针对座席的
    calllogOut() {
      var params = {}
      params.sipPhone = true // 是否使用软电话
      params.debug = true // 是否开启控制台日志

      // alert("callsubmit1")
      // 初始设置
      ClinkAgent.setup({ sipPhone: true, debug: true }, function() {
        // ClinkAgent.registerListener(ClinkAgent.EventType.STATUS, handleState); // 座席状态
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_START, handleState); // 预览外呼呼叫客户
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_RINGING, handleState); // 预览外呼客户响铃
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL_BRIDGE, handleState);  // 预览外呼客户接听
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_START, handleState); // 咨询开始
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_LINK, handleState); // 咨询接听
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_ERROR, handleState); // 咨询失败
        // ClinkAgent.registerListener(ClinkAgent.EventType.UNCONSULT, handleState); // 咨询接回/挂断/取消
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_THREEWAY, handleState); // 咨询三方
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_THREEWAY_UNLINK, handleState);  // 咨询三方挂断
        // ClinkAgent.registerListener(ClinkAgent.EventType.CONSULT_TRANSFER, handleState);  // 咨询转移
        // ClinkAgent.registerListener(ClinkAgent.EventType.RINGING, handleRinging);  // 弹屏、响铃
        // ClinkAgent.registerListener(ClinkAgent.EventType.PREVIEW_OUTCALL, function (token) { });     // 预览外呼
        // ClinkAgent.registerListener(ClinkAgent.EventType.KICKOUT, function (token) { });     // 被踢下线
        // ClinkAgent.registerListener(ClinkAgent.EventType.BREAK_LINE, breakLineInfo); // 断线

        // 注册退出响应回调方法
        ClinkAgent.registerCallback(ClinkAgent.ResponseType.LOGOUT, function(result) {
          if (result.code === 0) {
            // 退出成功
            alert('退出成功')
          } else {
            // 退出失败
            alert('退出失败')
          }
        })
      })
      // alert("callsubmit2")
      var params = {}
      params.logoutModel = 1 // 退出方式，0：退出后台在线、1：完全退出
      params.removeBinding = 0 // 解绑电话，0：不解绑、1：解绑
      ClinkAgent.logout(params) // 退出

      // alert("callsubmit3")
    },

    // 软电话接听
    sipLink() {
      ClinkAgent.sipLink()
      // // 软电话接听
      // ClinkClient.sipLink = function () {
      //   logger.debug("ClinkAgent.sipLink: sip接听x");
      //   if (!CallSession.isSessionAlive()) {
      //     logger.debug("ClinkAgent.sipLink: sip接听失败, session已经销毁");
      //     return;
      //   }
      //   SipPhone.sipAnswer();
      // };
    },

    // 软电话挂断
    sipunlink() {
      ClinkAgent.sipUnlink()
    },

    // 软电话转移
    siptransfer() {
      var transferparmas = {}
      transferparmas.objectType = 1 // 转移类型，0：电话号码、1：座席号、2：分机号、3：语音导航节点、4：语音导航id
      // parmas.transferObject = "{\"ivrId\":1,\"ivrNode\":\"2006\"}"; //转移对象，语音导航节点传递json格式字符串： {"ivrId":1,"ivrNode":"XXXXXXXXX"}
      // parmas.transferObject = JSON.parse("{\"ivrId\":1,\"ivrNode\":\"2006\"}");//将字符串转换成json对象  将JSON字符串转换为json对象
      // parmas.transferObject = JSON.stringify('{"ivrId":6909,"ivrNode":"2006"}') // 将对象转换为JSON格式字符串  将json对象转换成json字符串
      // var pars="{\"ivrId\":1,\"ivrNode\":\"2006\"}";
      // parmas.transferObject = JSON.stringify(pars); //将对象转换为JSON格式字符串  将json对象转换成json字符串

      // parmas.transferObject = JSON.parse(JSON.stringify("{\"ivrId\":1,\"ivrNode\":\"2006\"}"));
      transferparmas.transferObject = JSON.parse(JSON.stringify('{"ivrId":6909,"ivrNode":"84451"}'))
      console.log(transferparmas)
      // alert(parmas.transferObject);
      ClinkAgent.transfer(transferparmas)
    },

    // ajaxData() {
    //   let params = this.form;
    //   calloutphone(params).then(response => {
    //     if (response.code === 0) {
    //       alert("responsesuccess")
    //       //this.loadingReset = false;
    //       //this.loadingSubmit = false;
    //       //this.exportData = JSON.parse(JSON.stringify(response.rows));
    //     }
    //   }).catch(error => {
    //       reject(error);
    //       //this.loadingReset = false;
    //       //this.loadingSubmit = false;
    //     });
    // },
    onReset() {

    }

  }
}
</script>

<style scoped>
</style>
