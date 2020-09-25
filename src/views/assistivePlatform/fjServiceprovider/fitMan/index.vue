<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="服务商">
          <el-select
            v-model="form.spId"
            placeholder="请选择服务商"
            clearable
            style="width:300px"
            @keyup.enter.native="onSubmit"
            @change="changeSpname"
          >
            <el-option
              v-for="item in ctyIdList"
              :key="item.spName"
              :label="item.spName"
              :value="item.spId"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="租赁点">-->
        <!--          <el-select-->
        <!--            v-model="form.orgId"-->
        <!--            placeholder="请选择租赁点"-->
        <!--            clearable-->
        <!--            @keyup.enter.native="onSubmit"-->
        <!--            style="width:300px"-->
        <!--          >-->
        <!--              <el-option-->
        <!--                  v-for="item in optionList"-->
        <!--                  :key="item.orgId"-->
        <!--                  :label="item.orgName"-->
        <!--                  :value="item.orgId">-->
        <!--              </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->
        <el-form-item label="关键词">
          <el-input
            v-model.trim="form.keyword"
            clearable
            placeholder="请输入姓名或身份证号"
            style="width: 220px"
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
    <!--table板块-->
    <el-main class="tableContainer assist-s">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button v-has="{class: '新增'}" type="primary" class="base-btn" @click="addTableRow()">新增
            </el-button>
            <el-button v-has="{class: '导入'}" type="primary" class="base-btn" @click="importFun()">导入
            </el-button>
            <el-button v-has="{class: '导出'}" type="primary" class="base-btn" @click="exportFun()">导出
            </el-button>
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
            <el-table-column label="姓名" show-overflow-tooltip prop="fullName" min-width="200" header-align="center" />
            <el-table-column label="性别" prop="sex" min-width="150" header-align="center" />
            <el-table-column label="身份证号" show-overflow-tooltip prop="idCard" min-width="200" header-align="center" />
            <el-table-column label="联系方式" prop="homePhone" min-width="200" header-align="center" />
            <el-table-column label="所属服务商" prop="spName" min-width="200" header-align="center" />
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
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

        <el-dialog title="导入适配师信息" :visible.sync="dialogVisibleImport" class="importStyleDialog" :close-on-click-modal="false">
          <import-dialog :upload-url="uploadUrl" :template-api="getAdapterDownload" template-name="适配师导入模板" :dialog-visible="dialogVisibleImport" @visible="visible" />
        </el-dialog>
      </el-container>
    </el-main>
    <div style="display:none">
      <img id="bigPriDev" width="640" height="480"></img>
      <img id="devPhoto" width="360" height="270"></img>
      <textarea id="output" style="width: 500px;height: 500px;" /><br>
      <br>
      <input id="startIDCard" type="button" value="启动二代证阅读">
      <tr>
        <input id="openHtml" type="button" value="初始化">
        <input id="closeHtml" type="button" value="反初始化">
        <br>
        设备列表：<select id="devList" style="width: 120px" />
        <select id="modelList" style="width: 120px" />
        <select id="resolutionList" style="width: 120px" />
        <input id="openPriVideo" type="button" value="打开主视频">
        <input id="closePriVideo" type="button" value="关闭主视频">
        <input id="photographPri" type="button" value="拍照">
        <br>
        <input id="setdeskew" type="checkbox" value="">纠偏裁边
        <input id="rotateLeft" type="button" value="左转">
        <input id="rotateRight" type="button" value="右转">
        <input id="showProperty" type="button" value="属性设置">
        <input id="composePDF" type="button" value="合成PDF">
        <input id="deleteFile" type="button" value="删除文件">
        <input id="getFileBase64" type="button" value="获取文件base64">
        <input id="setImageProperty" type="button" value="图片保存参数">
        <br>
        <div id="container" style="float:left;" />
      </tr>
    </div>
  </el-container>
</template>

