<template>
	<div>
		<!-- 面板标题 -->
		<template v-if="currentItem.elementType === 'pannelTitle'">
			<el-collapse-item :name="'baseItem_'+(3+index)">
				<template slot="title">
					<div class="titleSlider">
						<span><i class="titleTip"></i>{{currentItem.serviceValue}}</span>
					</div>
				</template>
				<el-form ref="form_service" key="form_service" label-position="left" label-width="auto">
					<el-row :gutter="0" v-if="!currentItem.checkbox">
						<template v-if="!currentItem.checkbox && currentItem.children !== null" v-for="(item, index) in currentItem.children">
							<InstituField :currentItem="item" :modelType="modelType"></InstituField>
						</template>
					</el-row>
					<el-row v-else class="pannelTitle_checkout">
						<!--编辑，新增-->
						<div v-if="modelType !== 'look'">
							<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null">
								<el-checkbox v-model="item.ifSelected" :label="item.serviceKey" :name="item.serviceKey" :value="item.serviceKey">{{item.serviceValue}}</el-checkbox>
							</span>
						</div>
						<!--查看-->
						<div v-else :style="modelType !== 'look'?'':'display:inline-block;'">
							<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null" style="margin-right: 0px;">
								{{item.serviceValue}}{{index === currentItem.children.length-1?'':'，'}}
							</span>
						</div>
					</el-row>
				</el-form>
			</el-collapse-item>
		</template>
    <!-- 需要单选且需要隐藏或显示 -->
    <template v-else-if="parentItem && parentItem.elementType === 'inputLabel'">
      <!--编辑，新增-->
      <div v-if="modelType !== 'look'" class="labelRedioPannel">
        <el-form-item class="labelRedio_title">
          <el-radio-group v-model="parentItem.subsidyValue" @change="((value) => {changeLabelRadioRadioValue(value, parentItem)})">
            <el-radio :label="item.serviceKey" v-for="(item, index) in parentItem.children" v-if="parentItem.serviceKey !== null">
              {{item.serviceValue}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row :gutter="0" v-if="!parentItem.checkbox">
          <template v-if="!parentItem.checkbox && parentItem.children !== null" v-for="(itemLabelRadio) in parentItem.children">
            <span v-show="itemLabelRadio.ifSelected">
              <template v-show="itemLabelRadio.ifSelected" v-if="!itemLabelRadio.checkbox && itemLabelRadio.children !== null && itemLabelRadio.serviceKey.startsWith('sqwsfwss_jbfw_plsz')">
                <el-row class="label_checkout">
                  <span v-for="(item) in itemLabelRadio.children">
                    <el-checkbox @change="changeItemLabelCheckboxValue(itemLabelRadio,item)" v-if="item.elementType === 'inputCheckboxLabel'" v-model="item.ifSelected" :label="item.serviceKey" :name="item.serviceKey" :value="item.serviceKey">{{item.serviceValue}}</el-checkbox>
                  </span>
                </el-row>
                <el-row v-if="itemLabelRadio.children" style="padding-left: 70px;margin-bottom: 20px;" >
                  <span v-for="(item) in itemLabelRadio.children">
                    <span v-if="item.elementType === 'inputCheckbox'">
                      {{item.serviceValue}}<el-input v-model="item.subsidyValue" :disabled="!item.ifSelected" style="width: 250px;" />&nbsp;&nbsp;
                    </span>
                    <span v-if="item.elementType === 'inputCheckboxTimeHHmm'">
                      {{item.serviceValue}}<el-time-picker v-model="item.subsidyValue" :disabled="!item.ifSelected" placeholder="请选择" value-format="HH:mm" format="HH:mm"> </el-time-picker>
                    </span>
                  </span>
                </el-row>
              </template>
              <template v-show="itemLabelRadio.ifSelected" v-else-if="!itemLabelRadio.checkbox && itemLabelRadio.children !== null && itemLabelRadio.serviceKey.startsWith('sqwsfwss_jbfw_ddsz')" v-for="(item) in itemLabelRadio.children">
                <InstituField :currentItem="item" :modelType="modelType"></InstituField>
              </template>
            </span>
          </template>
        </el-row>
      </div>
      <!--查看-->
      <div v-else class="labelRedioPannel">
        <el-form-item class="labelRedio_title">
          <span :label="item.serviceKey" v-for="(item, index) in parentItem.children" v-if="parentItem.serviceKey !== null">
              {{item.serviceValue}}
          </span>
        </el-form-item>
        <el-row :gutter="0" v-if="!parentItem.checkbox">
          <template v-if="!parentItem.checkbox && parentItem.children !== null" v-for="(itemLabelRadio) in parentItem.children">
            <span v-show="itemLabelRadio.ifSelected">
              <template v-show="itemLabelRadio.ifSelected" v-if="!itemLabelRadio.checkbox && itemLabelRadio.children !== null && itemLabelRadio.serviceKey.startsWith('sqwsfwss_jbfw_ddsz')" v-for="(item) in itemLabelRadio.children">
                <InstituField :currentItem="item" :modelType="modelType"></InstituField>
              </template>
              <template v-show="itemLabelRadio.ifSelected" v-if="!itemLabelRadio.checkbox && itemLabelRadio.children !== null && itemLabelRadio.serviceKey.startsWith('sqwsfwss_jbfw_plsz')">
                <el-row v-if="itemLabelRadio.children" class="label_checkout">
                  <span v-for="(item) in itemLabelRadio.children">
                    <span v-if="item.serviceKey !== 'sqwsfwss_jbfw_plsz_kssj' && item.serviceKey !== 'sqwsfwss_jbfw_plsz_jssj' && item.serviceKey !== 'sqwsfwss_jbfw_plsz_qb'">{{item.serviceValue}}</span>
                  </span>
                </el-row>
                <el-row v-if="itemLabelRadio.children" style="padding-left: 70px;margin-bottom: 20px;" >
                  <span v-for="(item) in itemLabelRadio.children">
                    <span v-if="item.serviceKey === 'sqwsfwss_jbfw_plsz_kssj' || item.serviceKey === 'sqwsfwss_jbfw_plsz_jssj'">
                      {{item.serviceValue}}{{item.subsidyValue}}&nbsp;&nbsp;
                    </span>
                  </span>
                </el-row>
              </template>
            </span>
          </template>
        </el-row>
      </div>
    </template>
    <!-- 带复选框、输入框的label -->
    <template v-if="currentItem.elementType === 'inputCheckboxLabel'">
      <!--编辑，新增-->
      <div v-if="modelType !== 'look'" class="labelPannel">
        <el-form-item class="labelRedio_title">
          <el-checkbox v-model="currentItem.ifSelected" :label="currentItem.serviceKey" :name="currentItem.serviceKey" :value="currentItem.serviceKey" @change="changeCheckboxValue(currentItem)">{{currentItem.serviceValue}}</el-checkbox>
          <span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null">
            <span v-if="'inputCheckbox' === item.elementType">
              {{item.serviceValue}}<el-input v-model="item.subsidyValue" :disabled="!currentItem.ifSelected" style="width: 250px;" />&nbsp;&nbsp;
            </span>
            <span v-if="'inputCheckboxTimeHHmm' === item.elementType">
              {{item.serviceValue}}<el-time-picker :disabled="!currentItem.ifSelected" v-model="item.subsidyValue" placeholder="请选择" value-format="HH:mm" format="HH:mm"> </el-time-picker>&nbsp;&nbsp;
            </span>
					</span>
        </el-form-item>
      </div>
      <!--查看-->
      <div v-else class="labelPannel">
        <el-form-item class="labelRedio_title">
          <span style="width: 210px">{{currentItem.serviceValue}}</span>
          <span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null">
            <span v-if="'inputCheckbox' === item.elementType">
              {{item.serviceValue}}{{item.subsidyValue}}{{index === currentItem.children.length-1?'':'，'}}
            </span>
            <span v-if="'inputCheckboxTimeHHmm' === item.elementType">
              {{item.serviceValue}}{{item.subsidyValue}}{{index === currentItem.children.length-1?'':'，'}}
            </span>
					</span>
        </el-form-item>
      </div>
    </template>
    <!-- 自身不带单选框、且下级带单选框的inputLabel -->
    <template v-if="currentItem.elementType === 'inputLabel'">
      <!--编辑，新增-->
      <div v-if="modelType !== 'look'" class="labelPannel">
        <span class="label_title">{{currentItem.serviceValue}}</span>
        <el-row :gutter="0" v-if="!currentItem.checkbox && !currentItem.checkbox">
          <!-- 适用于带隐藏显示的单选 -->
          <template v-if="currentItem.children !== null">
            <!-- 不需要当前节点 只需要传递父节点参数即可 -->
            <InstituField :currentItem="{}" :modelType="modelType" :parentItem="currentItem" ></InstituField>
          </template>
        </el-row>
      </div>
      <!-- 查看 -->
      <div v-else class="labelPannel">
        <span class="label_title">{{currentItem.serviceValue}}</span>
        <el-row :gutter="0" v-if="!currentItem.checkbox">
          <!-- 适用于带隐藏显示的单选 -->
          <template v-if="currentItem.children !== null">
            <!-- 不需要当前节点 只需要传递父节点参数即可 -->
            <InstituField :currentItem="{}" :modelType="modelType" :parentItem="currentItem" ></InstituField>
          </template>
        </el-row>
      </div>
    </template>
		<!-- 不带单选框的label -->
		<template v-if="currentItem.elementType === 'label'">
			<!--编辑，新增-->
			<div v-if="modelType !== 'look'" class="labelPannel">
				<span class="label_title">{{currentItem.serviceValue}}</span>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
					<template v-if="!currentItem.checkbox && currentItem.children !== null" v-for="(item, index) in currentItem.children">
						<InstituField :currentItem="item" :modelType="modelType"></InstituField>
					</template>
				</el-row>
				<el-row v-else class="label_checkout">
					<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null">
						<el-checkbox v-model="item.ifSelected" :label="item.serviceKey" :name="item.serviceKey" :value="item.serviceKey" @change="changeCheckboxValue(item)">{{item.serviceValue}}</el-checkbox>
						<span v-if="'inputNumberCheckbox' === item.elementType">
						<el-input v-model="item.subsidyValue" :disabled="!item.ifSelected" style="width: 80px;margin-left: -20px;"
						 oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
						/>&nbsp;&nbsp;元
						</span>
					</span>
				</el-row>
			</div>
			<!--查看-->
			<div v-else class="labelPannel">
				<span class="label_title">{{currentItem.serviceValue}}</span>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
					<template v-if="!currentItem.checkbox && currentItem.children !== null" v-for="(item, index) in currentItem.children">
						<InstituField :currentItem="item" :modelType="modelType"></InstituField>
					</template>
				</el-row>
				<el-row v-else class="label_checkout" :style="modelType !== 'look'?'':'display:inline-block;padding-left:90px;'">
					<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null" style="margin-right: 0px;">
           				 {{item.serviceValue}}{{'inputNumberCheckbox' === item.elementType ? item.subsidyValue + '元' : ''}}{{index === currentItem.children.length-1?'':'，'}}
					</span>
				</el-row>
			</div>
		</template>
		<!--带单选框的label-->
		<template v-else-if="currentItem.elementType === 'labelRedio'">
			<!--编辑，新增-->
			<div v-if="modelType !== 'look'" class="labelRedioPannel">
				<el-form-item class="labelRedio_title">
					<span style="margin-right: 20px;">{{currentItem.serviceValue}}</span>
					<el-radio-group v-model="currentItem.ifSelected" :data-key="currentItem.serviceKey" @change="changeRedioValue(currentItem)">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
					<template v-if="!currentItem.checkbox && currentItem.children !== null" v-for="(item, index) in currentItem.children" >
						<InstituField :currentItem="item" :modelType="modelType"></InstituField>
					</template>
				</el-row>
				<el-row v-else-if="currentItem.children" class="labelRedio_checkout">
					<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null">
						<el-checkbox
								:disabled="currentItem.ifSelected === true ? false : true"
								v-model="item.ifSelected"
								:label="item.serviceKey"
								:name="item.serviceKey"
								:value="item.serviceKey">{{item.serviceValue}}
						</el-checkbox>
					</span>
				</el-row>
			</div>
			<!--查看-->
			<div v-else class="labelRedioPannel">
				<span class="label_title" style="padding-left: 70px;">{{currentItem.serviceValue}}</span>
				<el-row :gutter="0" v-if="!currentItem.checkbox">
					<template v-if="!currentItem.checkbox && currentItem.children !== null" v-for="(item, index) in currentItem.children">
						<InstituField :currentItem="item" :modelType="modelType"></InstituField>
					</template>
				</el-row>
				<el-row v-else-if="currentItem.children" class="label_checkout" :style="modelType !== 'look'?'':'display:inline-block;padding-left:140px;'">
					<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null" style="margin-right: 0px;">
						{{item.serviceValue}}{{index === currentItem.children.length-1?'':'，'}}
					</span>
				</el-row>
			</div>
		</template>
		<!--带单选框的subsidyForm 表单-->
		<template v-else-if="currentItem.elementType === 'subsidyForm'">
			<!--编辑，新增-->
			<div v-if="modelType !== 'look'" class="subsidyFormPannel">
				<div class="subsidyFormPannel_title">
					<span style="margin-right: 20px;">{{currentItem.serviceValue}}</span>
					<el-radio-group v-model="currentItem.ifSelected" :data-key="currentItem.serviceKey" @change="changeRedioValue(currentItem)">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</div>
				<template v-for="(item, index) in currentItem.children">
					<!--input类型-->
					<div v-if="item.elementType === 'subsidyFormInput'" class="subsidyFormItem" style="margin-bottom: 20px;">
						<span style="margin-right: 20px;">{{item.serviceValue}}</span>
						<el-input-number v-model="item.subsidyValue" :precision="2" :min="0" :max="99999999" :controls="false" :disabled="!currentItem.ifSelected" clearable style="width: 200px;" class="inputNumberDiv"></el-input-number>
					</div>
					<!--date日期类型-->
					<div v-if="item.elementType === 'subsidyFormDateYear'" class="subsidyFormItem" style="margin-bottom: 20px;">
						<span style="margin-right: 20px;">{{item.serviceValue}}</span>
						<el-date-picker v-model="item.subsidyValue"
						                :disabled="!currentItem.ifSelected"
						                type="year"
						                :placeholder="'请选择'+item.serviceValue" style="width:200px;"
						                format="yyyy"
						                value-format="yyyy"></el-date-picker>
					</div>
					<!--select下拉框类型-->
				</template>
			</div>
			<!--查看-->
			<div v-else class="subsidyFormPannel">
				<span class="subsidyFormPannel_title" style="padding-left: 70px;">{{currentItem.serviceValue}}</span>
				<el-row class="label_checkout" style="padding-left: 140px;">
					<span v-for="(item, index) in currentItem.children" v-if="currentItem.serviceKey !== null" style="margin-right: 0px;">
						<span>{{item.serviceValue}}：{{item.subsidyValue}}</span>
					</span>
				</el-row>
			</div>
		</template>
	</div>
</template>

<script>
	//import {institutionFieldConfig} from "@/api/facilitiesConfig/pensionAgency";

	export default {
		name: 'InstituField',
		props: ['currentItem', 'index','modelType', 'parentItem'],
		watch: {},
		data() {
			return {}
		},
		mounted() {

		},
		methods: {
		  // 复选框取消后需要取消输入框中的值
		  changeCheckboxValue(data) {
        if (data.elementType === 'inputNumberCheckbox') {
          if (!data.ifSelected) {
            data.ifSelected = false;
            data.subsidyValue = null;
          }
        }
        if (data.elementType === 'inputCheckboxLabel') {
          if (!data.ifSelected) {
            if (data.children) {
              return data.children.forEach((item)=>{
                item.ifSelected = false;
                item.subsidyValue = null;
              });
            }
          }
        }
      },
			//改变单选框事件
			changeRedioValue(data) {
				//对下级不是单选框和复选框的数据进行操作
				if (data.elementType === 'subsidyForm'){
					if (!data.ifSelected) {
						if (data.children) {
							return data.children.forEach((item)=>{
								item.ifSelected = false;
								item.subsidyValue = null;
							});
						}
					}
				}
				//对下级是单选框和复选框的数据进行操作
				else {
					if (!data.ifSelected) {
						if (data.children) {
							return data.children.forEach((item)=>{
								item.ifSelected = false;
							});
						}
					}
				}
			},
      // 改变输入单选框事件
      changeLabelRadioRadioValue(value, item) {
        item.children.forEach((i) => {
          i.ifSelected = value === i.serviceKey;
          i.subsidyValue = null;

          // 清理脏数据
          if (i.serviceKey === value) {
            i.children.forEach((ci) => {
              // 如果是inputCheckbox要指定为true 因为它头部没有带复选框所以默认是true 否则就被禁用掉了
              ci.ifSelected = ci.elementType === 'inputCheckbox' || ci.elementType === 'inputCheckboxTimeHHmm';
              ci.subsidyValue = null;
              if (ci.children) {
                ci.children.forEach((cci) => {
                  cci.ifSelected = false;
                  cci.subsidyValue = null;
                });
              }
            });
          }
        });
      },
      // 改变复杂复选框
      changeItemLabelCheckboxValue(itemLabelRadio, item) {
        if (item.serviceValue === '全部') {
          itemLabelRadio.children.forEach((i) => {
            if (i.elementType === 'inputCheckboxLabel') {
              i.ifSelected = item.ifSelected;
            }
          });
        }

        // 如果选中了 全部选项则 全部选项也应该选中
        let isAllTrue = true;
        let allCheckBoxElement = null;
        if (item.serviceValue !== '全部') {
          itemLabelRadio.children.forEach((i) => {
            if (i.serviceValue === '全部') {
              allCheckBoxElement = i;
            }
            if (i.serviceValue !== '全部') {
              if (!i.ifSelected) {
                isAllTrue = false;
              }
            }
          });
          // 将检测结果赋值给全部复选框
          if (allCheckBoxElement) {
            allCheckBoxElement.ifSelected = isAllTrue
          }
        }
      },
		}
	}
</script>

<style scoped>

	.pannelTitle_checkout{
		padding-left: 70px;
	}
	.pannelTitle_checkout span{
		margin-right: 20px;
	}

	.label_checkout{
		padding-left: 70px;
		margin-bottom: 20px;
	}
	.label_checkout span{
		margin-right: 20px;
	}

	.labelRedio_checkout{
		padding-left: 140px;
		margin-bottom: 20px;
	}
	.labelRedio_checkout span{
		margin-right: 20px;
	}

	.label_title{
		padding-left: 20px;
		margin-bottom: 20px;
		display: block;
	}

	.label_title + .el-form.el-form--label-left .label_title{
		padding-left: 70px;
	}
	.label_title + .el-form.el-form--label-left .label_title + .el-form.el-form--label-left .label_checkout{
		padding-left: 140px;
	}

	.labelRedio_title{
		padding-left: 70px;
	}

	.labelPannel > .el-row > div > .labelPannel{
		padding-left: 50px;
	}

	.subsidyFormPannel{
	}
	.subsidyFormPannel > .subsidyFormPannel_title {
		line-height: 24px;
		height: 24px;
		margin-bottom: 20px;
		padding-left: 70px;
		display: block;;
	}
	.subsidyFormPannel > .subsidyFormItem{
		padding-left: 140px;
	}

	/*==================================*/
	.titleSlider {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.titleSlider > span {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: #fff;
		padding: 0 10px 0 20px;
		height: 47px;
		font-size:16px;
    	font-weight: 600;
	}

	.titleSlider > span .titleTip {
		position: absolute;
		top: 50%;
		left: 10px;
		margin-top: -9px;
		width: 3px;
		height: 18px;
		background-color: #0078D4;
		display: inline-block;
	}

	.titleSlider::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 1px;
		border-top: 1px dashed #E1E1E1;
		content: '';
	}
</style>

<style>
	.inputNumberDiv > .el-input.el-input--medium > .el-input__inner{
		text-align: left !important;
	}
</style>

