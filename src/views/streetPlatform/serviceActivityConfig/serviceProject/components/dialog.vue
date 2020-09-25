<!-- 添加服务商 dialog.vue -->
<template>
	<el-dialog
			title="添加服务商"
			:visible="dialogTableVisible"
			@close="closeDialog"
			@opened="opened"
			@open="open"
			width="400px"
      class="fw-item-add-dailog"
			:close-on-click-modal="false" v-dialogDrag ref="dailog"
	>
    <div class="new-daillog-body" ref="dailogBody" :style="{ height: heightChange}">
		  <el-form ref="form" :model="form" label-width="100px">
			<el-row :gutter="30">
				<el-col :span="12" style="min-height: auto;">
					<el-form-item label="所属区域" style="margin-bottom: 10px;">
						<Address :area-code="areaCode_FWS" :form-code="form_areaCode_FWS"
						         @getAreaCode="getAreaCode_FWS"
						         :id-edit="idEdit_FWS"
						         :width="'100%'" :scope="'All'"></Address>
					</el-form-item>
				</el-col>
				<el-col :span="12" style="min-height: auto;">
					<el-form-item label="服务商类型" prop="facilitatorType" style="margin-bottom: 10px;">
						<el-select v-model="facilitatorType" placeholder="请选择服务商类型" clearable style="width:100%;"
						           @change="changeFWSleixing">
							<el-option v-for="item in facilitatorTypeOptions" :key="item.dictValue"
							           :label="item.dictLabel"
							           :value="item.dictValue"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>

			<el-table
					ref="multipleTable"
					:data="tableData_FWS"
					tooltip-effect="dark"
					style="width: 100%;"
					header-align="left"
					border
					row-key="id"
					@select-all="handleSelectAll"
			>
				<el-table-column type="selection" width="30" fixed="left">
					<template slot-scope="{row,$index}">
						<el-checkbox v-model="row.checked" @change="handleChangeChecked(row)"></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column label="序号" width="50" fixed="left">
					<template slot-scope="{row,$index}">
						<span>{{$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="服务商名称" show-overflow-tooltip prop="orgName" min-width="180"></el-table-column>
				<el-table-column label="服务商类型" prop="orgTypeLabel" min-width="120"></el-table-column>
				<el-table-column label="所属区域" show-overflow-tooltip prop="codeLevelName" min-width="200"></el-table-column>
				<el-table-column label="联系方式" prop="phone" min-width="130"></el-table-column>
			</el-table>

			<pagination
					v-show="form_FWS.total>0"
					:total="form_FWS.total"
					:page.sync="form_FWS.pageNum"
					:limit.sync="form_FWS.pageSize"
					@pagination="paginationGetTableData()"
			></pagination>

	  	</el-form>
      <div>
        <el-row :gutter="0">
          <el-col :span="24" class="transferWrapTitle">已选择的服务商：</el-col>
          <el-col :span="24" class="transferWrapDiv">
            <ul class="transferUl">
              <transition-group name="list-complete" tag="div">
                <li class="transferUl_li list-complete-item" v-for="item in this.GLOBAL" :key="item.orgId">
                  <p class="transferUl_p">{{item.orgName}}</p>
                  <i class="transferUl_btn el-icon-circle-close" @click="removeTransferUlItem(item.orgId)"></i>
                </li>
              </transition-group>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="closeDialog()">取 消</el-button>
			<el-button
					type="primary"
					@click="submitDialog()"
					class="dailog-btn"
			>确 定
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import Address from "@/components/Address";
	import {getFacilitatorStyle,getFacilitatorName} from "@/api/serviceActivityConfig/serviceProject";
  import elementResizeDetectorMaker from "element-resize-detector"
	export default {
		name: "myDialog",
		components: {Address},
		props: ["dialogTableVisible","selectedValue"], //接受父模板传递的自定义属性
		data() {
			return {
        heightChange: '50vh',
				form:{},
				//添加服务商弹框
				facilitatorTypeOptions:[],//服务商类型下拉框值
				areaCode_FWS: [],//所属居委全部ID
				form_areaCode_FWS: [],//服务商选择的区域
				facilitatorType: '',//服务商类型
				tableData_FWS: [],//服务商表格数据
				form_FWS: {
					total: 0,
					pageNum: 1,
					pageSize: 10
				},
				GLOBAL: [],//添加服务商多选行的数据-固定存值
				idEdit_FWS: true,//区域级联下拉框是编辑时还是新增时。编辑时：false,新增时：true
			};
		},
		mounted() {
      const _this = this
      const erd = elementResizeDetectorMaker()
      erd.listenTo(this.$refs.dailog.$el.lastChild, function (element) {
        let height = element.offsetHeight - 48 +'px'
        _this.$nextTick(function () {
          this.heightChange = height
          // this.$refs.dailogBody.style.height = height
        })
      })
		},
		methods: {
			// 添加服务商--获取所属居委
			getAreaCode_FWS(val) {
				this.areaCode_FWS = val;
				this.loadFacilitatorTableDate();
			},
			//添加服务商---选择服务商类型
			changeFWSleixing() {
				this.loadFacilitatorTableDate();
			},
			//加载服务商名称的表格数据
			loadFacilitatorTableDate() {
				this.tableData_FWS = [];
				//服务商名称--数据字典接口
				let parmas = {
					areaCode: this.areaCode_FWS[this.areaCode_FWS.length - 1] || '',
					orgType: this.facilitatorType,
					pageNum: 1,
					pageSize: 10
				};
				this.asyncLoadTableData(parmas);
			},
			//加载服务商名称的表格数据-分页加载
			paginationGetTableData() {
				this.tableData_FWS = [];
				//服务商名称--数据字典接口
				let parmas = {
					areaCode: this.areaCode_FWS[this.areaCode_FWS.length - 1] || '',
					orgType: this.facilitatorType,
					pageNum: this.form_FWS.pageNum,
					pageSize: this.form_FWS.pageSize
				};
				this.asyncLoadTableData(parmas);
			},
			//异步加载表格数据
			async asyncLoadTableData(parmas) {
				await getFacilitatorName(parmas).then(response => {
					response.data.list.forEach(item=>{
						item.checked = false;
						this.tableData_FWS.push(item);
					});
					this.form_FWS.total = response.data.total;
				}).catch(() => {
					this.$message.error('‘服务商名称’数据加载失败！');
				});
				//新增，编辑的时候，将已选择的服务商信息显示在‘添加服务商的面板中’
				await this.tableItemSelected();
			},
			//等表格数据渲染完毕，将已选择的‘服务商’显示在表格中
			tableItemSelected() {
				return new Promise((resolve, reject) => {
					if(this.GLOBAL && this.GLOBAL.length !== 0){
						this.GLOBAL.forEach(item => {
							this.tableData_FWS.forEach(itemB => {
								if (item.orgId === itemB.orgId) {
									itemB.checked = true;
								}
							});
						});
					}
					resolve();
				})
			},
			//当用户手动勾选全选 Checkbox 时触发的事件
			handleSelectAll(val){
				this.GLOBAL = [];
				if(val.length !== 0){
					this.tableData_FWS.forEach(item=>{
						item.checked = true;
						this.GLOBAL.push(item);
					});
				}
				else {
					this.tableData_FWS.forEach(item=>{
						item.checked = false;
					});
				}
			},
			//给每个复选框绑定change事件
			handleChangeChecked(val){
				let objIndex = this.GLOBAL.findIndex(im => im.orgId === val.orgId);
				//如果当前选择的行数据，不在‘已选择的服务商’中，则添加进去
				if(objIndex === -1){
					this.GLOBAL.push(val)
				}
				//否则，从中删除
				else {
					this.GLOBAL.splice(objIndex, 1);
				}
			},
			//已选择的服务商删除事件
			removeTransferUlItem(val){
				let objIndex = this.GLOBAL.findIndex(im => im.id === val);
				this.GLOBAL.splice(objIndex, 1);
				this.tableData_FWS.forEach(itemB => {
					itemB.checked = false;
				});
				this.tableItemSelected();
			},
			//弹框确定按钮
			submitDialog(){
				let list = {
					bizProviderOrgVoList:[],
					serviceOrgId:[],
					serviceOrgName:[],
				};
				this.GLOBAL.forEach(itemA => {
					let itemArr = {
						orgId: itemA.orgId,
						orgName: itemA.orgName
					};
					list.bizProviderOrgVoList.push(itemArr);
					list.serviceOrgId.push(itemA.orgId);
					list.serviceOrgName.push(itemA.orgName);
				});
				//将选中的服务商，回显到父页面
				this.$emit("getValueToInput", list);
				this.closeDialog();
			},
			//关闭‘新增服务商’弹框
			closeDialog() {
				//关闭弹框
				this.$emit("dialogHide", "false");
				this.areaCode_FWS=[];//所属居委全部ID
				this.form_areaCode_FWS= [];//服务商选择的区域
				this.facilitatorType= '';//服务商类型
				this.tableData_FWS= [];//服务商表格数据
				this.form_FWS= {
					total: 0,
					pageNum: 1,
					pageSize: 10
				};
				this.idEdit_FWS = true;
			},
			opened() {
			},
			//打开的回调
			open() {
				this.idEdit_FWS = false;
				//服务商类型--数据字典接口
				let dicKey1 = '30XX';
				getFacilitatorStyle(dicKey1).then(response => {
					this.facilitatorTypeOptions = response.data;
				}).catch(() => {
					this.$message.error('‘服务商类型’数据字典接口请求失败！');
				});
				this.GLOBAL = _.cloneDeep(this.selectedValue);
			},
		}
	};
</script>

<style lang="scss">
  .fw-item-add-dailog {
    .el-dialog__body {
      overflow: visible;
      padding:  0 0;
      .new-daillog-body {
        height: 50vh;
        padding: 20px 36px 66px 36px;
        overflow: auto;
        .el-main {
          overflow: visible;
        }
      }
    }
    .el-dialog__footer {
      position: absolute;
      width: 100%;
      background: #ffffff;
      bottom: 0;
      z-index: 99;
    }
  }
</style>