<script>
import { inits } from '@/utils/qwebchannel'
import Address from '@/components/Address'
import Pagination from '@/components/Pagination'
import ImportDialog from '@/components/importDialog/index'
import { pageModel } from '@/common'
import { getToken } from '@/utils/auth'
import { downloadFromBlob } from '@/utils/index'
import qs from 'qs'
import uploadExcelMix from '@/mixins/uploadExcelMix'
import { getSpList, getRentAdapterList, getAdapterDownload, getOrdanAdapterDownload, deleteAdapterList, getServerStoreList } from '@/api/assistiveDevices/assistSupplier'
export default {
  components: {
    ImportDialog,
    Address,
    Pagination
  },
  mixins: [uploadExcelMix],
  data() {
    return {
      optionList: [], // 租赁点
      dialogVisible: false,
      dialogVisibleImport: false,
      // 机构类型
      org_typeOptions: [],
      // 查询表单
      form: {
        orgId: '',
        keyword: '', // 关键字查询
        spId: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      },
      // 老人标签集合
      tags: [],
      // 区域全部ID
      areaCode: [],
      // <-- table -->
      tableData: [], // table表格数据
      multipleSelection: [], // 多选的行数据
      total: 0, // 总共多少数量
      uploadUrl: process.env.VUE_APP_BASE_API + '/assistive/rent/adapter/import',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      idEdit: true,
      exportData: '', // 查询成功后赋值
      getAdapterDownload,
      // my
      ctyId: [], // 所选产品ID
      defaultProps: {
        label: 'spName',
        value: 'spId'
      }, // 自定义级联属性
      ctyIdList: [] // 产品级联数据
    }
  },
  mounted() {
    this.idEdit = false
    /**
       * 数据字典接口
       */
    this.getData(this.form)
    // my
    this.getProductLists()
    inits((message) => {
      let IDcardInfo = 'IDcardInfo:'
      if (message.indexOf(IDcardInfo) >= 0) {
        IDcardInfo = message.substr(IDcardInfo.length)
        this.IdCardList = IDcardInfo.split(' ')
        this.form.keyword = this.IdCardList[7]
        this.getData(this.form)
      }
    })
  },
  methods: {
    // 获取服务商下拉列表
    getProductLists() {
      getSpList().then(res => {
        if (res) {
          this.ctyIdList = res.data
        }
      })
    },
    // 获取租赁点
    getoptionList(val) {
      getServerStoreList({ orgId: val }).then(res => {
        if (res) {
          this.optionList = res.data
        }
      })
    },
    changeSpname(val) {
      this.form.orgId = ''
      this.getoptionList(val)
    },
    // not my
    // 表单查询按钮
    onSubmit() {
      this.form.pageNum = 1
      this.getData(this.form)
    },
    // 获取表格数据
    getData(form) {
      const parmas = _.cloneDeep(form)
      if (this.ctyId.length > 0) {
        parmas.spId = this.ctyId[this.ctyId.length - 1]
      }
      getRentAdapterList(parmas).then(res => {
        if (res) {
          this.tableData = res.data.list
          this.total = res.data.total
          this.exportData = JSON.parse(JSON.stringify(this.form))
        }
      })
    },
    // 表单重置按钮
    onReset() {
      this.ctyId = []
      this.form = {
        keyword: '', // 关键字查询
        spId: '', // 区域表单ID
        orgId: '',
        pageNum: pageModel.pageNum, // 分页页数
        pageSize: pageModel.pageSize // 分页数量
      }
      this.getData(this.form)
    },
    // 添加行
    addTableRow() {
      this.jumpPensionAgency()
    },
    // 双击行去详情页面
    toDetail(row) {
      this.$router.push({
        path: `/fitMan/details/${row.id}`,
        query: { 'id': row.id, 'modelType': 'look', '_title': `查看适配师`, 'editAuthority': this.$route.meta.id }
      })
    },
    // 多选的行数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑按钮
    handleEdit(row) {
      this.$router.push({
        path: `/fitMan/details/${row.id}`,
        query: { 'id': row.productId, 'modelType': 'edit', '_title': `编辑适配师` }
      })
    },
    // 删除按钮
    handleRemove($index, row) {
      this.$confirm('确定要删除【' + row.fullName + '】的信息吗？一旦被删除，将无法查看【' + row.fullName + '】的信息', '删除辅具适配师信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdapterList(row.id).then(response => {
          if (response.code === 0 || response.code === '0') {
            this.$message({
              type: 'success',
              message: response.msg
            })
            this.form.pageNum = 1
            this.getData(this.form)
          } else {
            this.$message.error(response.msg)
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
    // 跳转到新增
    jumpPensionAgency() {
      this.$router.push({
        path: `/fitMan/details/0`,
        query: { 'modelType': 'add', '_title': `新增适配师` } // modelType: 查看:look，编辑:edit，新增:add的类型
      })
      this.dialogVisible = false
    },
    importFun() {
      this.dialogVisibleImport = true
    },
    // 导出功能
    exportFun() {
      let confirmTitle = ''
      if (this.exportData.spId === '' && this.exportData.keyword === '') {
        confirmTitle = '确认导出全部适配师信息吗？'
      } else {
        confirmTitle = '确认导出筛选的适配师信息吗？'
      }
      this.$confirm(
        confirmTitle,
        '导出适配师信息',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }
      )
        .then(() => {
          const _form = this.form
          delete _form.pageNum
          delete _form.pageSize
          // const data = qs.stringify(this.exportData);
          getOrdanAdapterDownload(_form).then(response => {
            if (response instanceof ArrayBuffer) {
              const datas = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;' })
              downloadFromBlob(datas, '适配师列表.xlsx')
            } else {
              if (response.code != 0 || response.code != '0') {
                this.$message.error('导出适配师信息操作失败，失败原因是：' + response.msg)
              }
            }
          }).catch(() => {
            if (error && error.message) {
              if (error.message.indexOf('timeout') > -1) {
                error.message = '网络连接超时'
              }
              this.$message.error('导出适配师信息操作失败，失败原因是：' + error.message)
            } else {
              this.$message.error('导出适配师信息操作失败！')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          })
        })
    },
    // 关闭弹窗
    visible(value) {
      this.dialogVisibleImport = value
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";
  .instituWrap {
    padding: 20px 20px 40px 20px;
  }

  .instituDiv {
    float: left;
    width: 140px;
    height: 140px;
    text-align: center;
    cursor: pointer;
    background-color: #DAE9F5;
    transition: all 0.5s;
  }

  .instituDiv .iconfont {
    font-size: 100px;
    display: block;
    color: #147FD9;
  }

  .instituDiv .text {
    font-size: 16px;
    color: #147FD9;
  }

  .instituDiv:first-child {
    margin-right: 40px;
  }

  .instituDiv:hover {
    background-color: #bfdcf3;
  }
  .assist-s {
    .el-table th, .el-table td {
      text-align: center;
    }
  }
</style>

