<template>
  <el-container>
    <el-main class="tableContainer">
      <el-form
        ref="dynamicValidateForm"
        key="dynamicValidateForm"
        :model="dynamicValidateForm"
      >
        <el-collapse v-model="activeDynCollapse">
          <div v-for="(item,i) in dynamicValidateForm.prescripOption" :key="i">
            <el-collapse-item :name="activeDynCollapse[i]">
              <template slot="title">
                <div class="titleSlider">
                  <span>
                    <i class="titleTip" />{{ item.tab }}
                  </span>
                </div>
              </template>
              <el-row :gutter="0">
                <el-col :md="24" :lg="24">
                  <div class="inforCommon">
                    <span style="margin-right:10px">{{ item.title }}</span>
                    <el-form-item
                      :key="item.key"
                      :prop="'prescripOption.'+ i + '.value1'"
                      :rules="rulesForm.value1"
                    >
                      <el-input-number v-model="item.value1" style="width:150px" /></el-form-item>
                    <span style="margin-left:10px">{{ item.operator }}</span>
                  </div>
                </el-col>
              </el-row>
            </el-collapse-item>
          </div>
        </el-collapse>
        <el-collapse v-model="activeCollapse">
          <el-collapse-item name="baseItem_2">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />分值权重设置
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <div style="padding-left:20px">现场评估</div>
              <el-col v-for="(item,i) in dynamicValidateForm.sceneOption" :key="item.value" :md="24" :lg="24">
                <div class="inforCommon">
                  <span style="width:110px;text-align:right;margin-right:10px">{{ item.title }}</span>
                  <el-form-item
                    :key="item.key"
                    :prop="'sceneOption.'+ i + '.value1'"
                    :rules="rulesForm.value1"
                  >
                    <el-input-number v-model="item.value1" style="width:150px" /></el-form-item>
                  <span style="margin-left:10px">{{ item.operator }}</span>
                </div>
              </el-col>
              <div style="padding-left:20px">适应性评估</div>
              <el-col v-for="(item,i) in dynamicValidateForm.adaptOption" :key="i" :md="24" :lg="24">
                <div class="inforCommon">
                  <span style="width:110px;text-align:right;margin-right:10px">{{ item.title }}</span>
                  <el-form-item
                    :key="item.key"
                    :prop="'adaptOption.'+ i + '.value1'"
                    :rules="rulesForm.value1"
                  >
                    <el-input-number v-model="item.value1" style="width:150px" /></el-form-item>
                  <span style="margin-left:10px">{{ item.operator }}</span>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="baseItem_3">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />照护等级分值设置
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col v-for="(item,index) in dynamicValidateForm.nurseOption" :key="index" :md="24" :lg="24">
                <div class="inforCommon">
                  <span style="width:150px;">【{{ item.title }}】评估分值区间</span>
                  <el-form-item
                    :key="item.key"
                    :prop="'nurseOption.'+ index + '.value1'"
                    :rules="rulesForm.value2"
                  >
                    <el-input v-model="item.value1" style="width:130px" />
                  </el-form-item>
                  <span style="margin:0 5px">-</span>
                  <el-form-item
                    :key="item.key"
                    :prop="'nurseOption.'+ index + '.value2'"
                    :rules="rulesForm.value2"
                  >
                    <el-input v-model="item.value2" style="width:130px" @input="(value)=> handelInput2(value,index)" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <!--<el-collapse-item name="baseItem_4">
            <template slot="title">
              <div class="titleSlider">
                <span>
                  <i class="titleTip" />评估费用设置
                </span>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col v-for="(item,index) in dynamicValidateForm.costsOption" :key="index" :md="24" :lg="24">
                <div class="inforCommon">
                  <span style="width:120px;text-align:right;padding-right:10px">{{ item.title }}</span>
                  <el-form-item
                    :key="item.key"
                    :prop="'costsOption.'+ index + '.value1'"
                    :rules="rulesForm.value3"
                  >
                    <el-input v-model="item.value1" style="width:150px;" @input="(value)=> handelInput(value,index)" />
                  </el-form-item>
                  <span style="padding-left:10px">元</span>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>-->
        </el-collapse>
      </el-form>
      <el-footer>
        <div class="footerBtn">
          <el-button
            type="primary"
            class="base-btn btnMarginLeft15"
            @click="editContent('dynamicValidateForm')"
          >确定</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>
