<template>
  <el-container>
    <el-header v-has="{class: '查询'}" class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item v-if="data.accountType==='3' && data.assistiveRentType === null" label="服务商">
          <el-select v-model="form.ospId" placeholder="请选择服务商" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in shops"
              :key="item.org_id"
              :label="item.org_name"
              :value="item.org_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="套餐类型">
          <el-select v-model="form.smType" placeholder="请选择套餐类型" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in orderServiceType"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="套餐名称">
          <el-input
            v-model.trim="form.smName"
            clearable
            style="width: 200px"
            placeholder="请输入套餐名称"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item label="套餐状态">
          <el-select v-model="form.smState" placeholder="请选择套餐状态" clearable style="width: 200px" @keyup.enter.native="search">
            <el-option
              v-for="item in statusTc"
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
          <el-button v-if="data.accountType==='3'&& data.assistiveRentType!=null" v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
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
            <el-table-column v-if="data.accountType==='3' && data.assistiveRentType === null" label="服务商名称" prop="ospName" align="center" />
            <el-table-column label="套餐类型" prop="smType" />
            <el-table-column label="套餐名称" prop="smName" />
            <el-table-column label="创建时间" prop="createTime" />
            <el-table-column label="总计（元/月）" prop="smMoney" align="center" />
            <el-table-column label="套餐状态" prop="smState">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.smState"
                  class="switchStyle"
                  active-text="启用"
                  inactive-text="禁用"
                  active-value="启用"
                  inactive-value="禁用"
                  disabled
                  @click.native="changeSwitch(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column v-if="data.accountType==='3'&& data.assistiveRentType!=null" label="操作" prop="addr">
              <template slot-scope="scope">
                <span v-if="scope.row.isHideButton === false" style="color: #3367D6; cursor: pointer" @click="delIt(scope.row)">刪除</span>
              </template>
            </el-table-column>
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
import { getIpsNameList, getMealList, banMeal, delMeal } from '@/api/orderManage/ips'
import { pageModel } from '@/common'
import Pagination from '@/components/Pagination'
import { allSelectdictionaryData } from '@/api/facilitiesConfig/pensionAgency'
import { mapGetters } from 'vuex'
export default {
  name: 'MealService',
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        ospId: '', // 服务商名称
        smName: '', // 套餐名称
        smType: '', // 套餐类型
        smState: '', // 套餐状态
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      },
      shops: [],
      orderServiceType: [],
      statusTc: [],
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.getIpsNameList()
    this.getSelect()
    this.getData(this.form)
  },
  methods: {
    delIt(row) {
      this.$confirm('确定要删除套餐【' + row.smName + '】吗？一旦被删除，将无法查看【' + row.smName + '】', '删除套餐', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMeal(row.id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '刪除套餐成功!'
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$message.error('操作失败！')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    },
    changeSwitch(e) {
      let _tit = ''
      let _tips = ''
      const STATUS = e.smState
      let status = null
      if (STATUS === '禁用') {
        status = '1'
      } else {
        status = '0'
      }
      const params = {
        id: e.id,
        smState: status
      }
      if (e.smState === '启用') {
        _tit = '禁用'
        _tips = '禁用后，不能添加计划，确定禁用吗？'
        this.$confirm(_tips, _tit + '标签', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(123);
          this.changeBut(params, _tit)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
          // e.smState = '0'
          // this.roleForm.status = STATUS;
        })
      } else {
        _tit = '启用'
        this.changeBut(params, _tit)
      }
    },
    changeBut(params, tit) {
      banMeal(params).then(response => {
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: '套餐' + tit + '成功'
          })
          this.getData(this.form)
        } else {
          this.$message.error(response.msg)
          // this.roleForm.status = STATUS;
        }
      }).catch(error => {
        console.log(error)
        this.$message.error('操作失败！')
        // this.roleForm.status = STATUS;
      })
    },
    addTableRow() {
      this.$router.push({
        path: '/projectManagement/mealService/details',
        query: { 'modelType': 'add', '_title': '新增服务套餐' } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
    },
    toDetail(row) {
      this.$router.push({
        path: `/projectManagement/mealService/details/${row.id}`,
        query: { 'modelType': 'look', '_title': `查看${row.smName}`, 'menu': this.$route.meta.id }
      })
    },
    search() {
      this.form.pageNum = 1
      this.onSubmit()
    },
    onSubmit() {
      const params = _.cloneDeep(this.form)
      this.getData(params)
    },
    getData(params) {
      getMealList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    onReset() {
      this.form = {
        ospId: '', // 服务商名称
        smName: '', // 套餐名称
        smType: '', // 套餐类型
        smState: '', // 套餐状态
        pageNum: pageModel.pageNum,
        pageSize: pageModel.pageSize
      }
      this.getData(this.form)
    },
    getIpsNameList() {
      getIpsNameList().then(res => {
        if (res.code === 0) {
          this.shops = res.data
        }
      })
    },
    getSelect() {
      const dictKey = [
        'order_set_meal_type',
        'status'
      ].join(',')
      return new Promise((resolve, reject) => {
        allSelectdictionaryData(dictKey).then(response => {
          const dict = response.data
          for (const key in dict) {
            switch (key) {
              case 'order_set_meal_type':
                this.orderServiceType = dict[key]
                break
              case 'status':
                this.statusTc = dict[key]
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

<style scoped>

</style>
