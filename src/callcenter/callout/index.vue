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
        <el-form-item>
          <el-button type="primary" class="base-btn" @click="onSubmit">查询
          </el-button>
          <el-button v-has="{class: '查询'}" type="warning" class="base-btn" @click="onReset">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main class="tableContainer">
      <el-container>
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
            <!--fixed="right"-->
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
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      form: {
        customerNumber: ''
      },
      total: 0,
      tableData: [],
      loadingSubmit: false// 查询按钮加载动画
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.loadingSubmit = true
      const parmas = {
        status: this.form.phone
      }
      if (parmas.visible === '' && parmas.phone === '') {
        this.ajaxData()
      } else {
        this.ajaxData(parmas)
      }
    },
    // 请求后台数据---axios--查全部数据
    ajaxData(data) {
      loadDepartmentTreeData(data).then(response => {
        this.tableData = response
        if (this.isOperate === false) {
          if (this.tableData[0].hasChildren) {
            this.tableData[0].children.forEach((item, i) => {
              this.tableData[0].children[i].isShow = false
            })
          }
        }
        // this.loadingReset = false;
        this.loadingSubmit = false
      }).catch(() => {
        this.$message.error('请求失败！')
        setTimeout(() => {
          // this.loadingReset = false;
          this.loadingSubmit = false
        }, 1000)
      })
    },
    onReset() {

    },
    getData(form) {

    }
  }
}
</script>

<style scoped>
</style>
