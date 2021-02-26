<template>
  <el-container class="isp-table">
    <el-header v-has="{class: '查询'}" class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属区域">
          <Address
            :area-code="areaCode"
            :form-code="form.areaCode"
            :id-edit="idEdit"
            :width="'200px'"
            @getAreaCode="getAreaCode"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item label="服务商全称" v-if="data.accountType==='3'&& data.assistiveRentType===null">
          <el-select v-model="form.orgId" placeholder="请选择服务商" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in shops"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型">
          <el-select v-model="form.orderServiceType" placeholder="请选择服务类型" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in orderServiceType"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-has="{class: '查询'}" type="primary" class="base-btn" @click="search">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
        <el-header>
          <el-button v-if="isAddShow&&data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
          </el-button>
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
            <el-table-column label="序号" width="50" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="服务商名称" prop="orgName" align="center" />
            <el-table-column label="咨询电话" prop="phone" />
            <el-table-column label="所属区域" prop="codeLevelName" />
            <el-table-column label="详细地址" prop="officeAddr" />
            <el-table-column label="服务类型" prop="orderServiceType" align="center" />
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="onSubmit"
          />
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import { pageModel } from '@/common'
import { getIpsNameList, getIpsList, getFwsIs } from '@/api/orderManage/ips'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { mapGetters } from 'vuex'
export default {
  name: 'IspIndex',
  components: {
    Address,
    Pagination
  },
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  data() {
    return {
      idEdit: true,
      areaCode: [],
      isAddShow: true,
      form: {
        orgId: '',
        orderServiceType: '',
        areaCode: '', // 区域表单ID
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      tableData: [],
      total: 0,
      shops: [], // 服务商全称
      orderServiceType: [] // 服务类型
    }
  },
  mounted() {
    this.getFwsIs()
    this.idEdit = false
    this.getIpsNameList()
    this.getData(this.form)
    this.getSelect()
  },
  methods: {
    getFwsIs() {
      getFwsIs().then(res => {
        if (res.code === 0) {
          if (res.msg === 'success') {
            this.isAddShow = false
          } else {
            this.isAddShow = true
          }
        }
      })
    },
    toDetail(row) {
      this.$router.push({
        path: `/ISPManagement/details/${row.orgId}`,
        query: { 'modelType': 'look', '_title': `查看${row.orgName}`, 'menu': this.$route.meta.id }
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/ISPManagement/details',
        query: { 'modelType': 'add', '_title': '新增服务商' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    getIpsNameList() {
      getIpsNameList().then(res => {
        if (res.code === 0) {
          this.shops = res.data
        }
      })
    },
    onReset() {
      this.areaCode = []
      this.form = {
        areaCode: '', // 区域表单ID
        orgId: '',
        orderServiceType: '',
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      }
      this.idEdit = !this.idEdit
      this.getData(this.form)
    },
    search() {
      this.form.pageNum = 1
      this.onSubmit()
    },
    onSubmit() {
      const params = _.cloneDeep(this.form)
      if (this.areaCode && this.areaCode.length) {
        params.areaCode = this.areaCode[this.areaCode.length - 1]
      } else {
        params.areaCode = ''
      }
      this.getData(params)
    },
    getData(params) {
      getIpsList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    getSelect() {
      const dictKey = [
        'order_set_meal_type'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'order_set_meal_type':
                this.orderServiceType = dict[key]
                break
            }
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
