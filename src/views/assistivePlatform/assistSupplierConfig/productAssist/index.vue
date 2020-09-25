<template>
  <el-container>
    <!--查询表单-->
    <el-header class="formDiv">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="产品类别">
          <el-cascader
            v-model="ctyId"
            :options="ctyIdList"
            placeholder="请选择产品类别"
            :props="defaultProps"
            clearable
            style="width:300px"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model.trim="form.keyword" @keyup.enter.native="onSubmit" clearable placeholder="请输入产品编号或产品名称" style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询
          </el-button>
          <el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <!--table板块-->
    <el-main class="tableContainer assist-s">
      <el-container>
        <el-header>
          <div class="total-nav">
            <el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增
            </el-button>
            <el-button type="primary" @click="importFun()" class="base-btn" v-has="{class: '导入'}">导入
            </el-button>
            <el-button type="primary" @click="exportFun()" class="base-btn" v-has="{class: '导出'}">导出
            </el-button>
            <div v-if="this.total !== 0" class="totalWrap">已筛选到{{this.total}}条匹配信息</div>
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
            <el-table-column type="selection" width="50" fixed="left"></el-table-column>
            <el-table-column label="序号" width="80" fixed="left">
              <template slot-scope="{row,$index}">
                <span>{{$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品类别" show-overflow-tooltip prop="ctyName" min-width="200" header-align="center"></el-table-column>
            <el-table-column label="产品编号" prop="productCode" min-width="150" header-align="center"></el-table-column>
            <el-table-column label="产品名称及型号" show-overflow-tooltip prop="productName" min-width="200" header-align="center"></el-table-column>
            <el-table-column label="供应商" prop="supplierName" min-width="300" header-align="center"></el-table-column>
            <el-table-column label="6个月单次租赁价(元)" prop="sixMonth" min-width="180" header-align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" header-align="center">
              <template slot-scope="{row,$index}">
                <span @click="handleEdit(row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
                <span @click="handleRemove($index, row)" class="table-btn" v-has="{class: '删除'}">删除</span>
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

        <el-dialog title="导入租赁产品信息" :visible.sync="dialogVisibleImport" class="importStyleDialog" :close-on-click-modal="false">
          <import-dialog :upload-url="uploadUrl" :template-api="getOrdanFaultDownload" template-name="辅具产品导入模板" @visible="visible" :dialog-visible="dialogVisibleImport"></import-dialog>
        </el-dialog>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  import Address from "@/components/Address"
  import Pagination from "@/components/Pagination";
  import ImportDialog from '@/components/importDialog/index';
  import {pageModel} from "@/common";
  import {getToken} from '@/utils/auth'
  import {downloadFromBlob} from '@/utils/index';
  import qs from 'qs';
  import uploadExcelMix from '@/mixins/uploadExcelMix';
  import {getProductList,getRentProductList,getOrdanFaultDownload,getOrdanDownload, deleteList} from "@/api/assistiveDevices/assistSupplier";
  export default {
    components: {
      ImportDialog,
      Address,
      Pagination
    },
    mixins: [uploadExcelMix],
    data() {
      return {
        dialogVisible: false,
        dialogVisibleImport: false,
        // 机构类型
        org_typeOptions: [],
        // 查询表单
        form: {
          keyword: '', // 关键字查询
          ctyId: '',
          pageNum: pageModel.pageNum, // 分页页数
          pageSize: pageModel.pageSize // 分页数量
        },
        // 老人标签集合
        tags: [],
        // 区域全部ID
        areaCode: [],
        // <-- table -->
        tableData: [], // table表格数据
        multipleSelection: [], //多选的行数据
        total: 0, // 总共多少数量
        uploadUrl: process.env.VUE_APP_BASE_API + '/assistive/rent/product/import',
        headers: {
          Authorization: 'Bearer ' + getToken()  // Authorization ，而不是token
        },
        idEdit: true,
        exportData: '', // 查询成功后赋值
        getOrdanFaultDownload,
        // my
        ctyId: [], // 所选产品ID
        defaultProps: {
          label: "ctyName",
          value: "ctyCode",
          checkStrictly: true
        }, // 自定义级联属性
        ctyIdList: [], // 产品级联数据
      }
    },
    mounted() {
      this.idEdit = false;
      /**
       * 数据字典接口
       */
      this.getData(this.form);
      // my
      this.getProductLists()
    },
    methods: {
      // 获取产品下拉列表
      getProductLists() {
        getProductList().then(res =>{
          if (res) {
            this.ctyIdList = res
          }
        })
      },
      // not my
      //表单查询按钮
      onSubmit() {
        this.form.pageNum = 1;
        this.getData(this.form);
      },
      // 获取表格数据
      getData(form) {
        let parmas = _.cloneDeep(form);
        if (this.ctyId.length > 0 ) {
          parmas.ctyId = this.ctyId[this.ctyId.length - 1]
        }
        getRentProductList(parmas).then(res => {
          if (res) {
            this.tableData = res.data.list;
            this.total = res.data.total;
            this.exportData = JSON.parse(JSON.stringify(this.form))
          }
        })
      },
      // 表单重置按钮
      onReset() {
        this.ctyId = [];
        this.form = {
          keyword: '', // 关键字查询
          ctyId: '', // 区域表单ID
          pageNum: pageModel.pageNum, // 分页页数
          pageSize: pageModel.pageSize // 分页数量
        };
        this.getData(this.form);
      },
      //添加行
      addTableRow() {
        this.jumpPensionAgency()
      },
      // 双击行去详情页面
      toDetail(row) {
        this.$router.push({
          path: `/productAssist/details/${row.productId}`,
          query: {'id': row.productId, 'modelType': 'look', '_title': `查看租赁产品`,'editAuthority':this.$route.meta.id}
        });
      },
      // 多选的行数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 编辑按钮
      handleEdit(row) {
        this.$router.push({
          path: `/productAssist/details/${row.productId}`,
          query: {'id': row.productId, 'modelType': 'edit', '_title': `编辑租赁产品`}
        });
      },
      // 删除按钮
      handleRemove($index, row) {
        this.$confirm('确定要删除【' + row.productName + '】的信息吗？一旦被删除，将无法查看【' + row.productName + '】的信息', '删除辅具租赁产品信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteList(row.productId).then(response => {
            if (response.code === 0 || response.code === '0') {
              this.$message({
                type: 'success',
                message: response.msg
              });
              this.form.pageNum = 1;
              this.getData(this.form);
            }
            else {
              this.$message.error(response.msg);
            }
          }).catch(() => {
            this.$message.error('操作失败！');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          });
        });
      },
      //跳转到新增
      jumpPensionAgency() {
        this.$router.push({
          path: `/productAssist/details/0`,
          query: {'modelType': 'add', '_title': `新增租赁产品`} //modelType: 查看:look，编辑:edit，新增:add的类型
        });
        this.dialogVisible = false;
      },
      importFun() {
        this.dialogVisibleImport = true;
      },
      //导出功能
      exportFun() {
        let confirmTitle = '';
        if(!this.ctyId.length && this.form.keyword === ''){
          confirmTitle = '确认导出全部辅具产品信息吗？';
        }
        else {
          confirmTitle = '确认导出筛选的辅具产品信息吗？';
        }
        this.$confirm(
          confirmTitle,
          "导出辅具产品信息",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal:false
          }
        )
          .then(() => {
            let _form = {}
            _form.keyword = this.form.keyword
            if(this.ctyId.length){
              _form.ctyId= this.ctyId[this.ctyId.length-1]
            }else{
              _form.ctyId=""
            }
            // const data = qs.stringify(this.exportData);
            getOrdanDownload(_form).then(response => {
              if (response instanceof ArrayBuffer) {
                const datas = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;'});
                downloadFromBlob(datas, '辅具产品列表.xlsx')
              } else {
                if (response.code != 0 || response.code != '0') {
                  this.$message.error("导出辅具产品信息操作失败，失败原因是：" + response.msg);
                }
              }
            }).catch(() => {
              if (error && error.message) {
                if (error.message.indexOf('timeout') > -1) {
                  error.message = '网络连接超时';
                }
                this.$message.error("导出辅具产品信息操作失败，失败原因是：" + error.message);
              } else {
                this.$message.error("导出辅具产品信息操作失败！");
              }
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作！"
            });
          });
      },
      // 关闭弹窗
      visible(value) {
        this.dialogVisibleImport = value;
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


