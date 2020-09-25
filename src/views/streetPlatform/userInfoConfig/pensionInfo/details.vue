<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
        <!--基本信息tabs start-->
        <!--服务信息tabs end-->
        <el-tab-pane label="基本信息" name="base">
          <el-collapse v-model="activeCollapse">
            <!--基本信息item start-->
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />基本信息
                  </span>
                </div>
              </template>
              <el-form
                ref="form_base"
                key="form_base"
                :model="form"
                label-width="120px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'姓名':'姓名：'" prop="fullName">
                      <span>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'身份证':'身份证：'" prop="idCard">
                      <span>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'性别':'性别：'" prop="sex">
                      <span>{{ form.sex }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'出生日期':'出生日期：'" prop="birthday">
                      <span>{{ form.birthday }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'年龄':'年龄：'">
                      <span>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'民族':'民族：'">
                      <span>{{ form.nation }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'婚姻状况':'婚姻状况：'">
                      <span>{{ form.maritalStatus }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'文化程度':'文化程度：'">
                      <span>{{ form.eduLevel }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'家庭电话':'家庭电话：'">
                      <span>{{ form.homePhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'手机号码':'手机号码：'">
                      <span>{{ form.phone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'照护等级':'照护等级：'">
                      <span>{{ form.careLevel }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'人员状态':'人员状态：'">
                      <span>{{ form.staffStatus }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'收入来源':'收入来源：'">
                      <span>{{ form.sourceOfIncome }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'居住状况':'居住状况：'">
                      <span>{{ form.livingCondition }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'房屋性质':'房屋性质：'">
                      <span>{{ form.natureOfHousing }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'就医方式':'就医方式：'">
                      <span>{{ form.medicalWay }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--基本信息item end-->
            <!--住址信息item start-->
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />住址信息
                  </span>
                </div>
              </template>
              <el-form
                :model="form"
                label-width="160px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'户籍行政区划':'户籍行政区划：'"
                    >
                      <span>{{ form.regCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'户籍详细地址':'户籍详细地址：'"
                    >
                      <span>{{ form.regAddr }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'居住行政区划':'居住行政区划：'"
                    >
                      <span>{{ form.liveCodeName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                    <el-form-item
                      :label="isEditForm?'居住详细地址':'居住详细地址：'"
                    >
                      <span>{{ form.liveAddr }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--联系人item start-->
            <el-collapse-item name="baseItem_4">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />代理人
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="agentsData" style="width: 100%">
                  <el-table-column prop="agentsName" label="姓名" min-width="150" />
                  <el-table-column prop="agentsSex" label="性别" min-width="150" />
                  <el-table-column prop="agentsRelation" label="关系" min-width="150" />
                  <el-table-column prop="agentsHome" label="家庭电话" min-width="180" />
                  <el-table-column prop="agentsPhone" label="手机号码" min-width="180" />
                  <el-table-column prop="agentsAddr" label="住址" min-width="180" />
                </el-table>
              </el-form>
            </el-collapse-item>
            <!--联系人item end-->
            <!--备注item start-->
            <el-collapse-item name="baseItem_5">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />备注
                  </span>
                </div>
              </template>
              <el-form
                :model="form"
                label-width="80px"
              >
                <el-row :gutter="0">
                  <p class="remarkSpan">{{ form.remark }}</p>
                </el-row>
              </el-form>
            </el-collapse-item>
            <!--备注item end-->
          </el-collapse>
        </el-tab-pane>
        <!--基本信息tabs end-->
        <!--标签信息tabs start-->
        <el-tab-pane label="标签信息" name="label">
          <el-collapse v-model="activeCollapse">
            <!--老人标签item start-->
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />居住标签
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag1"
                :model="form"
                label-width="150px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="是否为80周岁以上:"
                    >
                      <span>{{ form.over80YearsOld }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="是否为低收入:"
                    >
                      <span>{{ form.lowIncome }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="经济状况:"
                    >
                      <span>{{ form.economicStatus }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="补贴信息" name="subsidy">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item name="baseItem_1">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />居住补贴
                  </span>
                </div>
              </template>
              <el-form :model="form">
                <el-table :data="form.livingAllowanceVoList" style="width: 100%">
                  <el-table-column label="补贴名称" prop="subsidyName" />
                  <el-table-column label="最近享受补贴月份" prop="whenToEnjoyTheSubsidy" />
                  <el-table-column label="补贴金额（元）" prop="subsidyAmount" />
                  <el-table-column label="查看更多">
                    <template slot-scope="scope">
                      <span style="cursor:pointer;color:#3367d6" @click="lookDetail(scope.row.subsidyName)">详情</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="baseItem_2">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />其他
                  </span>
                </div>
              </template>
              <el-form
                ref="form_tag1"
                :model="form"
                label-width="150px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="是否享受叠加政策:"
                    >
                      <span>{{ form.enjoyOverlayPolicy }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="享受服务类型:"
                    >
                      <span>{{ form.enjoyServiceType }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="是否为低保:"
                    >
                      <span>{{ form.isDibao }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="补贴叠加比例:"
                    >
                      <span>{{ form.subsidyOverlayRatio }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item
                      label="补贴比例:"
                    >
                      <span>{{ form.subsidyRatio }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
      <el-footer>
        <div>
          <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
        </div>
      </el-footer>
    </el-main>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="10%"
    >
      <el-table :data="dataList" style="width: 100%">
        <el-table-column label="补贴时间" prop="whenToEnjoyTheSubsidy" />
        <el-table-column label="补贴金额" prop="subsidyAmount" />
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  pensionInfoDetail,
  historyInfoDetail
} from '@/api/userInfoConfig/pensionInfo'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { closeSelectedTag } from '@/utils/rooterJump'
export default {
  data() {
    return {
      title: '',
      dialogVisible: false,
      agentsData: [],
      isEditForm: false, // 页面表单是否可编辑操作。查看时：false,编辑-新增时：true
      // 下拉框的数据
      // 表单
      form: {},
      dataList: [],
      // form 表单的验证规则
      rulesForm: {},
      activeTabs: 'base', // tab标签切换默认选中name参数
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4', 'baseItem_5'], // 折叠面板默认打开name参数
      areaCodeOptions: [], // 行政区域树节点数据
      lazy: true, // 懒加载
      // 自适应
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      // 自适应
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      areaCode: [[], []] // 区域行政的全部ID
    }
  },
  mounted() {
    const personCode = this.$route.params.id || ''
    pensionInfoDetail({ personCode: personCode }).then(response => {
      this.form = response.data
      const { agentsAddr, agentsHome, agentsName, agentsPhone, agentsRelation, agentsSex } = response.data
      if (agentsAddr !== null || agentsHome !== null || agentsName != null || agentsPhone !== null || agentsRelation !== null || agentsSex !== null) {
        this.agentsData.push({
          agentsAddr: agentsAddr,
          agentsHome: agentsHome,
          agentsName: agentsName,
          agentsPhone: agentsPhone,
          agentsRelation: agentsRelation,
          agentsSex: agentsSex
        })
      }
    }).catch(() => {
      this.$message.error('获取用户信息失败！')
    })
  },
  methods: {
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/userInfoConfig/pensionInfo')
    },
    lookDetail(typeName) {
      this.title = typeName
      let typeOfSubsidy
      if (typeName == '区财政月补贴额') {
        typeOfSubsidy = '区补贴'
      }
      if (typeName == '市财政月补贴额') {
        typeOfSubsidy = '市补贴'
      }
      const data = {
        personCode: this.$route.params.id || '',
        typeOfSubsidy: typeOfSubsidy
      }
      historyInfoDetail(data).then(res => {
        if (res.code == '0') {
          this.dialogVisible = true
          this.dataList = res.data
        }
      })
    }
  }
}
</script>
<style scoped>
	@import "~@/styles/form.css";
	.tableContainer {
		margin-top: 20px;
	}

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

	table tr:nth-child(even) {
		background-color: transparent;
	}

	.addBtnDiv {
		border: 1px dashed #E1E1E1;
		border-top: none;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.addBtnDiv > span {
		cursor: pointer;
		color: #0078D4;
	}

	.el-collapse-item__arrow {
		margin-right: 30px !important;
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

	.cancel-btn {
		border: 1px solid #2b579a;
		color: #2b579a;
	}

	.remarkSpan {
		padding: 10px 20px;
		margin: 0;
	}

	/*.XXX{margin-bottom: 16px !important;}*/
	/*.XXX .el-form-item__error{width: 200px;}*/
</style>
