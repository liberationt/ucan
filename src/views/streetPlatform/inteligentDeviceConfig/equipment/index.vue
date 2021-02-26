<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="机构">
          <el-input
            v-model.trim="form.orgName"
            clearable
            placeholder="输入机构"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input
            v-model.trim="form.deviceId"
            clearable
            placeholder="输入设备编号"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input
            v-model.trim="form.deviceName"
            clearable
            placeholder="输入设备名称"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="设备供应商">
          <el-input
            v-model.trim="form.deviceProvider"
            clearable
            placeholder="输入设备供应商"
            style="width: 200px"
            @keyup.enter.native="onSubmit"
          />
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="form.deviceType" placeholder="请选择设备类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
            <el-option
              v-for="item in deviceTypeList"
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
<!--            v-has="{class: '新增'}"-->
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
            <div v-if="total !== 0" class="totalWrap">已筛选到{{ total }}条匹配信息</div>
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
            <el-table-column label="所属单位名称" prop="orgName" />
            <el-table-column label="设备编号" prop="deviceId" />
            <el-table-column label="设备名称" prop="deviceName" />
            <el-table-column label="设备类型" prop="deviceType">
              <template slot-scope="{row, $index}">
                <span v-if="row.deviceType === 'vedio'">视频</span>
                <span v-if="row.deviceType === 'wearable'">穿戴设备</span>
              </template>
            </el-table-column>
            <el-table-column label="视频设备名称1" prop="eqName01" />
            <el-table-column label="视频设备名称2" prop="eqName02" />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
<!--                v-has="{class: '编辑'}"-->
                <span v-has="{class: '编辑'}" class="table-btn" @click="handleEdit(row)">编辑</span>
                <span v-has="{class: '删除'}" class="table-btn" @click="handleRemove($index, row)">删除</span>
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
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { sbSearch, removeSb } from '../../../../api/inteligentDeviceConfig/sheibei'
export default {
  name: 'Index',
  components: {
    Address,
    Pagination
  },
  data() {
    return {
      areaCode: [],
      form: {
        areaCode: '',
        orgName: '',
        deviceName: '',
        deviceId: '',
        deviceProvider: '',
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      },
      idEdit: true,
      deviceTypeList: [
        {
          dictLabel: '视频',
          dictValue: 'vedio'
        }, {
          dictLabel: '穿戴设备',
          dictValue: 'wearable'
        }
      ],
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.getData(this.form)
  },
  methods: {
    getAreaCode(val) {
      this.areaCode = val
    },
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    getData(form) {
      sbSearch(form).then(res => {
        if (res.code === 0) {
          if (res.data) {
            this.tableData = res.data.list
            this.total = res.data.total
          }
        } else {
          this.$message.error(res.message)
        }
      }).catch(() => {
        this.$message.error('获取失败！')
      })
    },
    onReset() {
      this.areaCode = []
      this.form = {
        areaCode: '',
        orgName: '',
        deviceName: '',
        deviceId: '',
        deviceProvider: '',
        pageNum: 1, // 分页页数
        pageSize: 10 // 分页数量
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    addTableRow() {
      this.$router.push({
        path: '/equipment/details',
        query: { 'modelType': 'add', '_title': '新增设备' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    handleSelectionChange() {},
    toDetail(row) {
      this.$router.push({
        path: `/equipment/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.deviceName}`, 'menuId': this.$route.meta.id }
      })
    },
    handleEdit(row) {
      this.$router.push({
        path: `/equipment/details/${row.id}`,
        query: { 'modelType': 'edit', '_title': `编辑${row.deviceName}`, 'org': row.orgName }
      })
    },
    handleRemove($index, row) {
      const content = '<p>确定要删除【' + row.deviceName + '】设备信息吗？</p><p>一旦被删除，将无法查看该信息。</p>'
      this.$confirm(content, '删除信息', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeSb(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: `删除设备成功！`
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(`删除设备操作失败，失败原因是：${response.msg}`)
          }
        }).catch(() => {
          this.$message.error(`删除设备操作失败!`)
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

</style>
