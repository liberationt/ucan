<template>
  <el-container>
    <el-main class="tableContainer">
      <el-form
        ref="form_base"
        key="form_base"
        :model="form"
        label-width="140px"
      >
        <el-tabs v-model="activeTabs">
          <!--基本信息tabs start-->
          <el-tab-pane label="基本信息" name="base">
            <el-collapse v-model="activeCollapse">
              <el-collapse-item name="baseItem_1">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />基本信息
                    </span>
                  </div>
                </template>
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="姓名：" prop="fullName">
                      <span>{{ form.fullName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="身份证号：" prop="idCard">
                      <span>{{ form.idCard }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="性别：" prop="sex">
                      <span>{{ form.sex=='0'?'男':form.sex=='1'?'女':'' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="年龄：" prop="age">
                      <span>{{ form.age }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="手机号：" prop="mobile">
                      <span>{{ form.mobile }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="评估等级：" prop="assessLevel">
                      <span>{{ form.assessLevelName }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item name="baseItem_2">
                <template slot="title">
                  <div class="titleSlider">
                    <span>
                      <i class="titleTip" />评估报告
                    </span>
                  </div>
                </template>
                <div class="mainContent">
                  <div class="content">
                    <div ref="contentInfo" class="listContent">
                      <div class="listItem" style="page-break-after:always">
                        <div>
                          <h1>报告一：分值设定和照护服务分级划分</h1>
                        </div>
                        <div style="width:800px;height:400px;background:red">
                          哈哈哈是的发是的
                        </div>
                      </div>
                      <div class="listItem" style="page-break-after:always">
                        <div>
                          <h1>报告二：分值设定和照护服务分级划分</h1>
                        </div>
                        <div style="width:800px;height:400px;background:red">
                          哈哈哈是的发是的
                        </div>
                      </div>
                      <div class="listItem" style="page-break-after:always">
                        <div>
                          <h1>报告三：分值设定和照护服务分级划分</h1>
                        </div>
                        <div style="width:800px;height:400px;background:red">
                          哈哈哈是的发是的
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="turnLeft" @click="turnLeft"><img src="@/assets/images/left.png" alt=""></div>
                  <div class="turnRight" @click="turnRight"><img src="@/assets/images/right.png" alt=""></div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-footer>
        <div class="footerBtn">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base')">确定</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>
<script>
import { adaptiveGrid_max } from '@/common/index'
export default {
  data() {
    return {
      form: {

      },
      clickNumber: 0,
      activeTabs: 'base',
      activeCollapse: ['baseItem_1', 'baseItem_2'],
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      }
    }
  },
  methods: {
    turnLeft() {
      if (this.clickNumber == 0) {
        this.clickNumber = 2
      } else {
        this.clickNumber--
      }
      this.$refs.contentInfo.style.left = -800 * this.clickNumber + 'px'
    },
    turnRight() {
      if (this.clickNumber < 2) {
        this.clickNumber++
      } else {
        this.clickNumber = 0
      }
      this.$refs.contentInfo.style.left = -800 * this.clickNumber + 'px'
    },
    editContent() {

    },
    cancelDetailsPage() {

    }
  }
}
</script>
<style lang="scss" scoped>
    .mainContent{
        width:900px;
        position: relative;
        margin:50px auto;
        padding:0 50px;
    }
    .content{
        width:800px;height:600px;background:pink;
        overflow: hidden;position: relative;
    }
    .listContent{
        position: relative;
        left:0;
        width:2600px;
        height:600px;
        background: yellow;
        transition: 1s;
        .listItem{
            width:800px;
            float: left;
            text-align: center;
        }
    }
    .turnLeft{
        position: absolute;
        z-index: 1000;
        top:50%;
        left:0px;
        margin-top:-22px
    }
    .turnRight{
        position: absolute;
        top:50%;
        right:0;
        z-index: 220;
        margin-top:-22px
    }
</style>
