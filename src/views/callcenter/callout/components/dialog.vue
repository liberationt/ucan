<!-- 弹屏列表 -->
<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="dialogTableVisible"
    width="600px"
    :close-on-click-modal="false"
    @close="closeDialog"
    @opened="opened"
    @open="open"
  >
    <!--<h2 class="info" style="padding-top: 0;">用户基础信息</h2> -->

    <el-form ref="modelform" :model="ffffff" label-width="80px">
      <el-row :gutter="0">
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="姓名" prop="fullName">
            <el-input ref="fullName" v-model="ffffff.fullName" :disabled="disabled" clearable placeholder="请输入姓名" @keyup.enter.native="submitDialog" />
          </el-form-item>
        </el-col>
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="手机号" prop="mobile">
            <el-input ref="mobile" v-model="ffffff.mobile" :disabled="disabled" clearable placeholder="请输入手机号" @keyup.enter.native="submitDialog" />
          </el-form-item>
        </el-col>
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="性别" prop="sex">
            <el-input ref="sex" v-model="ffffff.sex" :disabled="disabled" clearable placeholder="请输入性别" @keyup.enter.native="submitDialog" />
          </el-form-item>
        </el-col>
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="身份证" prop="idCard">
            <el-input ref="idCard" v-model="ffffff.idCard" :disabled="disabled" clearable placeholder="请输入身份证" @keyup.enter.native="submitDialog" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="new-daillog-body">
      <el-form ref="form" :model="form" label-width="100px"> <!--
        <el-row :gutter="30">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="min-height: auto;">
            <el-form-item label="所属区域" style="margin-bottom: 10px;">
              <Address :area-code="areaCode_FWS" :form-code="form_areaCode_FWS"
                       @getAreaCode="getAreaCode_FWS"
                       :id-edit="idEdit_FWS"
                       :width="'100%'"></Address>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="min-height: auto;">
            <el-form-item label="关键词">
              <el-input v-model.trim="keyword_FWS" @blur="changeFWSleixing" @change="keyword_FWS_change" clearable placeholder="请输入姓名或身份证查询" style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->

        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          :data="tableDataFWS"
          style="width: 100%;height: 60%"
          header-align="left"
          border
          row-key="id"
        >

          <el-table-column label="序号" width="50" fixed="left">
            <template slot-scope="{row,$index}">
              <span>{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="客户电话" prop="customerNumber" min-width="100" />
          <el-table-column label="坐席工号" prop="cno" min-width="200" />
          <el-table-column label="客户号码类型" prop="customerNumberType" min-width="210" />
          <el-table-column label="客户号码区号" prop="customerAreaCode" min-width="130" />
          <el-table-column label="通话唯一标识" prop="uniqueId" min-width="130" />
          <el-table-column label="主通话唯一标识" prop="mainUniqueId" min-width="130" />

          <pagination
            v-show="formFWS.total>0"
            :total="formFWS.total"
            :page.sync="formFWS.pageNum"
            :limit.sync="formFWS.pageSize"
            @pagination="paginationGetTableData()"
          />
        </el-table>

      </el-form>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog()">取 消</el-button>
      <el-button
        type="primary"
        class="dailog-btn"
        @click="submitDialog()"
      >确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
// import _ from 'lodash';
// import BoundServiceObject from "./components/dialog";
import Pagination from '@/components/Pagination'
// import { addDialog, editDialog} from "@/api/systemConfig/message";
// import { allSelectdictionaryData } from "@/api/serviceActivityConfig/serviceProject";
import { editDialog, addDialog, findCallBombList, findBaseBomScreenList } from '@/api/callcenterConfig/callout'
import { adaptiveGrid_plus } from '@/common/index'
// import _ from "lodash"
// import {mapGetters} from 'vuex'

export default {
  name: 'MyDialog',
  components: { Pagination },
  props: ['dialogTableVisible', 'tableRowValue', 'modelType', 'ajaxData', 'realTimeUpdateMessageData', 'ffffff', 'tableDataFWS', 'formFWS'], // 接受父模板传递的自定义属性
  data() {
    return {
      form: {},
      title: '', // 弹框title
      disabled: '', // 表单是否可编辑
      // formx: {
      //   mobile:"",//
      // },
      // modelform: {
      //   fullName: "",
      //   sex:"",
      //   idCard:""
      // },
      tableData_FWS: [], // 表格数据
      form_FWS: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      autosize: {
        minRows: 4
      },
      configTypeData: [],
      // form 表单的验证规则
      // rulesForm: {
      // 	//手机号标题
      //   customerNumber:[
      // 		{required: true, message: '手机号不能为空，请输入！', trigger: 'blur'},
      // 		{trigger: 'blur', max: 100, message: '手机号长度不得超过100个字符，请重新输入！'}
      // 	]//,
      // 	//消息内容
      // 	// content:[
      // 	// 	{required: true, message: '消息内容不能为空，请输入！', trigger: 'blur'}
      // 	// ]
      // },
      // customerNumber:"",
      keyword_FWS: '', // 关键字
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      }
    }
  },
  mounted() {

  },
  methods: {
    // 编辑-提交数据
    editTableRowSubmit(params) {
      if (this.tableRowValue !== params) {
        editDialog(params).then(response => {
          if (response.code === 0) {
            // this.$message({
            // 	type: "success",
            // 	message: response.msg
            // })
            this.closeDialog()
            // this.ajaxData()
            // this.realTimeUpdateMessageData()
          } else {
            // this.$message.error(response.msg);
          }
        })
          .catch(error => {
            // reject(error);
            // this.$message.error("操作失败！");
          })
      } else {
        this.$message.error('操作失败！')
      }
    },
    // 添加行-提交数据
    addTableRowSubmit(params) {
      addDialog(params).then(response => {
        // this.submitDisabled = false
        if (response.code === 0) {
          // this.$message({
          // 	type: "success",
          // 	message: response.msg
          // });
          // this.ajaxData()
          this.closeDialog()
          // this.realTimeUpdateMessageData()
          return false
        } else {
          // this.$message.error(response.msg);
          return false
        }
      })
        .catch(error => {
          // reject(error);
          // this.$message.error("操作失败！");
          return false
        })
    },
    // 取消关闭弹框
    closeDialog() {
      this.form = {
        // title:'',
        // msgType:'',//消息类型
        // sendObjType:'',//消息对象
        // content: "",
        // id:""
      }
      this.$nextTick(() => {
        // this.$refs["form"].clearValidate();
      })
      this.$emit('dialogHide', 'false')
    },
    // 确认，提交表单
    submitDialog() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const params = {}
          Object.assign(params, this.form)
          if (this.modelType === 'edit') {
            this.editTableRowSubmit(params)
          } else {
            this.addTableRowSubmit(params)
          }
        } else {
          return false
        }
      })
    },
    // 加载服务商名称的表格数据-分页加载
    paginationGetTableData() {
      this.tableData_FWS = []
      // 服务商名称--数据字典接口
      const params = {
        // customerNumber: this.customerNumber,
        // pageNum: this.form_FWS.pageNum,
        // pageSize: this.form_FWS.pageSize,
      }
      this.asyncLoadTableData(params)
    },
    // 异步加载表格数据
    async asyncLoadTableData(params) {
      await findCallBombList(params).then(response => {
        if (response.rows) {
          response.rows.forEach(item => {
            this.tableData_FWS.push(item)
          })
        } else {
          this.tableData_FWS = []
        }
        this.form_FWS.total = response.total
      }).catch(() => {
        this.$message.error('‘志愿者对象’数据加载失败！')
      })
    },
    opened() {
    },
    // 打开的回调
    open() {
			  // alert("open");
      if (this.modelType === 'edit') {
        this.title = '编辑消息'
        this.modelform = {
          // fullName:this.ffffff.modelform.fullName,

          // msgType:this.tableRowValue.msgType,//消息类型
          // sendObjType:this.tableRowValue.sendObjType,//消息对象
          // content: this.tableRowValue.content,
          // id:this.tableRowValue.id
        }
        this.multipleTable = {
          // customerNumber:this.tableData_FWS.customerNumber,

        }
        this.disabled = false
      } else {
        this.title = '弹屏用户信息展示'
        this.disabled = false
      }
      // paginationGetTableData();
    }
  }
}
</script>

<style scoped>
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	.el-cascader {
		display: block;
	}

	.el-row {
		margin: 0 !important;
	}

	.el-select,
	.el-date-editor {
		width: 100% !important;
	}

	.info {
		color: #1890ff;
		border-bottom: 1px solid #aaa;
		padding: 20px;
		margin-bottom: 20px;
		box-sizing: border-box;
		font-size: 18px;
	}
</style>

<style>
	.msgTextarea > .el-input__count{
		bottom: 1px !important;
		height: 20px;
		line-height: 20px;
	}
</style>
