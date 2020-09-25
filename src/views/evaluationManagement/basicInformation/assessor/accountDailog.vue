<template>
  <el-dialog
    ref="dailog"
    v-dialogDrag
    :title="title"
    :visible="dialogTableVisible"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    width="60%"
    class="es-dailog account-dailog"
    @close="closeDialog"
    @open="open"
  >
    <div class="dialogmain">
      <div class="roleList">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input
              v-model.trim="form.userName"
              clearable
              placeholder="请输入登录账号或显示名称"
              style="width: 300px"
              @keyup.enter.native="search"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="base-btn" @click="search">查询
            </el-button>
            <el-button type="warning" class="base-btn" @click="onReset">重置
            </el-button>
          </el-form-item>
        </el-form>
        <div :style="{height: heightChange}" class="account-bd">
          <el-table
            :data="tableData"
            ref="multipleTable"
            tooltip-effect="dark"
            style="width: 100%;"
            header-align="left"
            border
            row-key="id"
          >
            <el-table-column label="序号" width="80">
              <template slot-scope="{row,$index}">
                <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="登录账号" prop="loginName" align="center"/>
            <el-table-column label="账号类型" prop="accountTypeName" align="center"/>
            <el-table-column label="显示名称" prop="userName" align="center"/>
            <el-table-column label="创建时间" prop="createTime" align="center"/>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row,$index}">
                <span style="color: #3367D6; cursor: pointer" @click="onSubmit(row)">绑定账号</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getEsimateAccountList"
        />
        <div style="text-align:right;margin-top:10px;">
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import { getEsimateAccountList, bindUserAccountList } from '@/api/esimate/esimate'
import Pagination from '@/components/Pagination'
export default {
  name: 'AccountDailog',
  props: ['dialogTableVisible', 'close', 'id', 'success'],
  components: {
    Pagination
  },
  data() {
    return {
      title: '关联账号',
      closeOnPressEscape: false,
      closeOnClickModal: false,
      form: {
        userName: '',
        pageSize: 10,
        pageNum: 1
      },
      checkList: [],
      heightChange: '210px',
      total: 0,
      tableData: [],
      checkedKeys: null || [] // 选中的菜单keys
    }
  },
  watch: {
    dialogTableVisible() {
      this.getEsimateAccountList()
    }
  },
  mounted() {
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.dailog.$el.lastChild, function(element) {
      const height = element.offsetHeight - 246 + 'px'
      _this.$nextTick(function() {
        this.heightChange = height
      })
    })
  },
  methods: {
    closeDialog() {
      this.close()
    },
    open() {
      this.tableData = []
      this.form.userName = ''
    },
    search() {
      this.form.pageNum = 1
      this.getEsimateAccountList()
    },
    onSubmit(row) {
      this.$confirm(
        '是否要绑定该账号',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        bindUserAccountList({
          empId: this.id,
          userId: row.userId
        }).then(res => {
          if (res.code === 0) {
            this.form.pageNum = 1
            this.getEsimateAccountList()
            this.success()
            this.$message({
              type: 'success',
              message: '绑定成功！'
            })
          }
        })
      }).catch(() => {})
    },
    getEsimateAccountList() {
      getEsimateAccountList(this.form).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    onReset() {
      this.form.userName = ''
      this.form.pageNum = 1
      this.getEsimateAccountList()
    }
  }
}
</script>

<style scoped lang="scss">
  .dialogmain{
    position: relative;
    z-index:99999;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .roleList {
      width: 100%;
    }
    .account-bd {
      height:210px;
      overflow: auto;
      margin-top: 10px;
    }
  }
</style>
<style lang="scss">
  .account-dailog {
    .el-dialog__body {
      overflow: visible;
    }
  }
</style>
