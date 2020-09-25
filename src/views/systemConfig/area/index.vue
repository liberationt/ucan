<template>
	<el-container>
    <el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline" ref="form"
        @keyup.enter.native="onSubmit">
				<el-form-item label="区域名称" prop="areaName">
					<el-input v-model.trim="form.areaName" placeholder="输入区域名称查询" clearable></el-input>
				</el-form-item>
        <el-form-item label="区域编码" prop="areaCode">
					<el-input v-model.trim="form.areaCode" placeholder="输入区域编码查询" clearable></el-input>
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
					<el-button type="primary" class="base-btn" @click="addTableRow()" v-has="{class: '新增'}">新增
					</el-button>
				</el-header>
				<el-main>
					<el-table
              v-if="isLazy"
              :key="lazyTableKey"
							ref="lazyTable"
							:data="lazyTableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							fit
							row-key="areaId"
              :load="loadAreaChildren"
              lazy
							:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
					>

						<el-table-column type="selection" width="50" fixed="left"></el-table-column>

						<el-table-column label="区域名称" prop="areaName" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column label="区域编码" prop="areaCode" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column
								label="操作"
								fixed="right"
								min-width="280"
								header-align="center"
								align="center"
								class="firstBtnClass">
							<template slot-scope="{row,$index}">
								<button @click="handleAddArea($index, row)"
								        v-if="row.codeLevel.length < 6"
								        class="table-btn disableBtn"
                        v-has="{class: '新增'}">添加下级区域</button>
                <span v-else style="width:116px;display:inline-block;"></span>
								<span @click="handleEdit($index, row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
							</template>
						</el-table-column>
					</el-table>

          <el-table
              v-else
							ref="table"
							:data="tableData"
							tooltip-effect="dark"
							style="width: 100%;"
							header-align="left"
							border
							fit
              default-expand-all
							row-key="areaId"
							:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
					>

						<el-table-column type="selection" width="50" fixed="left"></el-table-column>

						<el-table-column label="区域名称" prop="areaName" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column label="区域编码" prop="areaCode" min-width="150"
						                 header-align="left"></el-table-column>

						<el-table-column
								label="操作"
								fixed="right"
								min-width="280"
								header-align="center"
								align="center"
								class="firstBtnClass">
							<template slot-scope="{row,$index}">
								<button @click="handleAddArea($index, row)"
								        v-if="row.codeLevel.length < 6"
								        class="table-btn disableBtn"
                        v-has="{class: '新增'}">添加下级区域</button>
                <span v-else style="width:116px;display:inline-block;"></span>
								<span @click="handleEdit($index, row)" class="table-btn" v-has="{class: '编辑'}">编辑</span>
							</template>
						</el-table-column>
					</el-table>

					<myDialog @dialogHide="dialogHanderHide" @addTableRowSubmit="addTableRowSubmit"
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
	import {
    searchArea,
    getAreaChildren,
    addArea,
    editArea
	} from "@/api/systemConfig/area";
	import {mapGetters} from 'vuex'

	export default {
		components: {myDialog, Pagination},
		computed: {
			...mapGetters([
				'data',
			])
		},
		data() {
			return {
        isLazy: true, // 是否显示懒加载的 table
        form: {
          areaName: '',
          areaCode: ''
        },
        tableData: [], // 筛选的区域数据
        lazyTableKey: 1, // lazyTableKey 的变化，触发table重新渲染
				lazyTableData: [], // 懒加载的区域数据
				//模板传参
				templateParameter: {
					isShow: false,//弹框显示隐藏
					tableRowValue: '',//表格当前行数据
					modelType: '',//弹框的类型，可编辑或可新增
					loading: false,//弹框提交按钮加载动画
        },
			}
		},
		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
      this.lazyLoadAreaData();
		},
		methods: {
      onSubmit() {
        let {areaName, areaCode} = this.form;
        if (areaName === '' && areaCode === '') {
          this.lazyLoadAreaData();
        } else {
          this.loadAreaData(this.form);
        }
      },
      onReset() {
        this.$refs.form.resetFields();
        this.lazyLoadAreaData();
      },
      loadAreaData(formData) {
        this.isLazy = false;
        this.lazyTableData = [];

        let {areaName, areaCode} = formData;
        let params = {};
        if (areaName) {
          params['areaName'] = areaName;
        }
        if (areaCode) {
          params['areaCode'] = areaCode;
        }
        searchArea(params).then(response => {
          // 遍历 area 树，给每一个节点添加一个层级属性 codeLevel
          response.forEach(node => {
            this.traverseAreaTree(node, []);
          });
          this.tableData = response;
        }).catch(error =>{
          this.$message.error('区域数据加载失败！');
        });
      },
      // 遍历添加 codeLevel
      traverseAreaTree(node, codeLevel) {
        node.codeLevel = [...codeLevel, node.areaCode];
        if (node.children) {
          node.children.forEach(childNode => {
            this.traverseAreaTree(childNode, node.codeLevel);
          });
        }
      },
      // 懒加载下一级区域数据
      loadAreaChildren(row, treeNode, resolve) {
        getAreaChildren(row.areaCode).then(response => {
          response.forEach(item => {
            item.hasChildren = !item.hasChildren;
            item.codeLevel = [...row.codeLevel, item.areaCode];
          });
          row.children = response;
          resolve(response);
        }).catch(error => {
          this.$message.error('区域数据加载失败！');
        });
      },
      // 懒加载初始数据
      lazyLoadAreaData() {
        this.isLazy = true;
        this.tableData = [];
        this.lazyTableKey = this.lazyTableKey + 1;

        getAreaChildren(0).then(response => {
          // 接口返回的字段 hasChildren 的值是相反的，这里需要取反
          response.forEach(item => {
            item.hasChildren = !item.hasChildren;
            item.codeLevel = [item.areaCode];
          });
          this.lazyTableData = response;
        }).catch(error => {
          this.$message.error('区域数据加载失败！');
        });
      },
			//添加行-打开弹框
			addTableRow() {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = {};//行数据格式
        this.templateParameter.modelType = 'add';//将弹框设为新增状态
			},
			//添加行-提交数据
			addTableRowSubmit(params) {
        let data = {
          parentCode: this.getLastCode(params.parentCode),
          areaName: params.areaName,
          grade: params.parentCode.length + 1 // 区域所处的层级
        };
				this.templateParameter.loading = true;
				addArea(data).then(response => {
          this.templateParameter.loading = false;
          if (response.code === 0) {
						this.$message({
							type: 'success',
							message: response.msg
            });
            this.resetAreaAfterAdd();
					} else {
						this.$message.error(response.msg);
					}
				}).catch(error => {
					this.$message.error('操作失败！');
					this.templateParameter.loading = false;
				})
			},

			//编辑-打开弹框
			handleEdit($index, row) {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = row;//将选中的行数据传到弹框
				this.templateParameter.modelType = 'edit';//将弹框设为编辑状态
      },
      getLastCode(areaCode) {
        return areaCode.length > 0 ? areaCode[areaCode.length - 1] : '0';
      },
			//编辑-提交数据
			editTableRowSubmit(params) {
        let data = {
          areaName: params.areaName,
          areaCode: params.areaCode
        };
				this.templateParameter.loading = true;
        editArea(data).then(response => {
          this.templateParameter.loading = false;
          if (response.code === 0) {
            this.$message({
              type: 'success',
              message: response.msg
            });
            this.resetAreaAfterEdit();
          } else {
            this.$message.error(response.msg);
          }
        }).catch(error => {
          this.$message.error('操作失败！');
          this.templateParameter.loading = false;
        })
			},
			dialogHanderHide() {
				this.templateParameter.isShow = false
			},
			handleAddArea($index, row) {
				this.templateParameter.isShow = true;//打开弹框
				this.templateParameter.tableRowValue = row;//行数据格式
				this.templateParameter.modelType = 'addSub';//将弹框设为新增状态
      },
      resetAreaAfterAdd() {
        this.lazyLoadAreaData();
      },
      resetAreaAfterEdit() {
        if (this.isLazy) {
          this.lazyLoadAreaData();
        } else {
          this.loadAreaData(this.form);
        }
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
