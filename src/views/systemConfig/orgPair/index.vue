<template>
  <el-container class="orgPair">
    <!--入院评估 机构配对管理-->
    <el-header class="formDiv">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="所属区域：">
          <Address
            ref="address"
            :area-code="areaCode"
            :form-code="form.areaCode"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select v-model="form.orgType" placeholder="请选择机构类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in org_typeOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.orgName"
            clearable
            placeholder="请输入机构名称"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="center"
            border
            row-key="id"
          >
            <el-table-column label="序号" type="index" width="150" />
            <el-table-column label="机构名称" prop="org_name" />
            <el-table-column label="配对机构" prop="org_id_match_name" />
            <el-table-column label="操作">
              <template slot-scope="{row,$index}">
                <span class="table-btn" @click="handlePair($index, row)">配对</span>
                <span v-if="row.org_id_match" class="table-btn" @click="relievePair($index, row)">解除配对</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getData(form)"
          />
        </el-main>
      </el-container>
    </el-main>
    <el-dialog title="机构配对" :visible.sync="dialogVisible" :before-close="cancel">
      <el-form ref="dialogForm" :inline="true" :model="dialogForm" label-width="100px">
        <el-form-item label="所属区域：">
          <Address
            ref="dialogAddress"
            :area-code="areaCode"
            :form-code="dialogForm.areaCode"
            :width="'200px'"
            @getAreaCode="getDialogAreaCode"
            @keyup.enter.native="dialogOnSubmit"
          />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            v-model.trim="dialogForm.orgName"
            clearable
            placeholder="请输入机构名称"
            @keyup.enter.native="dialogOnSubmit"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="dialogOnSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="dialogOnReset">重置
          </el-button>
        </el-form-item>
      </el-form>
      <el-container>
        <el-main>
          <el-table
            ref="multipleTable"
            class="tb"
            :data="dialogTableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="center"
            border
            row-key="id"
            @select="select"
            @selection-change="handle_selectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column label="序号" type="index" width="150" />
            <el-table-column label="机构名称" prop="org_name" />
            <el-table-column label="地址" prop="addr" />
          </el-table>
          <pagination
            v-show="total>0"
            :total="dialogTotal"
            :page.sync="dialogForm.pageNum"
            :limit.sync="dialogForm.pageSize"
            @pagination="dialogOnSubmit(dialogForm)"
          />
        </el-main>
      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确认</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { getInstitutionalTypeData, getOrgPairData, getNotMatchOrgPairData, matchOrgPair, relieveOrgPair } from '@/api/systemConfig/orgPair'
export default {
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      areaCode: [],
      dialogAreaCode: [],
      org_typeOptions: [],
      form: {
        areaCode: '',
        orgType: '',
        orgName: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      },
      dialogForm: {
        areaCode: '',
        orgName: '',
        orgId: '', // 获取当前选中的orgId
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      },
      tableData: [],
      dialogTableData: [],
      selectedList: [], // 选中数据
      total: 0,
      dialogTotal: 0,
      dialogVisible: false,
      org_id: '' // 机构id
    }
  },
  created() {
    this.getOrgTypes()
    this.getData()
  },
  methods: {
    // 获取区域的值
    getAreaCode(val) {
      this.areaCode = val
      if (val.length === 0) {
        this.form.areaCode = ''
        this.$refs.address.resetCode() // 调用子组件方法重置code
      }
    },
    // 获取dialog区域的值
    getDialogAreaCode(val) {
      this.dialogAreaCode = val
      if (val.length === 0) {
        this.dialogForm.areaCode = ''
        this.$refs.dialogAddress.resetCode() // 调用子组件方法重置code
      }
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        areaCode: '',
        orgType: '',
        creditCardMonth: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      }
      this.areaCode = []
      this.$refs.address.resetCode() // 调用子组件方法重置code
      this.onSubmit()
    },
    // 取消
    cancel() {
      this.dialogVisible = false
      this.dialogOnReset()
    },
    // 提交表单
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.areaCode.length > 0) {
            this.form.areaCode = this.areaCode[this.areaCode.length - 1]
          }
          this.getData()
        }
      })
    },
    // dialog 查询
    dialogOnSubmit() {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          if (this.dialogAreaCode.length > 0) {
            this.dialogForm.areaCode = this.dialogAreaCode[this.dialogAreaCode.length - 1]
          }
          this.getNotMatchData()
        }
      })
    },
    // dialog 重置
    dialogOnReset() {
      this.dialogForm = {
        areaCode: '',
        orgName: '',
        orgId: '',
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页显示的数据数量
      }
      this.dialogAreaCode = []
      this.$refs.dialogAddress.resetCode() // 调用子组件方法重置code
      this.dialogOnSubmit()
    },
    // 获取数据
    getData() {
      const param = Object.assign(this.form, { menuId: this.$route.meta.id })
      getOrgPairData(param).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },

    // 获取没有配对的数据（弹窗中列表）
    getNotMatchData() {
      this.dialogForm.orgId = this.org_id
      getNotMatchOrgPairData(this.dialogForm).then(res => {
        if (res.code === 0) {
          this.dialogTableData = res.data.list
          this.dialogTotal = res.data.total
        }
      })
    },

    // 获取机构类别
    getOrgTypes() {
      // this.$route.meta.id
      const dicKey = { 'selectType': '10XX', 'menuId': this.$route.meta.id }
      getInstitutionalTypeData(dicKey).then(response => {
        this.org_typeOptions = response.data
      }).catch(() => {
        this.$message.error('获取机构类型失败！')
      })
    },

    // 打开配对弹窗
    handlePair(index, row) {
      this.org_id = row.org_id
      this.dialogVisible = true
      this.getNotMatchData()
    },
    // 解除配对
    relievePair(index, row) {
      this.$confirm(`确定解除与【${row.org_id_match_name}】的配对吗?`, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        relieveOrgPair(row.org_id).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '解除机构配对成功',
              type: 'success'
            })
            this.onSubmit()
          }
        })
      }).catch(() => {

      })
    },

    // 当用户手动勾选数据行的 Checkbox 时触发的事件,确保只能选中一项数据
    select(selection, row) {
      this.$refs.multipleTable.clearSelection()
      if (selection.length == 0) return
      this.$refs.multipleTable.toggleRowSelection(row, true)
    },
    // 当选择项发生变化时会触发该事件，进行赋值
    handle_selectionChange(row) {
      this.selectedList = row[row.length - 1]
    },

    // dialog中确认提交配对
    dialogSubmit() {
      if (this.selectedList.length === 0) {
        this.$message.error('未选择养老机构，请选择后重试!')
      } else {
        const paramsData = {
          org_id: this.org_id,
          org_id_match: this.selectedList.org_id
        }
        matchOrgPair(paramsData).then(res => {
          if (res.code == 0) {
            this.dialogVisible = false
            this.$message({
              message: '机构配对成功',
              type: 'success'
            })
            this.onSubmit()
          }
        })
      }
    }
  }
}
</script>
<style>
  @import "~@/styles/form.css";
  /*隐藏表头复选框*/
  .orgPair .tb .el-table__header .el-table-column--selection .cell .el-checkbox {
    display:none
  }
  .orgPair .el-dialog__body {
    padding: 45px 36px;
  }
</style>
