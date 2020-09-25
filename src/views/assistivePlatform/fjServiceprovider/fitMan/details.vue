<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <el-form
              ref="form_base"
              key="form_base"
              :model="form"
              :rules="isEditForm?rulesForm:null"
              label-width="130px"
            >
              <el-collapse-item name="baseItem_1">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />基本信息
                    </span>
                  </div>
                </template>

                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.fullName"
                        placeholder="请输入姓名"
                        clearable
                        style="width:100%;"
                        max-length="30"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'性别':'性别：'" prop="sex">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.sex"
                        placeholder="请选择性别"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn('form_base')"
                      >
                        <el-option
                          v-for="item in sex"
                          v-if="sex.length !== 0"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <div v-else>
                        <span v-for="(item, index) in sex" :key="index">
                          <span v-if="item.dictValue === form.sex">{{ item.dictLabel }}</span>
                        </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证号':'身份证号：'" prop="idCard">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.idCard"
                        placeholder="请输入身份证号"
                        clearable
                        style="width:100%;"
                        max-length="30"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'联系电话':'联系电话：'" prop="homePhone">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.homePhone"
                        placeholder="请输入联系电话"
                        clearable
                        style="width:100%;"
                        max-length="30"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.homePhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'所属服务商':'所属服务商：'" prop="spId">
                      <el-select
                        v-if="isEditForm"
                        v-model="form.spId"
                        placeholder="请选择所属服务商"
                        filterable
                        clearable
                        style="width:100%;"
                        @change="handleChange"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in spList"
                          :key="item.spId"
                          :label="item.spName"
                          :value="item.spId"
                        />
                      </el-select>
                      <div v-else>
                        <span v-for="(item, index) in spList" :key="index">
                          <span v-if="item.spId === form.spId">{{ item.spName }}</span>
                        </span>
                      </div>
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">-->
                  <!--                    <el-form-item :label="isEditForm?'所属租赁点':'所属租赁点：'" prop="storeId">-->
                  <!--                      <el-select v-if="isEditForm" v-model="form.storeId"-->
                  <!--                                 placeholder="请选择所属租赁点" clearable style="width:100%;"-->
                  <!--                                 @keyup.enter.native="submitBtn">-->
                  <!--                        <el-option v-for="item in storeList"-->
                  <!--                                   :key="item.orgId" :label="item.orgName"-->
                  <!--                                   :value="item.orgId"></el-option>-->
                  <!--                      </el-select>-->
                  <!--                      <div v-else>-->
                  <!--                        <span v-for="(item, index) in storeList" :key="index">-->
                  <!--                          <span v-if="item.orgId === form.storeId">{{item.orgName}}</span>-->
                  <!--                        </span>-->
                  <!--                      </div>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                </el-row>
              </el-collapse-item>
            </el-form>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>

      <el-footer>
        <div v-if="isEditForm">
          <el-button type="warning" class="base-btn" @click="submitBtn">确定</el-button>
          <el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
        </div>
        <div v-else>
          <el-button v-if="editAuthority" type="warning" class="base-btn" @click="editContent">编辑</el-button>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import {
  allSelectdictionaryData
} from '@/api/common'
import {
  getEditAuthority
} from '@/api/user'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
import { validateForms, scrollToTop } from '@/utils/index'
// my
import { getSpList, getServerStoreList, addAdapter, lookAdapterDetail, editAdapterDetail } from '@/api/assistiveDevices/assistSupplier'
export default {
  data() {
    return {
      isEditForm: true, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      modelType: '', // 查看：look  编辑：edit  新增：add
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      editAuthority: false,

      form: {
        fullName: '', // 姓名
        sex: '', // 性别
        idCard: '', // 身份证号
        homePhone: '', // 联系电话
        spId: '', // 所属服务商
        storeId: '' // 所属租赁点
      },
      rulesForm: {
        fullName: [
          { required: true, trigger: 'blur', message: '姓名不能为空，请输入' }
        ],
        idCard: [
          { required: true, trigger: 'blur', message: '身份证号不能为空，请输入' }
        ],
        spId: [
          { required: true, trigger: 'change', message: '所属服务商不能为空，请选择' }
        ],
        storeId: [
          { required: true, trigger: 'blur', message: '所属租赁点不能为空，请选择' }
        ],
        homePhone: [
          { required: true, trigger: 'blur', message: '联系电话不能为空，请输入' }
        ]
      },
      // my
      defaultProps: {
        label: 'ctyName',
        value: 'ctyCode'
      }, // 自定义级联属性
      ctyIdList: [], // 产品级联数据
      imageInfoVosLookUrl: [], // 查看时的图片路径
      idEdit: true, // 区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
      eduLevelOptions: [], // 供应商列表
      monthData: [],
      sex: [], // 性别字典
      spList: [], // 服务商列表
      storeList: [] // 租赁点
    }
  },

  mounted() {
    this.modelType = this.$route.query.modelType
    const _consultantId_ = this.$route.params.id || ''

    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false
      this.getData(_consultantId_)
      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.editAuthority).then(response => {
        response.forEach((item) => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      }).catch(() => {
        this.$message.error('获取编辑按钮的权限控制失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_consultantId_)
    }
    // my

    if (this.modelType === 'add') {
      this.getProductLists()
      // this.getSuppliers()
      this.selectData()
    }
  },

  methods: {
    handleChange(val) {
      this.form.storeId = ''
      this.getSuppliers(val)
    },
    // 字典
    // 数据字典
    selectData() {
      const dicKey = 'sys_sex'
      allSelectdictionaryData(dicKey).then(response => {
        if (response.code === 0) {
          for (const k in response.data) {
            switch (k) {
              // 月份
              case 'sys_sex':
                this.sex = response.data[k]
                break
            }
          }
        }
      })
    },
    // 删除价格
    delPrice(index) {
      this.form.rentProductPriceList.splice(index, 1)
    },
    addTableRow() {
      // if (this.form.contact.length >= 3) {
      //   this.$message.warning("联系人数量最多添加3条！");
      //   return false;
      // }
      // this.flag = true;//添加时的取消按钮

      const rowData = {
        bondAdvisePrice: '',
        id: '',
        oneRentPrice: '',
        productId: '',
        rentTerm: '',
        subsidyRentPrice: '',
        edit: true,
        rowIndex: Math.random() * 100000000000000000 + ''
      }
      this.form.rentProductPriceList.push(rowData)
    },
    // 获取租赁点列表
    getSuppliers(val) {
      getServerStoreList({ orgId: val }).then(res => {
        if (res.code === 0) {
          this.storeList = res.data
        }
      })
    },
    // 获取图片数据
    getPicList(val) {
      this.form.imageInfoVos = val
    },
    // 获取服务商下拉列表
    getProductLists() {
      getSpList().then(res => {
        if (res) {
          this.spList = res.data
        }
      })
    },

    async getData(id) {
      await this.getProductLists()
      // await this.getSuppliers();
      await this.selectData()
      if (this.modelType === 'edit') {
        await this.editGetData(id)
      } else if (this.modelType === 'look') {
        await this.editGetData(id)
      }
    },
    // 编辑获取数据
    editGetData(id) {
      return new Promise((resolve, reject) => {
        lookAdapterDetail(id).then(response => {
          if (response.code === 0) {
            if (response.data) {
              this.handleChange(response.data.spId)
              this.form = response.data
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('获取失败！')
        })
      })
    },
    // 确定按钮-提交form表单
    submitBtn() {
      const formRefs = ['form_base'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = _.cloneDeep(this.form)
        // 新增
        if (this.modelType === 'add') {
          addAdapter(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增适配师保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('新增适配师操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增适配师操作失败!')
          })
        }
        // 编辑
        else if (this.modelType === 'edit') {
          editAdapterDetail(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '编辑辅具产品保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('编辑辅具产品操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('编辑辅具产品操作失败!')
          })
        }
      }).catch(objectList => {
        scrollToTop()
      })
    },
    // 取消按钮
    cancelBtn() {
      this.$confirm(
        '该页面的信息尚未保存，确定要关闭页面吗',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.closeDetailsPage()
      }).catch(() => {
      })
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/assistivePlatform/fjServiceprovider/fitMan')
    },
    // 查看详情页面，点击编辑按钮
    editContent() {
      this.$router.push({
        path: `/fitMan/details/${this.$route.params.id}`,
        query: { 'modelType': 'edit', '_title': `编辑适配师` }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
  }

  .el-footer {
    padding-top: 24px;
    padding-right: 0;
  }

  .el-footer > div {
    overflow: hidden;
  }

  .el-footer > div > button {
    float: right;
  }

  .base-btn {
    margin-left: 15px;
  }
  .detail-selects {
    width: 100%;
    float: left;
    .detail-selects-list {
      width: 100%;
      margin-bottom: 15px;
      float: left;
      .add-price {
        width: 100%;
        float: left;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px dashed #e1e1e1;
        border-left: 1px dashed #e1e1e1;
        border-right: 1px dashed #e1e1e1;

        text-align: center;
        line-height: 40px;
        color: #1890ff;
        float: left;
        cursor: pointer;
      }
      .detail-selects-item {
        width: 25%;
        float: left;
        .detail-selects-list-title {
          width: 100%;
          font-size: 14px;
          text-align: center;
          line-height: 40px;
          background: #f0f3f9;
          border: 1px solid #e1e1e1;
          border-right: 0;
        }
        .detail-selects-list-input {
          width: 100%;
          padding: 0 10%;
          font-size: 14px;
          text-align: center;
          height: 37px;
          line-height: 37px;
          margin: 20px 0;
        }
      }
      .detail-selects-item:nth-child(5n) {
        .detail-selects-list-title {
          border-right: 1px solid #e1e1e1 !important;
        }
      }
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .addBtnDiv {
    border: 1px dashed #E1E1E1;
    border-top: none;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
</style>
