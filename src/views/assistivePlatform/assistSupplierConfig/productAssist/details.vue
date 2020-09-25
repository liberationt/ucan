<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <el-form ref="form_base" key="form_base" :model="form"
                     :rules="isEditForm?rulesForm:null" label-width="130px">
              <el-collapse-item name="baseItem_1">
                <template slot="title">
                  <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>基本信息
                  </span>
                  </div>
                </template>

                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'产品类别':'产品类别：'" prop="ctyIds">
                      <el-cascader
                        v-if="isEditForm"
                        v-model="form.ctyIds"
                        :options="ctyIdList"
                        placeholder="请选择产品类别"
                        :props="defaultProps"
                        clearable
                        style="width:100%"
                      ></el-cascader>
                      <span v-else>{{form.ctyNameLevel}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'产品编号':'产品编号：'" prop="productCode">
                      <el-input v-if="isEditForm" v-model.trim="form.productCode"
                                placeholder="请输入产品编号" clearable style="width:100%;" maxLength="30"
                                @keyup.enter.native="submitBtn">
                      </el-input>
                      <span v-else>{{form.productCode}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'产品名称及型号':'产品名称及型号：'" prop="productName">
                      <el-input v-if="isEditForm" v-model.trim="form.productName"
                                placeholder="请输入产品名称及型号" clearable style="width:100%;" maxLength="50"
                                @keyup.enter.native="submitBtn">
                      </el-input>
                      <span v-else>{{form.productName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'供应商':'供应商：'" prop="supplierId">
                      <el-select v-if="isEditForm" v-model="form.supplierId"
                                 placeholder="请选择供应商" filterable clearable style="width:100%;"
                                 @keyup.enter.native="submitBtn">
                        <el-option v-for="item in eduLevelOptions"
                                   :key="item.supplierId" :label="item.supplierName"
                                   :value="item.supplierId"></el-option>
                      </el-select>
                      <span v-else>{{form.supplierName}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :md="24" :lg="24" style="height: auto;">
                    <el-form-item :label="this.isEditForm?'产品图片':'产品图片：'">
                      <el-row v-if="!this.isEditForm" class="agencyImageRow">
                        <el-col class="agencyImageCol" v-for="(item,index) in this.imageInfoVosLookUrl">
                          <img :src="item" class="agencyImage"/>
                        </el-col>
                      </el-row>
                      <div v-else class="agencyImageWrap">
                        <Uploadpics @pics="getPicList" :id-edit="idEdit" :form-imgs="form.imageInfoVos" @keyup.enter.native="editContent('form_base')"></Uploadpics>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24" :lg="24" style="height: auto;">

                    <el-form-item :label="isEditForm?'产品价格':'产品价格：'"  :rules="[
                        { required: true, message: '' },
                    ]">
                      <div class="detail-selects">
                        <div class="detail-selects-list">
                          <div class="detail-selects-item">
                            <div class="detail-selects-list-title">租期(月)</div>
                          </div>
                          <div class="detail-selects-item">
                            <div class="detail-selects-list-title">单次租赁价(元)</div>
                          </div>
                          <div class="detail-selects-item">
                            <div class="detail-selects-list-title">补贴租赁价(元)</div>
                          </div>
                          <div class="detail-selects-item">
                            <div class="detail-selects-list-title">保证金建议价(元)</div>
                          </div>
<!--                          <div class="detail-selects-item" style="width: 12%">-->
<!--                            <div class="detail-selects-list-title">操作</div>-->
<!--                          </div>-->

                          <div v-for="(item, index) in form.rentProductPriceList">
                            <div class="detail-selects-item">
                              <div class="detail-selects-list-input">
                                <el-form-item v-if="isEditForm" :rules="rulesForm.rentTerm" :prop="'rentProductPriceList.' +index + '.rentTerm'"  :ref="'rentProductPriceList.' + index + '.rentTerm'">
                                  <el-select v-model="item.rentTerm" @keyup.enter.native="submitBtn('form_base')"
                                             placeholder="请选择产品租期" clearable style="width:100%;">
                                    <el-option v-if="monthData.length !== 0"
                                               v-for="list in monthData" :key="list.dictValue"
                                               :label="list.dictLabel" :value="list.dictValue"></el-option>
                                  </el-select>
                                </el-form-item>
                                <div v-else>
                                    <span v-for="(item, index) in monthData" :key="index">
                                      {{item.dictLabel}}
                                    </span>
                                </div>
                              </div>
                            </div>
                            <div class="detail-selects-item">
                              <div class="detail-selects-list-input">
                                <el-form-item v-if="isEditForm" :rules="rulesForm.oneRentPrice" :prop="'rentProductPriceList.' +index + '.oneRentPrice'"  :ref="'rentProductPriceList.' + index + '.oneRentPrice'">
                                  <el-input v-model.trim="item.oneRentPrice"
                                            type="number"
                                            @change="changeOnePrice(item, index)"
                                            oninput="if(value.length>9)value=value.slice(0,9)"
                                            onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                                            placeholder="" clearable style="width:100%;"
                                            @keyup.enter.native="submitBtn">
                                  </el-input>
                                </el-form-item>
                                <span v-else>{{item.oneRentPrice}}</span>
                              </div>
                            </div>
                            <div class="detail-selects-item">
                              <div class="detail-selects-list-input">
                                <el-form-item v-if="isEditForm" :rules="rulesForm.subsidyRentPrice" :prop="'rentProductPriceList.' +index + '.subsidyRentPrice'"  :ref="'rentProductPriceList.' + index + '.subsidyRentPrice'">
                                  <el-input v-model.trim="item.subsidyRentPrice"
                                            placeholder="" clearable style="width:100%;"
                                            type="number"
                                            oninput="if(value.length>9)value=value.slice(0,9)"
                                            onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"
                                            @keyup.enter.native="submitBtn">
                                  </el-input>
                                </el-form-item>
                                <span v-else>{{item.subsidyRentPrice}}</span>
                              </div>
                            </div>
                            <div class="detail-selects-item">
                              <div class="detail-selects-list-input">
                                <el-form-item v-if="isEditForm" :rules="rulesForm.bondAdvisePrice" :prop="'rentProductPriceList.' +index + '.bondAdvisePrice'"  :ref="'rentProductPriceList.' + index + '.bondAdvisePrice'">
                                  <el-input v-model.trim="item.bondAdvisePrice"
                                            placeholder="" clearable style="width:100%;"
                                            type="number"
                                            oninput="if(value.length>9)value=value.slice(0,9)"
                                            onKeyPress="if (event.keyCode!=46 && event.keyCode!=45 && event.keyCode<48 || event.keyCode>57) event.returnValue=false"subsidyRentPrice
                                            @keyup.enter.native="submitBtn">
                                  </el-input>
                                </el-form-item>
                                <span v-else>{{item.bondAdvisePrice}}</span>
                              </div>
                            </div>
<!--                            <div class="detail-selects-item" style="width: 12%; color: #1890ff;">-->
<!--                              <div class="detail-selects-list-input">-->
<!--                                <span style="cursor: pointer" @click="delPrice(index)">删除</span>-->
<!--                              </div>-->
<!--                            </div>-->
                          </div>
<!--                          <div class="add-price">-->
<!--                            <span @click="addTableRow">添加价格</span>-->
<!--                          </div>-->
                        </div>

                      </div>

                    </el-form-item>

                  </el-col>
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
  import _ from 'lodash';
  import {
    allSelectdictionaryData
  } from '@/api/common';
  import {
    getEditAuthority
  } from '@/api/user';
  import {adaptiveGrid_max, adaptiveGrid_plus} from '@/common/index';
  import {closeSelectedTag} from "@/utils/rooterJump";
  import {validateForms, scrollToTop} from '@/utils/index';
  // my
  import {getProductList, getSupplier, addProduct, lookDetail, editDetail} from "@/api/assistiveDevices/assistSupplier";
  import Uploadpics from "@/components/Uploadpics";
  export default {
    components: {
      Uploadpics
    },
    data() {
      return {
        isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
        modelType: '',//查看：look  编辑：edit  新增：add
        activeTabs: 'base',
        activeCollapse: ['baseItem_1','baseItem_2'],
        adaptiveGrid: adaptiveGrid_max,
        adaptiveGrid_plus: adaptiveGrid_plus,
        editAuthority: false,

        form: {
          ctyIds: [], // 被选中的产品列表的ID
          ctyCode: '',
          productCode: '', // 产品编号
          productName: '', // 产品名称及型号
          supplierId: '', // 供应商ID
          supplierName: '', // 查看时供应商名称
          ctyNameLevel: "", // 查看时产品类别名称
          imageInfoVos: [], //照片合集
          rentProductPriceList: [{
            bondAdvisePrice: '',
            id: "",
            oneRentPrice: '',
            productId: "",
            rentTerm: '',
            subsidyRentPrice: '',
            edit: true,
            rowIndex: Math.random() * 100000000000000000 + ''
          }] // 价格
        },
        rulesForm: {
          ctyIds: [
            {required: true, trigger: 'change', message: '产品类别不能为空，请选择'},
          ],
          productCode: [
            {required: true, trigger: 'blur', message: '产品编号不能为空，请输入'},
          ],
          productName: [
            {required: true, trigger: 'blur', message: '产品名称及型号不能为空，请输入'},
          ],
          supplierId: [
            {required: true, trigger: 'change', message: '供应商不能为空，请选择'},
          ],
          rentTerm: [
            {required: true, trigger: 'change', message: '租期不能为空，请选择'},
          ],
          oneRentPrice: [
            {required: true, trigger: 'blur', message: '单次租赁价不能为空，请输入'},
          ],
          subsidyRentPrice: [
            {required: true, trigger: 'blur', message: '补贴租赁价不能为空，请输入'},
          ],
          bondAdvisePrice: [
            {required: true, trigger: 'blur', message: '保证金建议价不能为空，请输入'},
          ],
        },
        // my
        defaultProps: {
          label: "ctyName",
          value: "ctyCode"
        }, // 自定义级联属性
        ctyIdList: [], // 产品级联数据
        imageInfoVosLookUrl:[],//查看时的图片路径
        idEdit: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
        eduLevelOptions: [], // 供应商列表
        monthData: []
      }
    },

    mounted() {
      this.modelType = this.$route.query.modelType;
      let _consultantId_ = this.$route.params.id || '';

      if (this.modelType === 'look') {
        //查看时，不要调用户信息接口，直接将表格行数据带来现实
        this.isEditForm = false;
        this.getData(_consultantId_)
        /*编辑按钮的权限控制*/
        getEditAuthority(this.$route.query.editAuthority).then(response => {
          response.forEach((item) => {
            if (item.menuName === '编辑') {
              this.editAuthority = item.visible === '0' ? true : false;
            }
          });
        }).catch(() => {
          this.$message.error('获取编辑按钮的权限控制失败！');
        });
      }
      else {
        this.isEditForm = true;
        this.getData(_consultantId_)
      }
      // my
      this.getProductLists()
      this.getSuppliers()
      this.selectData()
    },

    methods: {
      changeOnePrice(val,index) {
        this.form.rentProductPriceList[index].subsidyRentPrice = this.form.rentProductPriceList[index].oneRentPrice/2;
        this.form.rentProductPriceList[index].bondAdvisePrice = this.form.rentProductPriceList[index].oneRentPrice
      },
      // 字典
      // 数据字典
      selectData() {
        let dicKey = 'lease_category';
        allSelectdictionaryData(dicKey).then(response =>{
          if (response.code === 0) {
            for (let k in response.data) {
              switch (k) {
                //月份
                case 'lease_category':
                  this.monthData = response.data[k];
                  break;
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

        let rowData = {
          bondAdvisePrice: '',
          id: "",
          oneRentPrice: '',
          productId: "",
          rentTerm: '',
          subsidyRentPrice: '',
          edit: true,
          rowIndex: Math.random() * 100000000000000000 + ''
        };
        this.form.rentProductPriceList.push(rowData);
      },
      // 获取供应商列表
      getSuppliers() {
        getSupplier().then(res =>{
          if (res.code === 0) {
            this.eduLevelOptions = res.data;
          }
        })
      },
      // 获取图片数据
      getPicList(val) {
        this.form.imageInfoVos = val
      },
      // 获取产品下拉列表
      getProductLists() {
        getProductList().then(res =>{
          if (res) {
            this.ctyIdList = res
          }
        })
      },

      async getData(id) {
        await this.getProductLists();
        await this.getSuppliers();
        if (this.modelType === 'edit') {
          await this.editGetData(id);
        } else if (this.modelType === 'look') {
          await this.editGetData(id);
        }
      },
      // 编辑获取数据
      editGetData(id) {
        return new Promise((resolve, reject) => {
          lookDetail(id).then(response => {
            if (response.code === 0) {
              if (response.data) {
                this.form = response.data;
                this.form.ctyIds = this.form.ctyCodeLevel.split(",")
                this.form.ctyIds.forEach((item, i) =>{
                  this.form.ctyIds[i] = Number(item)
                })
                this.form.imageInfoVos.forEach((item)=>{
                  this.imageInfoVosLookUrl.push(`${process.env.VUE_APP_API_IMGURL}${item.imgUrl}`);
                });
                this.idEdit = false;
                if (this.form.rentProductPriceList.length === 0) {
                  let rowData = {
                    bondAdvisePrice: '',
                    id: "",
                    oneRentPrice: '',
                    productId: "",
                    rentTerm: '',
                    subsidyRentPrice: '',
                    edit: true,
                    rowIndex: Math.random() * 100000000000000000 + ''
                  };
                  this.form.rentProductPriceList.push(rowData)
                }
              }
            } else {
              this.$message.error(response.msg);
            }
          }).catch(() => {
            this.$message.error("获取顾问员失败！");
          });
        })
      },
      //确定按钮-提交form表单
      submitBtn() {
        let formRefs = ['form_base'].map(key => this.$refs[key]);
        if (this.form.rentProductPriceList.length === 0) {
          this.$message({
            type: 'error',
            message: "必须添加一条价格信息!"
          });
          return false
        }
        validateForms(formRefs).then(() => {
          let _form = _.cloneDeep(this.form);
          _form.ctyCode = _form.ctyIds[_form.ctyIds.length-1]
          //去除不需提交的字段
          // delete _form.eduLevelName;
          // delete _form.orgName;
          // delete _form.workTypeName
          //新增
          if (this.modelType === 'add') {
            addProduct(_form).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: "新增辅具产品保存成功!"
                });
                //关闭页面，跳转到列表
                this.closeDetailsPage();
              }
              else {
                this.$message.error("新增辅具产品操作失败，失败原因是：" + response.msg);
              }
            }).catch(() => {
              this.$message.error("新增辅具产品操作失败!");
            });
          }
          // 编辑
          else if (this.modelType === 'edit' ) {
            editDetail(_form).then(response => {
              if (response.code === 0) {
                this.$message({
                  type: 'success',
                  message: "编辑辅具产品保存成功!"
                });
                //关闭页面，跳转到列表
                this.closeDetailsPage();
              }
              else {
                this.$message.error("编辑辅具产品操作失败，失败原因是：" + response.msg);
              }
            }).catch(() => {
              this.$message.error("编辑辅具产品操作失败!");
            });
          }
        }).catch(objectList => {
          scrollToTop();
        });
      },
      //取消按钮
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
          this.closeDetailsPage();
        }).catch(() => {
        });
      },
      //返回按钮，关闭详情页
      closeDetailsPage() {
        //关闭页面
        closeSelectedTag(this, this.$route);
        this.$router.push('/assistivePlatform/assistSupplierConfig/productAssist')
      },
      //查看详情页面，点击编辑按钮
      editContent() {
        this.$router.push({
          path: `/productAssist/details/${this.$route.params.id}`,
          query: {'modelType': 'edit', '_title': `编辑租赁产品`}
        });
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
