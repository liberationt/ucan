 <!-- index.vue -->

<template>
	<el-container>
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="机构类型">
					<el-select v-model="form.orgType" placeholder="请选择机构类型" clearable  @keyup.enter.native="onSubmit">
            <el-option v-for="item in org_typeOptions" :key="item.dictValue" :label="item.dictLabel"
                       :value="item.dictValue"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" class="base-btn" v-has="{class: '查询'}">查询</el-button>
					<el-button type="warning" @click="onReset" class="base-btn" v-has="{class: '查询'}">重置</el-button>
				</el-form-item>
			</el-form>
		</el-header>
		<el-main class="tableContainer">
			<el-container>
				<el-header>
<!--					<el-button type="primary" class="base-btn" @click="addTableRow()">新增</el-button>-->
				</el-header>
				<el-main>
					<el-table
							ref="multipleTable"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							fit
							row-key="id"
							:expand-row-keys="checkedKeys"
							@expand-change="getIds"
							:tree-props="{children: 'children', hasChildren: 'hasChildrens'}"
					>

						<el-table-column label="元素类型" prop="elementTypeDictName" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column label="第几页" prop="pageNumberDictName" min-width="100"
						                 header-align="left"></el-table-column>

            <el-table-column label="下级是否全部为复选框" prop="checkbox" min-width="180" header-align="left">
              <template slot-scope="scope">
                <el-switch
                    v-if="scope.row.checkbox !== true"
                    class="switchStyle"
                    v-model="scope.row.checkbox"
                    active-text="是"
                    inactive-text="否"
                    active-value="true"
                    inactive-value="false"
                    disabled>
                </el-switch>
              </template>
            </el-table-column>

            <el-table-column label="服务项目key" prop="serviceKey" min-width="180"
                             header-align="left"></el-table-column>

            <el-table-column label="服务项目value" prop="serviceValue" min-width="150"
                             header-align="left"></el-table-column>

            <el-table-column label="服务说明" prop="serviceDesc" min-width="150"
                             header-align="left"></el-table-column>

            <el-table-column label="显示顺序" prop="orderNum" min-width="100"
                             header-align="left"></el-table-column>

						<el-table-column
								label="操作"
								fixed="right"
								min-width="280"
								header-align="center"
								align="center"
								class="firstBtnClass">
							<template slot-scope="{row,$index}">
								<button @click="handleAddDepartment($index, row)"
								        v-if="row.isShow !== false"
                        class="table-btn disableBtn"
                        v-has="{class: '新增'}">添加下级服务</button>
								<span @click="handleEdit($index, row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
								<span @click="handleRemove($index, row)" class="table-btn" v-has="{class: '删除'}">删除</span>
							</template>
						</el-table-column>
					</el-table>

					<myDialog @checkArr="checkArr" @dialogHide="dialogHanderHide" @addTableRowSubmit="addTableRowSubmit"
					          @editTableRowSubmit="editTableRowSubmit"
					          :templateParameter="templateParameter"></myDialog>

				</el-main>
			</el-container>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from '@/components/Pagination';
	import myDialog from "./components/dialog";
	import {getServiceConfigList, modifyServiceConfig, addServiceConfig, deleteServiceConfig} from "@/api/systemConfig/serviceConfig";
	import {mapGetters} from 'vuex'
  // 导入获取字典接口
  import {allSelectdictionaryData} from '@/api/common';

	export default {
		components: {myDialog, Pagination},
		computed: {
			...mapGetters([
				'data',
			])
		},
		data() {
			return {
				//表单值
				form: {
          // 机构类型
					orgType: '',
				},
        // 机构类型
        org_typeOptions: [],
				tableData: [],
				loadingSubmit: false,//查询按钮加载动画
				loadingReset: false,//重置按钮加载动画
				//模板传参
				templateParameter: {
					isShow: false,//弹框显示隐藏
					tableRowValue: '',//表格当前行数据
					modelType: '',//弹框的类型，可编辑或可新增
					loading: false,//弹框提交按钮加载动画
					childRow: false,//是否是‘添加子行’打开弹框
				},
				checkedKeys: [],
				isOperate: true, // 是否禁用添加子菜单按钮
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			if (this.data.sysRoles) {
				for (let i = 0; i < this.data.sysRoles.length; i++) {
					if (this.data.sysRoles[i].roleKey === 'operate_manage') {
						this.isOperate = false;
						break
					}
				}
			}

			// 查询机构类型字典
      this.init();
		},
		methods: {
		  // 异步初始化字典信息
		  async init() {
        await this.getDict();
        await this.onReset();
      },
		  // 获取机构类型字典
      getDict() {
        return new Promise((resolve, reject) => {
          let dictKeys = ['service_provider_type'];
          allSelectdictionaryData(dictKeys).then(res => {
            let dict = res.data
            if (dict['service_provider_type']) {
              this.org_typeOptions = dict['service_provider_type'];
              this.form.orgType = this.org_typeOptions[0].dictValue;
            }
            resolve()
          }).catch(() => {
            reject()
          });
        });
      },
			// 新增时未展开树， 记录节点并展开
			checkArr(val) {
				this.checkedKeys = this.checkedKeys.concat(val)
				this.checkedKeys = Array.from(new Set(this.checkedKeys))
			},
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
			// 添加行-提交数据
			addTableRowSubmit(params) {
        addServiceConfig(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            // 重新刷新查询列表
            this.templateParameter.isShow = false;
            this.ajaxData({orgType: this.form.orgType});
          }
          else {
            this.$message.error('添加服务信息失败！');
          }
        }).catch(() => {
          this.$message.error('添加服务信息失败！');
        });
        this.templateParameter.loading = false;
			},
			//删除当前行
			handleRemove($index, row) {
        this.$confirm(`确定要删除【${row.serviceValue}】服务吗?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteServiceConfig(row.id).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              // 重新刷新查询列表
              this.templateParameter.isShow = false;
              this.ajaxData({orgType: this.form.orgType});
            }
            else {
              this.$message.error('删除服务信息失败！');
            }
          }).catch(() => {
            this.$message.error('删除服务信息失败！');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作！'
          });
        });
        this.templateParameter.loading = false;
      },
			// 编辑-打开弹框
			handleEdit($index, row) {
				this.templateParameter.isShow = true;// 打开弹框
				this.templateParameter.tableRowValue = row;// 将选中的行数据传到弹框
				this.templateParameter.modelType = 'edit';// 将弹框设为编辑状态
				this.templateParameter.childRow = false;// 是否是‘添加子行’打开弹框
			},
			// 编辑-提交数据
			editTableRowSubmit(params) {
        modifyServiceConfig(params).then(res => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '操作成功'
            });
            // 重新刷新查询列表
            this.templateParameter.isShow = false;
            this.ajaxData({orgType: this.form.orgType});
          }
          else {
            this.$message.error('修改服务信息失败！');
          }
        }).catch(() => {
          this.$message.error('修改服务信息失败！');
        });
        this.templateParameter.loading = false;
			},
			dialogHanderHide() {
				this.templateParameter.isShow = false
			},
			//请求后台数据---axios--查全部数据
			ajaxData(data) {
        getServiceConfigList(data).then(response => {
          this.tableData = response.data;
					if (this.isOperate === false) {
						if (this.tableData[0].hasChildren) {
							this.tableData[0].children.forEach((item, i) => {
								this.tableData[0].children[i].isShow = false
							})
						}
					}
					this.loadingReset = false;
					this.loadingSubmit = false;
				}).catch(() => {
					this.$message.error('请求失败！');
					setTimeout(() => {
						this.loadingReset = false;
						this.loadingSubmit = false;
					}, 1000);
				});
			},
			//表单查询按钮
			onSubmit() {
				this.loadingSubmit = true;
        this.ajaxData({orgType: this.form.orgType});
			},
			//表单重置按钮
			onReset() {
        return new Promise((resolve, reject) => {
          this.loadingReset = true;
          if (this.org_typeOptions && this.org_typeOptions[0] && this.org_typeOptions[0].dictValue) {
            this.form.orgType = this.org_typeOptions[0].dictValue;
          }
          this.ajaxData({orgType: this.form.orgType});
          resolve()
        })
			},
			//添加下级服务
			handleAddDepartment($index, row) {
				this.templateParameter.isShow = true;// 打开弹框
				this.templateParameter.tableRowValue = row;// 行数据格式
				this.templateParameter.modelType = 'addSub';// 将弹框设为新增状态
				this.templateParameter.childRow = true;// 是否是‘添加子行’打开弹框
			}
		}
	}
</script>

<style scoped>
	@import "~@/styles/form.css";

	.disableBtn {
		border: none;
		background-color: transparent;
	}

	.disableBtn[disabled] {
		cursor: no-drop;
	}
</style>
