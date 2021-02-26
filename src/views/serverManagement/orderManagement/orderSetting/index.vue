<!-- index.vue -->
<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item v-if="data.accountType==='3'&& data.assistiveRentType===null" label="服务商">
          <el-select v-model="form.ospId" filterable placeholder="请选择服务商" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in serveOptions"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设置类型">
          <el-select v-model="form.parmType" filterable placeholder="请选择设置类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
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
            <el-button v-if="data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <!--            <div class="totalWrap">已派单{{ orderHasBeenDispatched }}人，待派单{{ toBeDispatched }}人。</div>-->
            <!-- <div v-else class="totalWrap">无法找到匹配信息</div> -->
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
            @row-dblclick="toDetail"
          >
            <el-table-column type="selection" width="50" fixed="left" />
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务商名称" prop="ospName" min-width="120" />
            <el-table-column label="设置类型" prop="parmTypeName" min-width="100" />
            <el-table-column label="详情" prop="mobile" min-width="160" show-overflow-tooltip>
              <template slot-scope="{row,$index}">
                <span><el-checkbox v-model="row.parmValue==='0'" disabled>{{ row.parmDesc }}</el-checkbox></span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="toNextPage"
          />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script>
import {
  allSelectdictionaryData
} from '@/api/facilitiesConfig/pensionAgency'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getOrderSetting, getServiceProvider } from '@/api/serverManagement/projectManagement'
import { mapGetters } from 'vuex'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      signDate: [],
      // 查询表单
      form: {
        // dateRange: '',
        ospId: '',
        parmType: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      orderHasBeenDispatched: 0,
      toBeDispatched: 0,
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      exportData: '', // 查询成功后赋值
      statusOptions: [],
      serveOptions: []

    }
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  mounted() {
    this.getData(this.form)
    this.getDict()
    getServiceProvider().then(res => {
      if (res.code == 0) {
        this.serveOptions = res.data
      }
    })
  },
  methods: {
    getDict() {
      const dictKey = [
        'parm_type'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'parm_type':
                this.statusOptions = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    // 表单查询按钮
    async onSubmit() {
      this.form.pageNum = 1
      await this.getData(this.form)
    },
    toNextPage() {
      this.getData(this.form)
    },
    // 获取表格数据
    async getData(form) {
      await getOrderSetting(form).then(res => {
        if (res.code == '0') {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(() => {
        this.$message.error('获取工单设置列表失败！')
      })
    },
    // 表单重置按钮
    onReset() {
      this.signDate = []
      this.form = {
        ospId: '',
        parmType: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.$router.push({
        path: '/orderManagement/orderSetting/details',
        query: { 'modelType': 'add', '_title': '工单设置', 'menu': this.$route.meta.id } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    // 双击行去详情页面
    toDetail(row) {
      this.addTableRow()
    }
  }
}
</script>

<style scoped>
  @import "~@/styles/form.css";
</style>
|