<script>
import _ from 'lodash'
import { getParameterSet, saveParameterSet } from '@/api/evaluationManagement/basicInformation'
export default {
  data() {
    var validateNum1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入参数设置数值'))
      } else {
        if (!/^[1-9][0-9]{0,1}$/.test(value)) {
          callback(new Error('请输入1-99之间的整数'))
        } else {
          callback()
        }
      }
    }
    var validateNum2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入评估参数'))
      } else {
        if (!/^(\d{1,2}(\.\d{0,1})?|100)$/.test(value)) {
          callback(new Error('请输入0-100之间的数值'))
        } else {
          callback()
        }
      }
    }
    var validateNum3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入评估参数'))
      } else {
        if (!/^((0|\+?[1-9][0-9]{0,3}))(\.\d{1,2})?$/.test(value)) {
          callback(new Error('请输入0-9999之间的数值'))
        } else {
          callback()
        }
      }
    }
    return {
      idEdit: true,
      dynamicValidateForm: {
        prescripOption: [
          {
            id: '',
            tab: '评估报告有效期',
            title: '评估报告有效期',
            value1: '',
            value2: '',
            operator: '年'
          },
          {
            id: '',
            tab: '异常提示分值设置',
            title: '异常提示分值≥',
            value1: '',
            value2: '',
            operator: '分'
          },
          {
            id: '',
            tab: '评估任务时效设置',
            title: '从提交评估时间计,超过',
            value1: '',
            value2: '',
            operator: '天未提交报告,任务超时'
          },
          {
            id: '',
            tab: '复核评估时效设置',
            title: '评估报告生成后,',
            value1: '',
            value2: '',
            operator: '天内，可提交复核评估'
          }
        ],
        sceneOption: [
          {
            id: '',
            title: '生活自理能力权重',
            value1: '',
            value2: '',
            operator: '%'
          },
          {
            id: '',
            title: '认知能力权重',
            value1: '',
            value2: '',
            operator: '%'
          },
          {
            id: '',
            title: '情绪行为权重',
            value1: '',
            value2: '',
            operator: '%'
          },
          {
            id: '',
            title: '视觉权重',
            value1: '',
            value2: '',
            operator: '%'
          }
        ],
        adaptOption: [
          {
            id: '',
            title: '入住适应权重',
            value1: '',
            value2: '',
            operator: '%'
          }
        ],
        nurseOption: [
          {
            id: '',
            title: '正常',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '轻度',
            value1: '',
            value2: '',
            operator: ''
          },

          {
            id: '',
            title: '中度Ⅰ',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '中度Ⅱ',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '重度Ⅰ',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '重度Ⅱ',
            value1: '',
            value2: '',
            operator: ''
          }
        ],
        costsOption: [
          {
            id: '',
            title: '新申请首次评估费',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '已入住首次评估费',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '复核评估费',
            value1: '',
            value2: '',
            operator: ''
          },
          {
            id: '',
            title: '持续评估费',
            value1: '',
            value2: '',
            operator: ''
          }
        ]
      },
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2', 'baseItem_3', 'baseItem_4'],
      activeDynCollapse: ['baseItem_1_0', 'baseItem_1_1', 'baseItem_1_2', 'baseItem_1_3'],
      rulesForm: {
        value1: [
          { required: true, trigger: 'blur', message: '请输入参数设置数值' },
          { validator: validateNum1, trigger: 'blur' }
        ],
        value2: [
          { required: true, trigger: 'blur', message: '请输入评估参数' },
          { validator: validateNum2, trigger: 'blur' }
        ],
        value3: [
          { required: true, trigger: 'blur', message: '请输入评估参数' },
          { validator: validateNum3, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    handelInput(value, index) {
      if (value != '') {
        if (value.indexOf('.') > -1) {
          this.dynamicValidateForm.costsOption[index].value1 = value.slice(0, value.indexOf('.') + 3)
        } else {
          if (value > 9999) {
            this.dynamicValidateForm.costsOption[index].value1 = value.slice(0, 4)
          } else {
            this.dynamicValidateForm.costsOption[index].value1 = value
          }
        }
      }
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      // closeSelectedTag(this, this.$route)
      this.$router.push('/evaluationManagement/basicInformation/assessor')
    },
    editContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let flag = true
          this.dynamicValidateForm.nurseOption.forEach(v => {
            if (Number(v.value1) > Number(v.value2)) {
              this.$message.error('评估最低分值不得大于评估最高分值')
              return flag = false
            }
          })
          if (flag) {
            this.$confirm('确定要保存当前修改参数设置内容吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const dataList = []
              this.dynamicValidateForm.prescripOption.forEach(item => {
                dataList.push(
                  {
                    id: item.id,
                    value1: item.value1,
                    value2: item.value2
                  }
                )
              })
              this.dynamicValidateForm.sceneOption.forEach(item => {
                dataList.push(
                  {
                    id: item.id,
                    value1: item.value1,
                    value2: item.value2
                  }
                )
              })
              this.dynamicValidateForm.adaptOption.forEach(item => {
                dataList.push(
                  {
                    id: item.id,
                    value1: item.value1,
                    value2: item.value2
                  }
                )
              })
              this.dynamicValidateForm.nurseOption.forEach(item => {
                dataList.push(
                  {
                    id: item.id,
                    value1: item.value1,
                    value2: item.value2
                  }
                )
              })
              this.dynamicValidateForm.costsOption.forEach(item => {
                dataList.push(
                  {
                    id: item.id,
                    value1: item.value1,
                    value2: item.value2
                  }
                )
              })
              saveParameterSet(dataList).then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: 'success',
                    message: '保存参数成功!'
                  })
                  this.getData()
                } else {
                  this.$message({
                    type: 'error',
                    message: '保存参数失败!'
                  })
                }
              }).catch(() => {
                this.$message({
                  type: 'error',
                  message: '保存参数失败!'
                })
              })
            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // });
            })
          }
        } else {
          return false
        }
      })
    },
    getData() {
      getParameterSet().then(res => {
        if (res.code == 0) {
          if (res.data && res.data.length) {
            res.data.forEach(item => {
              this.dynamicValidateForm.prescripOption.forEach(items => {
                if (item.title === items.title) {
                  items.id = item.id
                  items.value1 = item.value1
                  return
                }
              })
              this.dynamicValidateForm.sceneOption.forEach(items => {
                if (item.title === items.title) {
                  items.id = item.id
                  items.value1 = item.value1
                  items.value2 = item.value2
                  return
                }
              })
              this.dynamicValidateForm.adaptOption.forEach(items => {
                if (item.title === items.title) {
                  items.id = item.id
                  items.value1 = item.value1
                  items.value2 = item.value2
                  return
                }
              })
              this.dynamicValidateForm.nurseOption.forEach(items => {
                if (item.title === items.title) {
                  items.id = item.id
                  items.value1 = item.value1
                  items.value2 = item.value2
                  return
                }
              })
              this.dynamicValidateForm.costsOption.forEach(items => {
                if (item.title === items.title) {
                  items.id = item.id
                  items.value1 = item.value1
                  items.value2 = item.value2
                  return
                }
              })
            })
          }
        }
      })
    },
    cancelDetailsPage() {}
  }
}
</script>
<style lang="scss" scoped>
.inforCommon{
  display:flex;
  height:36px;
  align-items: center;
  padding-left:30px;
  .el-form-item{
    margin-bottom:0!important;
  }
}
</style>
