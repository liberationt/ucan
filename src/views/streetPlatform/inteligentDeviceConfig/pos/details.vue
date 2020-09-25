<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip"></i>基本信息
                  </span>
                </div>
              </template>
              <el-form ref="form_base" key="form_base" :model="form"
                :rules="isEditForm?rulesForm:null" label-width="120px">
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'终端编号':'终端编号：'" prop="eqCode">
                      <el-input v-if="isEditForm" v-model.trim="form.eqCode"
                        placeholder="请输入终端编号" clearable style="width:100%;" @keyup.enter.native="submitBtn">
											</el-input>
                      <span v-else>{{form.eqCode}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'SIM卡号':'SIM卡号：'" prop="simCode">
                      <el-input v-if="isEditForm" v-model.trim="form.simCode"
                        placeholder="请输入SIM卡号" clearable style="width:100%;" @keyup.enter.native="submitBtn">
											</el-input>
                      <span v-else>{{form.simCode}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'生产厂家':'生产厂家：'" prop="madeFactory">
                      <el-select v-if="isEditForm" v-model="form.madeFactory"
                        placeholder="请选择生产厂家" clearable style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in madeFactoryOptions"
                          :key="item.dictValue" :label="item.dictLabel"
                          :value="item.dictValue"></el-option>
											</el-select>
                      <span v-else>{{form.madeFactoryName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'所属机构':'所属机构：'" prop="orgId">
                      <el-select v-if="isEditForm" v-model="form.orgId"
                        filterable remote reserve-keyword @change="handleOrgChange"
                        :remote-method="searchOrg" :loading="orgLoading"
                        placeholder="请选择所属机构" clearable style="width:100%;" @keyup.enter.native="submitBtn">
                        <el-option v-for="item in orgOptions"
                          :key="item.dictValue" :label="item.dictLabel"
                          :value="item.dictValue"></el-option>
											</el-select>
                      <span v-else>{{form.orgName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'详细地址':'详细地址：'" prop="orgAddr">
                      <el-input v-if="isEditForm" v-model.trim="form.orgAddr"
                        disabled placeholder="系统自动填充" @keyup.enter.native="submitBtn"></el-input>
                      <span v-else>{{form.orgAddr}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
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
        </el-tab-pane>
        <el-tab-pane v-if="modelType == 'look'" label="刷卡记录" name="record">
          <el-container>
            <el-header>
              <div class="total-nav">
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
                <el-table-column label="时间" prop="buidTime"></el-table-column>
                <el-table-column label="姓名" prop="fullName"></el-table-column>
                <el-table-column label="身份证" prop="idCard" min-width="200"></el-table-column>
                <el-table-column label="敬老卡编号" prop="ecCode"></el-table-column>
                <el-table-column label="地点" prop="orgAddr"></el-table-column>
                <el-table-column label="终端编号" prop="eqCode"></el-table-column>
              </el-table>
              <pagination
                  v-show="total>0"
                  :total="total"
                  :page.sync="recordForm.pageNum"
                  :limit.sync="recordForm.pageSize"
                  @pagination="getRecordData(recordForm)"
              />
            </el-main>
          </el-container>
          <el-footer>
            <div>
              <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
            </div>
          </el-footer>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  import _ from 'lodash';
  import {
    getPOS,
    addPOS,
    editPOS,
    searchOrgByName,
    uniqueEqCode,
    uniqueSimCode,
  } from '@/api/inteligentDeviceConfig/pos';
  import {
    allSelectdictionaryData
  } from '@/api/common';
  import {
    getEditAuthority
  } from '@/api/user';
  import {adaptiveGrid_max, adaptiveGrid_plus} from '@/common/index';
  import {closeSelectedTag} from "@/utils/rooterJump";
  import {recordSearch} from '@/api/inteligentDeviceConfig/record';
	import Pagination from "@/components/Pagination";
  import {pageModel} from "@/common";
  import {validateForms, scrollToTop} from '@/utils/index';

  export default {
    components: {
      Pagination
    },
    data() {
      return {
        isEditForm: true,//页面表单是否可编辑操作。查看时：false,编辑-新增时：true
        modelType: '',//查看：look  编辑：edit  新增：add
        activeTabs: 'base',
        activeCollapse: ['baseItem_1'],
        adaptiveGrid: adaptiveGrid_max,
        adaptiveGrid_plus: adaptiveGrid_plus,
        editAuthority: false,
        orgLoading: false, //搜索机构loading

        madeFactoryOptions: [],//生产厂家
        orgOptions: [],//所属机构

        form: {
          eqCode: '', //终端编号
          simCode: '', //SIM卡号
          madeFactory: '', //生产厂家
          madeFactoryName: '',
          orgId: '', //所属机构
          orgAddr: '', //机构地址
          orgName: '', //机构名称
        },
        rulesForm: {
          eqCode: [
            {required: true, trigger: 'blur', message: '终端编号不能为空，请输入'},
            {max: 50, trigger: 'blur', message: '长度不能超过50，请输入'},
            {trigger: 'blur', validator: (rule, value, callback) => {
              let params = {
                eqCode: value,
                id: this.form.id || ''
              };
              uniqueEqCode(params).then(response => {
                if (response.code === 0) {
                  callback();
                } else {
                  callback(response.msg);
                }
              }).catch(() => {
                callback(new Error('终端编号唯一校验接口调用失败！'));
              });
            }}
          ],
          simCode: [
            {required: true, trigger: 'blur', message: 'SIM卡号不能为空，请输入'},
            {max: 50, trigger: 'blur', message: '长度不能超过50，请输入'},
            {trigger: 'blur', validator: (rule, value, callback) => {
              let params = {
                simCode: value,
                id: this.form.id || ''
              };
              uniqueSimCode(params).then(response => {
                if (response.code === 0) {
                  callback();
                } else {
                  callback(response.msg);
                }
              }).catch((error) => {
                callback(new Error('终端编号唯一校验接口调用失败！'));
              });
            }}
          ],
          madeFactory: [
            {required: true, trigger: 'change', message: '请选择生产厂家'}
          ],
          orgId: [
            {required: true, trigger: 'change', message: '请选择所属机构'}
          ]
        },

        // record 查询表单
				recordForm: {
          eqCode: '', // 刷卡机设备编号
					pageNum: pageModel.pageNum, // 分页页数
					pageSize: pageModel.pageSize // 分页数量
				},
				// <-- table -->
				tableData: [], // table表格数据
				multipleSelection: [], //多选的行数据
				total: 0, // 总共多少数量
      }
    },

    mounted() {
      this.modelType = this.$route.query.modelType;
      let _posId_ = this.$route.params.id || '';

      if (this.modelType === 'look') {
				//查看时，不要调用户信息接口，直接将表格行数据带来现实
				this.isEditForm = false;

				//请求当前用户信息
				getPOS(_posId_).then(response => {
					if (response.code === 0) {
            if (response.data) {
              this.form = response.data;
              // 获取eqCode，请求刷卡记录
              this.recordForm.eqCode = this.form.eqCode;
              this.getRecordData(this.recordForm);
            }
          } else {
            this.$message.error(response.msg);
          }
				}).catch(() => {
					this.$message.error("获取POS机失败！");
        });

        /*编辑按钮的权限控制*/
        getEditAuthority(this.$route.query.menuId).then(response => {
          response.forEach((item)=>{
            if(item.menuName === '编辑'){
              this.editAuthority = item.visible === '0'?true:false;
            }
          });
        }).catch(() => {
          this.$message.error('获取编辑按钮的权限控制失败！');
        });
			}
			else {
				this.isEditForm = true;
				this.getData(_posId_)
      }
    },

    methods: {
      async getData(id) {
				await this.getSelect();
				if (this.modelType === 'edit') {
					await this.editGetData(id);
				} else if (this.modelType === 'add') {

				}
      },
      // 编辑获取数据
			editGetData(id) {
				return new Promise((resolve, reject) => {
					//请求当前用户信息
					getPOS(id).then(response => {
            if (response.code === 0) {
              if (response.data) {
                this.form = response.data;
                this.setOrgOptions(this.form);
              }
            } else {
              this.$message.error(response.msg);
            }
					}).catch(() => {
						this.$message.error("获取POS机失败！");
					});
				})
      },
      // 获取下拉字典
			getSelect() {
        let dictKey = [
          'biz_made_factory',//生产厂家
        ].join(',');
				return new Promise((resolve, reject) => {
					allSelectdictionaryData(dictKey).then(response => {
            let dict = response.data
						for (let key in dict) {
							switch (key) {
								case 'biz_made_factory':
									this.madeFactoryOptions = dict[key];
									break;
							}
						}
						resolve()
					}).catch(() => {
						reject()
					});
				})
      },
      // 拼装机构选项
      setOrgOptions(data) {
        this.orgOptions = [
          {
            dictLabel: data.orgName,
            dictValue: data.orgId,
            addr: data.orgAddr,
            orgName: data.orgName
          }
        ]
      },
      // 搜索所选机构
      searchOrg(query) {
        if (query !== '') {
          this.orgLoading = true;
          searchOrgByName(query).then(response => {
            this.orgLoading = false;
            this.orgOptions = response.data.map(item => {
              return {
                dictLabel: item.orgName,
                dictValue: item.orgId,
                addr: item.addr, // 用于自动填充详细地址
                orgName: item.orgName
              }
            });
          }).catch(() => {
            this.orgLoading = false;
            this.$message.error('搜索所属机构失败！');
          })
        } else {
          this.orgOptions = [];
        }
      },
      handleOrgChange(value) {
        let org = this.orgOptions.find(i => i.dictValue === value);
        if (org) {
          this.form.orgAddr = org.addr;
          this.form.orgName = org.orgName;
        } else {
          this.form.orgAddr = '';
          this.form.orgName = '';
        }
      },
      //确定按钮-提交form表单
			submitBtn() {
        let formRefs = ['form_base'].map(key => this.$refs[key]);
        validateForms(formRefs).then(() => {
            let _form = _.cloneDeep(this.form);
            //去除不需提交的字段
            delete _form.madeFactoryName;
						//新增
						if (this.modelType === 'add' && !this.form.id) {
							addPOS(_form).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "新增POS机保存成功!"
									});
									//关闭页面，跳转到列表
									this.closeDetailsPage();
								}
								else {
									this.$message.error("新增POS机操作失败，失败原因是：" + response.msg);
								}
							}).catch(() => {
								this.$message.error("新增POS机操作失败!");
							});
						}
						//编辑
						else if (this.modelType === 'edit' || (this.modelType === 'add' && this.form.id)) {
							editPOS(_form).then(response => {
								if (response.code === 0) {
									this.$message({
										type: 'success',
										message: "编辑POS机保存成功!"
									});
									//关闭页面，跳转到列表
									this.closeDetailsPage();
								}
								else {
									this.$message.error("编辑POS机操作失败，失败原因是：" + response.msg);
								}
							}).catch(() => {
								this.$message.error("编辑POS机操作失败!");
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
        }).catch(() => {});
      },
			//返回按钮，关闭详情页
			closeDetailsPage() {
				//关闭页面
				closeSelectedTag(this, this.$route);
				this.$router.push('/streetPlatform/inteligentDeviceConfig/pos')
			},
			//查看详情页面，点击编辑按钮
			editContent() {
				this.$router.push({
					path: `/pos/details/${this.$route.params.id}`,
					query: {'modelType': 'edit', '_title': `编辑${this.form.eqCode}`}
				});
      },
      // 重置所有表单
      resetForm() {
        this.form.id = '';
        this.$refs.form_base.resetFields();
      },

      // === record table ===
      // 获取表格数据
			getRecordData(recordForm) {
				recordSearch(recordForm).then(res => {
					if (res.code == 0) {
            if (res.data) {
              this.tableData = res.data.list;
              this.total = res.data.total;
            }
					} else {
            this.$message.error(res.message);
          }
				}).catch(() => {
          this.$message.error('获取刷卡记录失败！')
        })
			},
      // 双击行去详情页面
			toDetail(row) {
				// TODO
			},
			// 多选的行数据
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
    }
  }
</script>

<style scoped>
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
</style>
