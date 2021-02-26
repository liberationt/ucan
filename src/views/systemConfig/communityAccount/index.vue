<template>
  <el-container>
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
        <el-form-item label="设施类型">
          <el-select v-model="form.orgType" placeholder="请选择设施类型" clearable style="width: 200px" @keyup.enter.native="onSubmit">
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
            placeholder="请输入设施名称"
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
    <el-main class="tableContainer es-org">
      <el-container>
        <el-main>
          <div style="width: 50%; float:left; padding-right: 10px">
            <div style="font-size: 18px;margin-bottom: 10px">机构列表</div>
            <el-table
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;"
              header-align="left"
              border
              row-key="id"
            >
              <el-table-column type="selection" width="50" />

              <el-table-column label="序号" width="80" fixed="left">
                <template slot-scope="{row,$index}">
                  <span>{{ $index + 1 }}</span>
                </template>
              </el-table-column>

              <el-table-column label="机构名称" user-id="userId" prop="loginName" align="center">
                <template slot-scope="{row}">
                  <span style="cursor: pointer" :class="[isChooseOrg === row.orgId ? 'chooseOrg' : '']" @click="getBindList(row)">{{ row.orgName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="250">
                <template slot-scope="{row}">
                  <span class="table-btn" @click="opDailog(row)">
                    添加账号
                  </span>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="form.pageNum"
              :limit.sync="form.pageSize"
              @pagination="getData"
            />
          </div>
          <div style="width: 50%; float:left; padding-left: 10px">
            <div style="font-size: 18px;margin-bottom: 10px">账号列表</div>
            <div class="checkedmain">
              <el-input v-model="checkedName" placeholder="输入关键字查询" clearable @keyup.enter.native="searchBindList" />
              <div class="aaa">
                <div v-for="(item, i) in accountDatas" :key="i" class="aaa-list">
                  <span style="flex: 1; cursor: pointer" :class="[isChooseAccount === item.userId ? 'chooseOrg' : '']" @click="getOrg(item)">{{ item.userName }}</span>
                  <span class="el-icon-close" style="font-size: 16px; cursor: pointer;" @click="delBindUser(item.userId)" />
                </div>
              </div>
              <div v-show="orgShow" style="margin-top: 10px">
                <span>所属机构：</span>
                <span>{{ org }}</span>
              </div>
            </div>
          </div>
          <!--          <myDialog-->
          <!--            @dialogHide="dialogHanderHide"-->
          <!--            :ajaxData="ajaxData"-->
          <!--            :dialogTableVisible="isShow"-->
          <!--            :tableRowValue="tableRowValue"-->
          <!--            :modelType="modelType"-->
          <!--          ></myDialog>-->
          <!--          <Dialog-->
          <!--            :dialogTableVisible="showdialog"-->
          <!--            @dialogHides="dialogHanderHides"-->
          <!--            :tableRowValue="tableRowValue"-->
          <!--            :ajaxData="ajaxData"-->
          <!--          >-->
          <!--          </Dialog>-->
          <!--        </el-main>-->
          <!--      </el-container>-->
          <!--    </el-main>-->
        </el-main>
      </el-container>
    </el-main>
    <EsDailog :dialog-table-visible="isDailog" :close="closeDailog" :org-id="id" :table-list="tableList" :bind-success="bindSuccess" />
  </el-container>
</template>

<script>
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import EsDailog from './component/dailog'
import { getInstitutionalTypeData } from '@/api/systemConfig/orgPair'
import { getBindList, getUnBindList, delBindUser, searchBindList } from '@/api/esimate/esimate'
import { getComList } from '@/api/systemConfig/account'
export default {
  name: 'Account',
  components: {
    Address,
    Pagination,
    EsDailog
  },
  data() {
    return {
      form: {
        orgName: '',
        orgType: '',
        areaCode: '', // 区域表单ID
        pageSize: 15,
        pageNum: 1
      },
      areaCode: [],
      idEdit: true,
      // 机构类型
      org_typeOptions: [],
      tableData: [],
      total: 0,
      checkedName: '',
      accountDatas: [],
      isDailog: false,
      tableList: [],
      id: '',
      orgId: '',
      org: '',
      orgShow: false,
      isChooseOrg: '',
      isChooseAccount: '',
      rowNew: ''
    }
  },
  watch: {
    org() {
      if (this.org === '' || this.org === null) {
        this.orgShow = false
      } else {
        this.orgShow = true
      }
    }
  },
  mounted() {
    this.idEdit = false
    const dicKey = { 'selectType': '20XX', menuId: this.$route.meta.id }
    getInstitutionalTypeData(dicKey).then(response => {
      this.org_typeOptions = response.data
    })
    this.getData()
  },
  methods: {
    bindSuccess() {
      this.getBindList(this.rowNew)
    },
    opDailog(row) {
      this.getDataList()
      this.isDailog = true
      this.id = row.orgId
      this.rowNew = row
      this.getBindList(row)
    },
    closeDailog() {
      this.isDailog = false
      // this.getBindList(this.orgId)
    },
    getDataList() {
      getUnBindList({ type: 'facility' }).then(res => {
        if (res.code === 0) {
          this.tableList = res.data
        }
      })
    },
    onSubmit() {
      this.orgId = ''
      this.org = ''
      this.isChooseOrg = ''
      this.isChooseAccount = ''
      this.checkedName = ''
      this.accountDatas = []
      const arr = []
      if (this.areaCode.length !== 0) {
        arr.push(this.areaCode[this.areaCode.length - 1])
      }
      this.form.areaCode = arr // 所选区域赋值
      this.form.pageNum = 1
      this.getData()
    },
    getAreaCode(val) {
      this.areaCode = val
    },
    onReset() {
      this.form = {
        orgName: '',
        orgType: '',
        areaCode: '', // 区域表单ID
        pageSize: 15,
        pageNum: 1
      }
      this.areaCode = []
      this.idEdit = !this.idEdit
      this.isChooseOrg = ''
      this.isChooseAccount = ''
      this.getData()
    },
    addAccount() {},
    getData() {
      const parmas = _.cloneDeep(this.form)
      parmas.areaCode = typeof (parmas.areaCode) === 'object' ? parmas.areaCode.join('') : parmas.areaCode
      const paramsForm = Object.assign(parmas, { menuId: this.$route.meta.id })
      console.log(paramsForm, 555)
      getComList(paramsForm).then(res => {
        if (res) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = JSON.parse(JSON.stringify(this.form))
        }
      })
    },
    search(num) {},
    getBindList(row) {
      this.orgId = row.orgId
      this.org = ''
      this.isChooseOrg = ''
      this.isChooseAccount = ''
      getBindList({
        orgId: this.orgId,
        type: 'facility'
      }).then(res => {
        if (res.code === 0) {
          this.accountDatas = res.data
          if (this.accountDatas.length !== 0) {
            this.org = row.orgName
            this.isChooseOrg = row.orgId
          }
        }
      })
    },
    delBindUser(id) {
      this.$confirm(
        '确定要删除该账号？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        delBindUser(id).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            const arr = JSON.parse(JSON.stringify(this.accountDatas))
            arr.forEach((item, index) => {
              if (id === item.userId) {
                this.accountDatas.splice(index, 1)
              }
            })
          }
        })
      })
    },
    getOrg(row) {
      this.org = row.orgName
      this.isChooseAccount = row.userId
    },
    searchBindList() {
      if (this.checkedName !== '') {
        searchBindList({
          userName: this.checkedName,
          type: 'facility'
        }).then(res => {
          if (res.code === 0) {
            if (res.data.length === 0) {
              this.$message.warning('查询不到该账号')
            } else {
              this.accountDatas = res.data
            }
            this.isChooseAccount = ''
            this.org = ''
            this.isChooseOrg = ''
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.es-org {
  .checkedmain {
    padding: 20px;
    border: 1px solid #e1e1e1;
    .aaa {
      height: 532px;
      overflow: auto;
      margin-top: 10px;
      border: 1px solid #e1e1e1;
      padding: 0 20px;
      .aaa-list{
        display: flex;
        font-size: 14px;
        color: #666666;
        margin-top:10px;
        span {
          display: inline-block;
        }
      }
    }
  }
  .chooseOrg {
    color: #EDC707;
  }
}
</style>
