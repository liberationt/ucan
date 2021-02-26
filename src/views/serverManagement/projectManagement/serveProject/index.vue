<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商">
          <el-select v-model="form.ospId" filterable placeholder="请选择服务商" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in orderOptions"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="form.serviceType" filterable placeholder="请选择服务类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in serveOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务项目">
          <el-input
            v-model.trim="form.spName"
            clearable
            placeholder="请输入服务项目"
            style="width: 260px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="服务状态">
          <el-select v-model="form.serviceStatus" filterable placeholder="请选择服务状态" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in statusOptions"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-if="data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{ this.total }}条匹配信息</div>
            <div v-else class="totalWrap">无法找到匹配信息</div>
          </div>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
            @selection-change="handleSelectionChange"
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商名称" prop="ospName" min-width="120" />
            <el-table-column label="服务类型" prop="serviceTypeName" min-width="100" />
            <el-table-column label="服务项目" prop="spName" min-width="90" />
            <el-table-column label="服务内容" prop="spContent" min-width="90" show-overflow-tooltip />
            <el-table-column label="服务单价(元)" prop="spPrice" min-width="100" />
            <el-table-column label="服务时长(分钟)" prop="timeLen" min-width="100" />
            <el-table-column label="每天次数(次)" prop="dayCount" min-width="90" />
            <el-table-column label="服务状态" prop="serviceStatus" min-width="90">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.serviceStatus"
                  class="switchStyle"
                  active-text="启用"
                  inactive-text="禁用"
                  active-value="1"
                  inactive-value="0"
                  disabled
                  @click.native="changeSwitch(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" min-width="100" />
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType!=null" fixed="right" label="操作" width="100" header-align="center">
              <template slot-scope="{row,$index}">
                <!-- <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span> -->
                <span v-if="row.deleteButton==='0'" v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
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
  </el-container>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
import { allSelectdictionaryData } from '@/api/common'
import { getProjectList, removeProject, changeStatus, getServiceProvider } from '@/api/serverManagement/projectManagement'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { mapGetters } from 'vuex'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      // 查询表单
      form: {
        ospId: '', // 卡状态
        serviceType: '',
        spName: '',
        serviceStatus: '', // ID或者姓名
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      statusOptions: [
        {
          dictLabel: '启用',
          dictValue: '1'
        },
        {
          dictLabel: '禁用',
          dictValue: '0'
        }
      ], // 卡状态选项
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      exportData: '', // 查询成功后赋值
      serveOptions: [],
      orderOptions: []
    }
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  mounted() {
    this.getDict()
    this.getData(this.form)
    getServiceProvider().then(res => {
      if (res.code == 0) {
        this.orderOptions = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    getDict() {
      const dictKey = [
        'order_set_meal_type'
      ].join(',')
      allSelectdictionaryData(dictKey).then(response => {
        const dict = response.data
        for (const key in dict) {
          switch (key) {
            // 户口性质
            case 'order_set_meal_type':
              this.serveOptions = dict[key]
              break
          }
        }
      })
    },
    // switch 开关事件监听
    changeSwitch(e) {
      let _tit = ''
      let _tips = ''
      const deleteButton = e.deleteButton

      const STATUS = e.serviceStatus
      let status = null
      if (STATUS === '0') {
        status = '1'
      } else {
        status = '0'
      }
      const params = {
        id: e.id,
        serviceStatus: status
      }
      if (e.serviceStatus === '1') {
        if (deleteButton == '1') {
          return this.$message.error('该服务项目存在套餐/计划中，不能禁用')
        }
        _tit = '禁用'
        _tips = '禁用后，不能创建项目计划，确定禁用吗？'
        this.$confirm(_tips, _tit + '标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeBut(params, _tit)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
          // this.roleForm.status = STATUS;
        })
      } else {
        _tit = '启用'
        this.changeBut(params, _tit)
      }
    },
    changeBut(params, tit) {
      changeStatus(params).then(response => {
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: '服务项目' + tit + '成功'
          })
          this.getData(this.form)
        } else {
          this.$message.error(response.msg)
          // this.roleForm.status = STATUS;
        }
      }).catch(error => {
        reject(error)
        this.$message.error('操作失败！')
        // this.roleForm.status = STATUS;
      })
    },
    // 表单查询按钮
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      getProjectList(form).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.tableData = res.data.list
            this.total = res.data.total
            this.exportData = _.cloneDeep(form)
            delete this.exportData.pageNum
            delete this.exportData.pageSize
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message.error('获取服务项目失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.form = {
        ospId: '', // 卡状态
        serviceType: '',
        spName: '',
        serviceStatus: '', // ID或者姓名
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/projectManagement/serveProject/details',
        query: { 'modelType': 'add', '_title': '新增服务项目' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/projectManagement/serveProject/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.spName}`, 'menu': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/card/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.spName}` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      const content = `<p>【${row.spName}】尚未使用，确定要删除吗？</p>`
      this.$confirm(content, '删除信息', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeProject(row.id).then(response => {
          if (response.code == '0') {
            this.$message({
              type: 'success',
              message: `删除服务项目成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除服务项目操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除服务项目操作失败!`)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    }
  }
}
</script>

<style scoped>
	@import "~@/styles/form.css";
</style>
|
