<!-- dialog.vue -->

<template>
	<el-dialog class="hupingClass" :title="title" :visible="templateParameter.isShow" @close='closeDialog' @open="open"
	           :closeOnClickModal="closeOnClickModal" :closeOnPressEscape="closeOnPressEscape" width="400px" top="200px"
	           v-dialogDrag :close-on-click-modal="false" >

		<el-form ref="form" :model="form" :rules="rulesForm" label-width="120px">
			<el-row :gutter="0">
        <el-col v-show="this.templateParameter.modelType !== 'edit'" :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="上级服务" prop="orderNum">
            <el-input v-model="this.templateParameter.tableRowValue.serviceValue" clearable disabled></el-input>
          </el-form-item>
        </el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="元素类型">
            <el-select v-model="form.elementType" placeholder="请选则元素类型" clearable  @keyup.enter.native="onSubmit">
              <el-option v-for="(item, index) in serviceConfigElementType" :key="index"
                         :label="item.dictLabel" :value="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="第几页">
            <el-select v-model="form.pageNumber" placeholder="请选则第几页" clearable  @keyup.enter.native="onSubmit">
              <el-option v-for="(item, index) in serviceConfigPageNumber" :key="index"
                         :label="item.dictLabel" :value="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
					<el-form-item label="服务项目Key">
						<el-input v-model.number="form.serviceKey" clearable
						          placeholder="请输入服务项目Key" @keyup.enter.native="submitDialog"></el-input>
					</el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="服务项目Value">
            <el-input v-model.number="form.serviceValue" clearable
                      placeholder="请输入服务项目Value" @keyup.enter.native="submitDialog"></el-input>
          </el-form-item>
				</el-col>
				<el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="服务说明">
            <el-input v-model.number="form.serviceDesc" clearable
                      placeholder="请输入服务说明" @keyup.enter.native="submitDialog"></el-input>
          </el-form-item>
				</el-col>
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="显示顺序">
            <el-input v-model.number="form.orderNum" clearable
                      placeholder="显示顺序" @keyup.enter.native="submitDialog"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
          <el-form-item label="下级是否单选框">
            <el-switch
              class="switchStyle"
              v-model="form.checkbox"
              active-text="是"
              inactive-text="否"
              active-value="true"
              inactive-value="false">
            </el-switch>
          </el-form-item>
        </el-col>
			</el-row>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button :loading="templateParameter.loading" type="primary" @click="submitDialog()">确 定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import {adaptiveGrid_plus} from "@/common/index";
	import {mapGetters} from 'vuex'
  // 导入获取字典接口
  import {allSelectdictionaryData} from '@/api/common';

	export default {
		name: "myDialog",
		computed: {
			...mapGetters([
				'data',
			])
		},
		props: ['templateParameter'],//接受父模板传递的自定义属性
		data() {
			return {
				title: '',//弹框title
				form: {
					id: '', // id
          pid: '', // pid
          elementType: '', // 元素类型
          pageNumber: '', // 第几页
          serviceKey: '', // 服务Key
          serviceValue: '', // 服务Value
          serviceDesc: '', // 服务说明
          orderNum: '', // 排序
          checkbox: 'false', // 下级是否全部为 复选框
          orgType: '' // 机构类型
				},
				closeOnClickModal: false,//是否可通过点击遮罩关闭
				closeOnPressEscape: false,//是否可通过按下 ESC 键关闭
				//form 表单的验证规则
				rulesForm: {
					// //上级部门
					// parentId: [
					// 	//{required: true, message: '上级部门不能为空，请选择！', trigger: 'change'},
					// 	{required: true, trigger: 'change', validator: validParentId},
					// ],
					// //部门名称
					// deptName: [
					// 	{required: true, message: '部门名称不能为空，请填写！', trigger: 'blur'},
					// ],
					// //部门排序
					// orderNum: [
					// 	{required: true, trigger: 'blur', validator: checkIsNumber},
					// ],
					// //区域
					// areaCode:[
					// 	{required: true, trigger: 'change', validator: validAreaCode},
					// ]
				},
				//自适应
				adaptiveGrid_plus: {
					md: adaptiveGrid_plus.md,
					lg: adaptiveGrid_plus.lg
				},
				idEdit: true,
        // 机构服务元素类型
        serviceConfigElementType: [],
        // 机构服务第几页
        serviceConfigPageNumber: []
			}
		},
    mounted() {
      // 初始化页面下拉框字典值
		  this.initDict()
    },
		methods: {
		  // 初始化页面下拉框字典值
		  initDict() {
        let dictKey = [
          'service_config_element_type', // 机构服务元素类型
          'service_config_page_number' // 机构服务第几页
        ].join(',');
        allSelectdictionaryData(dictKey).then(response => {
          let dict = response.data;
          for (let key in dict) {
            switch (key) {
              //性别
              case 'service_config_element_type':
                this.serviceConfigElementType = dict[key];
                break;
              //民族
              case 'service_config_page_number':
                this.serviceConfigPageNumber = dict[key];
                break;
            }
          }
        }).catch(() => {
        });
      },
			//取消关闭弹框
			closeDialog() {
				this.idEdit = true;

				this.form = {
          id: '', // id
          pid: '', // pid
          elementType: '', // 元素类型
          pageNumber: '', // 第几页
          serviceKey: '', // 服务Key
          serviceValue: '', // 服务Value
          serviceDesc: '', // 服务说明
          orderNum: '', // 排序
          checkbox: 'false', // 下级是否全部为 复选框
          orgType: '' // 机构类型
				};
				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});

				this.$emit('dialogHide', 'false');

			},
			// 确认，提交表单
			submitDialog() {
        let parentData = this.templateParameter;
        if (parentData.modelType === 'edit') {
          this.$emit('editTableRowSubmit', this.form);
        } else if (parentData.modelType === 'add') {
          // 添加下级服务 todo 暂时不做
          this.$emit('addTableRowSubmit');
        } else if (this.templateParameter.modelType === 'addSub') {
          // 添加下级服务
          this.$emit('addTableRowSubmit', this.form);
        }
      },
			//打开的回调
			open() {
        this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});

				// 编辑
				if (this.templateParameter.modelType === 'edit') {
          // 编辑状态下将父组件传递过来的 值赋值到页面
					this.title = '编辑服务';
          let parentData = this.templateParameter.tableRowValue;
          this.form.id = parentData.id; // id
          this.form.pid = parentData.pid; // pid
          this.form.elementType = parentData.elementType; // 元素类型
          this.form.pageNumber = parentData.pageNumber; // 第几页
          this.form.serviceKey = parentData.serviceKey; // 服务Key
          this.form.serviceValue = parentData.serviceValue; // 服务Value
          this.form.serviceDesc = parentData.serviceDesc; // 服务说明
          this.form.orderNum = parentData.orderNum; // 排序
          this.form.checkbox = parentData.checkbox; // 下级是否全部为 复选框
          this.form.orgType = parentData.orgType; // 机构类型
					this.$nextTick(() => {
						this.$refs['form'].clearValidate();
						this.idEdit = false;
					});
				}
				// 新增
				else if (this.templateParameter.modelType === 'add') {
					this.title = '新增服务';
					this.idEdit = false;
				}
				// 添加下级服务
				else if (this.templateParameter.modelType === 'addSub') {
					this.title = '添加下级服务';
          let parentData = this.templateParameter.tableRowValue;
          this.form.pid = parentData.id; // pid
          this.form.orgType = parentData.orgType; // orgType
          this.idEdit = false;
				}

				this.$nextTick(() => {
					this.$refs['form'].clearValidate();
				});
			}
		}
	};
</script>

<style scoped>
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 999;
	}

	.el-row {
		margin: 0 !important;
	}

	.el-select, .el-date-editor {
		width: 100% !important;
	}

	.el-header {
		padding-left: 0;
		padding-right: 0;
	}

	.el-main {
		border-top: 1px solid #DCDFE6;
	}

	.el-tree {
		max-height: 300px;
		overflow: auto;
		overflow-x: hidden;
	}
</style>
