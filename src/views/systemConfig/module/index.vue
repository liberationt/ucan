<!-- index.vue -->

<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item  label="模块状态">
					<el-select v-model="form.visible" placeholder="请选择模块状态" clearable @keyup.enter.native="onSubmit">
						<el-option label="启用" name="0" value="0"></el-option>
						<el-option label="禁用" name="1" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item  label="名称查询">
					<el-input v-model.trim="form.menuName" placeholder="请输入模块名称查询" clearable @keyup.enter.native="onSubmit"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn"  v-has="{class: '查询'}">查询
					</el-button>
					<el-button type="warning" @click="onReset"  class="base-btn"  v-has="{class: '查询'}">重置
					</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer rule-dailog">
			<el-container>
				<el-header>
					<el-button type="primary" @click="addTableRow()" class="base-btn" v-has="{class: '新增'}">新增</el-button>
					<!--<el-button type="danger" size="small" :disabled="removeDisabled" @click="removeTableRow()" icon="el-icon-minus">删除</el-button>-->
				</el-header>
				<el-main>
					<el-table
							ref="multipleTable"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
              label="操作"
              border
							fit
							row-key="id"
              :expand-row-keys="checkedKeys"
              @expand-change="getIds"
              :tree-props="{children: 'children', hasChildren: 'hasChildrens'}"
					>
						<!--@filter-change="handleFilterChange"-->

						<el-table-column type="selection" width="50" fixed="left"></el-table-column>

						<el-table-column label="模块名称" prop="label"
						                 header-align="left" min-width="150"></el-table-column>

						<el-table-column label="模块类型" prop="dictValue"
						                 header-align="left" min-width="120"></el-table-column>

						<el-table-column label="模块标识" prop="perms"
						                 header-align="left" min-width="150"></el-table-column>

						<el-table-column label="模块路径" prop="url"
						                 header-align="left" min-width="150"></el-table-column>

						<el-table-column label="模块排序" prop="orderNum"
						                 header-align="left" min-width="120"></el-table-column>

						<el-table-column label="模块状态" prop="visible" header-align="left" min-width="150">
							<template slot-scope="scope">
								<el-switch
										class="switchStyle"
										v-model="scope.row.visible"
										active-text="启用"
										inactive-text="禁用"
										active-value="0"
										inactive-value="1"
										disabled
										@click.native="changeSwitch(scope.row)">
								</el-switch>
							</template>
						</el-table-column>

						<el-table-column label="创建时间" prop="createTime"
						                 header-align="left" min-width="150"></el-table-column>

						<!--fixed="right"-->
						<el-table-column
								label="操作"
                min-width="320"
								header-align="center"
                fixed="right"
								align="center"
								class="firstBtnClass">
							<template slot-scope="{row,$index}">
                <span @click="row.visible === '0' ? handleAddDepartment($index, row) : noClick()" :style="{color:(row.visible === '0'? '' :'#999')}" class="table-btn"  v-has="{class: '新增'}" >
                  添加下级模块
                </span>
                <span @click="handleEdit($index, row)" v-has="{class: '编辑'}" class="table-btn">
                  编辑
                </span>
                <span @click="handleRemove($index, row)" v-has="{class: '删除'}" class="table-btn">
                  删除
                </span>
                <span @click="openRule($index, row)" v-has="{class: '数据规则'}" class="table-btn" v-if="row.menuType === 'C'">
                  数据规则
                </span>
								<!--<el-button type="primary" size="mini" round plain-->
								           <!--@click="handleAddDepartment($index, row)" :disabled="row.visible == 0 ? false : true">添加下级模块-->
								<!--</el-button>-->
								<!--<el-button type="primary" size="mini" round plain @click="handleEdit($index, row)" v-has="{class: '修改'}">编辑-->
								<!--</el-button>-->
								<!--<el-button type="danger" size="mini" round plain @click="handleRemove($index, row)" v-has="{class: '删除'}">删除-->
								<!--</el-button>-->
							</template>
						</el-table-column>
					</el-table>

					<myDialog @dialogHide="dialogHanderHide" :ajaxData="ajaxData"
					          @editTableRowSubmit="editTableRowSubmit" :isDisable="isDisable" :isClose="isClose"
					          :templateParameter="templateParameter"></myDialog>


        </el-main>
        <el-dialog
          title="数据规则"
          :visible.sync="ruleVisible"
          width="30%">
          <div>
            <el-form :model="formRule" ref="form_contact">
              <el-table :data="formRule.contact" style="width: 100%">
                <el-table-column type="index" label="序号" width="80" fixed="left"
                                 align="center"></el-table-column>
                <el-table-column prop="ruleName" label="规则名称" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'contact.' + scope.$index + '.ruleName'"
                      :rules="rulesForm.ruleName"
                      :ref="'contact.' + scope.$index + '.ruleName'">
                      <el-input placeholder="请输入规则名称" v-model.trim="scope.row.ruleName"
                                clearable @keyup.enter.native="editContent" maxLength="20"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="ruleField" label="规则字段" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'contact.' + scope.$index + '.ruleField'"
                      :rules="rulesForm.ruleField"
                      :ref="'contact.' + scope.$index + '.ruleField'">
                      <el-input placeholder="请输入规则字段" v-model.trim="scope.row.ruleField"
                                clearable @keyup.enter.native="editContent" maxLength="50"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="ruleWhere" label="规则条件" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'contact.' + scope.$index + '.ruleWhere'"
                      :rules="rulesForm.ruleWhere"
                      :ref="'contact.' + scope.$index + '.ruleWhere'">
                      <el-select  v-model="scope.row.ruleWhere"
                                  clearable style="width:100%;" placeholder="请选择规则条件" @keyup.enter.native="editContent">
                        <el-option v-if="ruleWhere.length !== 0"
                                   v-for="(item, index) in ruleWhere" :key="item.dictValue"
                                   :label="item.dictLabel" :value="item.dictValue"></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="ruleValue" label="规则值" min-width="150" align="center">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'contact.' + scope.$index + '.ruleValue'"
                      :rules="rulesForm.ruleValue"
                      :ref="'contact.' + scope.$index + '.ruleValue'">
                      <el-input placeholder="请输入规则值" v-model.trim="scope.row.ruleValue"
                                clearable @keyup.enter.native="editContent" maxLength="50"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="规则状态" min-width="150" align="center">
                  <template slot-scope="scope">
                    <div style="text-align: left;padding-left: 50px">
                      <el-switch
                        class="switchStyle"
                        v-model="scope.row.status"
                        active-text="启用"
                        inactive-text="禁用"
                        active-value="0"
                        inactive-value="1">
                      </el-switch>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="操作" min-width="120" align="center">
                  <template slot-scope="scope">
										<span class="table-btn" style="cursor: pointer;"
                          @click="tableOperation(scope.row,scope.$index)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="addBtnDiv">
                <span @click="addRule()">添加规则</span>
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="ruleVisible = false">取 消</el-button>
              <el-button type="primary" @click="addRules()">确 定</el-button>
            </span>
        </el-dialog>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	/*import Pagination from '@/components/Pagination';*/
	import myDialog from "./components/dialog";
  import { expandAll } from '@/utils'
  import {allSelectdictionaryData} from '@/api/facilitiesConfig/communityFacilities'
  import {
    validateForms
  } from "@/utils/index";
	import {
		getTableData,
		removeTableRowData,
		editTableRowData,
    isEnable,
    getRule,
    addRule,
    deleteRule
	} from "@/api/systemConfig/module";

	export default {
		components: {myDialog},
		data() {
			return {
				//表单值
				form: {
					visible: '',//状态
					menuName: '',//关键字查询-名称
				},
				tableData: [],
				multipleSelection: [],//多选的行数据
				removeDisabled: true,//批量删除按钮的disabled
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				checkedKeys: [],//表格默认展开的节点
				//模板传参
				templateParameter: {
					isShow: false,//弹框显示隐藏
					tableRowValue: '',//表格当前行数据
					modelType: '',//弹框的类型，可编辑或可新增
					loading: false,//弹框提交按钮加载动画
					childRow: false,//是否是‘添加子行’打开弹框
				},
        isDisable: true,
        isClose: false,
        ruleVisible: false,
        formRule: {
          contact: [], // 规则集合
        },
        rulesForm: {
          ruleName: [
            {required: true, trigger: 'blur', message: '规则名称不能为空！'},
          ],
          ruleField: [
            {required: true, trigger: 'blur', message: '规则字段不能为空！'},
          ],
          ruleWhere: [
            {required: true, trigger: 'change', message: '规则条件不能为空！'},
          ],
          ruleValue: [
            {required: true, trigger: 'blur', message: '规则值不能为空！'},
          ]
        },
        ruleWhere: [],
        menuId: ''
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
      this.onReset();
      this.selectData();
		},
		methods: {
      // 规则字典
      selectData() {
        let dicKey = 'rule_condition'
        allSelectdictionaryData(dicKey).then(response =>{
          if (response.code === 0) {
            for (let k in response.data) {
              switch (k) {
                //人口分类
                case 'rule_condition':
                  this.ruleWhere = response.data[k];
                  break;
              }
            }
          }
        })
      },
		  // 新增规则
      addRules() {
        if (this.formRule.contact.length === 0) {
          this.$message.warning('请添加规则')
        } else {
          let formRefs = ['form_contact'].map(key => this.$refs[key]);
          validateForms(formRefs).then(() => {
            const data = {}
            data.sysMenuRules = this.formRule.contact
            addRule(data).then(res =>{
              if(res.code === 0) {
                this.ruleVisible = false
                this.$message.success('保存规则成功！')
              }
            })
          })
        }
      },
		  // 获取规则
      getRules(id) {
        getRule({menuId: id}).then(res =>{
          this.formRule.contact = res.rows
        })
      },
		  // 删除
      tableOperation(row, index) {
        console.log(row.id);
        this.$confirm('是否确认删除该规则?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.id) {
            deleteRule(row.id).then(res =>{
              if (res.code === 0) {
                this.formRule.contact.splice(index, 1);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
          } else {
            this.formRule.contact.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
		  // 添加一条规则
      addRule() {
        let rowData = {
          ruleName: "",
          ruleField: "",
          ruleWhere: '',
          ruleValue: "",
          status: "0",
          menuId: this.menuId
        };
        this.formRule.contact.push(rowData);
        console.log(this.formRule.contact);
      },
		  // 打开规则
      openRule($index, row) {
        this.ruleVisible = true
        this.menuId = row.id
        this.getRules(row.id)
      },
		  ///////
		  // 树型表格展开关闭时获取ids
      getIds(row, expanded) {
        if (expanded === true) {
          this.checkedKeys.push(row.id)
        } else {
          for (let i = 0; i < this.checkedKeys.length; i++) {
            if (this.checkedKeys[i] === row.id) {
              this.checkedKeys.splice(i, 1)
              break
            }
          }
        }
      },
			//添加行-打开弹框
			addTableRow() {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = {};//行数据格式
				this.templateParameter.modelType = 'add';//将弹框设为新增状态
				this.templateParameter.childRow = false;//是否是‘添加子行’打开弹框
			},
			//删除当前行
			handleRemove($index, row) {
				this.$confirm('确定要删除【' + row.label + '】模块吗? 模块一旦被删除，相关功能将无法显示和操作。', '删除模块', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					removeTableRowData(row.id).then(response => {
						if (response.code === 0) {
							this.$message({
								type: 'success',
								message: '删除成功'
							});
							this.ajaxData();
						}
						else {
							this.$message.error(response.msg);
						}
					}).catch(error => {
						reject(error);
						this.$message.error('操作失败！');
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作！'
					});
				});
			},
			//编辑-打开弹框
			handleEdit($index, row) {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = row;//将选中的行数据传到弹框
				this.templateParameter.modelType = 'edit';//将弹框设为编辑状态
				this.templateParameter.childRow = false;//是否是‘添加子行’打开弹框
			},
			//编辑-提交数据
			editTableRowSubmit(params) {
				if (this.templateParameter.tableRowValue !== params) {
          if (params.visible === '1') {
            this.isban(params.menuId, params)
          } else {
            this.isEditTableRowData(params)
          }
				}
				else {
					this.$message.error('操作失败！');
				}
			},
			dialogHanderHide() {
				this.templateParameter.isShow = false
			},
			//查询所有数据
			ajaxData(data) {
				getTableData(data).then(response => {
					this.tableData = response || [];
					// this.$nextTick(() => {
          //   expandAll(this.$el.getElementsByClassName('el-table__expand-icon'))
          // })
					this.loadingReset = false;
					this.loadingSubmit = false;
				}).catch(() => {
					setTimeout(() => {
						this.loadingReset = false;
						this.loadingSubmit = false;
					}, 1000);
				});
			},
			//查询筛选数据
			filterAjaxData(data) {
				this.ajaxData(data)
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;

				let parmas = {
					visible: this.form.visible,
					menuName: this.form.menuName.trim(),
				}
				if (parmas.visible === '' && parmas.menuName === '') {
					this.ajaxData();
				}
				else {
					this.filterAjaxData(parmas);
				}
			},
			//表单重置按钮
			onReset() {
				this.loadingReset = true;
				//表单值
				this.form = {
					visible: '',//状态
					menuName: '',//关键字查询-名称
				}
				this.ajaxData()
			},
			//添加下级部门
			handleAddDepartment($index, row) {
				this.templateParameter.isShow = true //打开弹框
				this.templateParameter.tableRowValue = row //行数据格式
				this.templateParameter.modelType = 'addSub' //将弹框设为新增状态
				this.templateParameter.childRow = true //是否是‘添加子行’打开弹框
			},
      // 禁用状态不能点击
      noClick() {
        this.$message.warning('此模块处于禁用状态，不能添加子模块！')
      },
      // 判断是否可以禁用
      isban(id, params) {
        isEnable(id).then(res =>{
            if (res === true) {
              this.isEditTableRowData(params)
            } else {
              this.$message.warning('有子模块未禁用，请先禁用子模块！')
            }
        }).catch(error =>{
          this.$message.error('操作失败！');
        })
      },
      // 修改模块接口
      isEditTableRowData(params) {
        editTableRowData(params).then(response => {
          this.isDisable = !this.isDisable
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            });
            this.ajaxData();
            this.isClose = !this.isClose
          }
          else {
            this.$message.error(response.msg)
            this.templateParameter.loading = false
          }
        }).catch(error => {
          reject(error);
          this.$message.error('操作失败！');
          this.templateParameter.loading = false;
        })
      },
			//switch 开关事件监听
			changeSwitch(e) {
				let _tit = '';
				if (e.visible === '0') {
					_tit = '禁用';
				}
				else {
					_tit = '启用';
				}
				const STATUS = e.visible;
				this.$confirm('确定要' + _tit + '【' + e.label + '】模块吗?', _tit + '模块', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
          let visible = null;
					if (STATUS === '0') {
						visible = 1;
					}
					else {
						visible = 0;
					}
					let params = {
						menuId: e.id,//模块id
						visible: visible,//模块状态
					};
					if (_tit === '禁用') {
            this.isban(params.menuId, params)
          } else {
					  this.isEditTableRowData(params)
          }
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作！'
					});
					this.form.visible = STATUS;
				});
			},
		}
	}
</script>

<style lang="scss">
	@import "~@/styles/form.css";
	.disableBtn{border: none;
		background-color: transparent;}
	.disableBtn[disabled]{
		cursor: no-drop;
	}
  .rule-dailog {
    .el-dialog {
      min-width: 1200px !important;
    }
    .addBtnDiv {
      border: 1px dashed #E1E1E1;
      border-top: none;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
</style>
<style scoped>
  .table-btn {
    padding: 0 5px !important;
  }
</style>
