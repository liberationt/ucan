<template>
  <el-container>
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="form.beginTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="开始时间"
          />
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model.trim="form.phone"
            clearable
            placeholder="请输入姓名或身份证号查询"
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
        <el-header>
          <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增</el-button>
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
              prop="deptName"
              min-width="90"
              header-align="left"
            />
            <el-table-column
              label="回复时间"
              prop="orderNum"
              min-width="90"
              header-align="left"
            />
            <el-table-column
              label="短信详情"
              prop="createTime"
              min-width="300"
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
        beginTime: ''
      },
      total: 0,
      tableData: []
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
      console.log(this.form)
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
