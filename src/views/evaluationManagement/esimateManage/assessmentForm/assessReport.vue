<template>
  <div>
    <el-container>
      <el-main class="tableContainer">
        <div style="width:80%;margin:0 auto">
          <div>
            <div style="text-align:center">
              <h3>报告一：分值设定和照护服务分级划分</h3>
            </div>
            <div class="reportContet">
              <div class="item">
                <div class="reportTit">报告一：分值设定和照护服务分级划分</div>
                <div class="items">
                  <div v-for="(item,i) in form.careService" :key="i" style="display:flex;">
                    <div class="itemList">{{ item.level }}</div>
                    <div class="itemList">{{ item.score }}</div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="reportTit">报告一：分值设定和照护服务分级划分</div>
                <div class="items">
                  <div style="display:flex;height:50%;border-bottom:1px solid #e3e3e3">
                    <div class="itemList1" :style="{lineHeight:length*20 + length/2+'px'}">评估总分</div>
                    <div
                      class="itemList1"
                      :style="{lineHeight:length*20+length/2+'px',borderLeft:'1px solid #e3e3e3'}"
                    >{{ form.assessInfo.assessScore }}</div>
                  </div>
                  <div style="display:flex;height:50%;">
                    <div class="itemList1" :style="{lineHeight:length*20 + length/2+'px'}">照护等级</div>
                    <div
                      class="itemList1"
                      :style="{lineHeight:length*20+length/2+'px',borderLeft:'1px solid #e3e3e3'}"
                    >{{ form.assessInfo.assessCareLevel }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top:60px">
            <div style="text-align:center">
              <h3>报告二：照护项目分析及服务建议</h3>
            </div>
            <el-table :data="form.assessObjExtendList" border style="width: 100%">
              <el-table-column prop="itemName" label="现有疾病" align="center" min-width="180" />
              <el-table-column prop="remark" min-width="500" label="照护建议" />
            </el-table>
            <el-table :data="form.abnormalOptions" border style="width: 100%;margin-top:30px;">
              <el-table-column prop="project" label="评估项目" align="center" min-width="180" />
              <el-table-column prop="value" min-width="500" label="项目分析">
                <template scope="{row}">
                  <div v-for="(item,i) in row.value" :key="i" style="padding:20px;">
                    <div style="bottom-bottom:1px solid red">{{ item.subjectTitle }}</div>
                    <!-- style="text-indent:20px" -->
                    <!-- <div>异常提示：{{ item.optionDes }}</div>
                      <div>照护建议：{{ item.careAdvice }}</div> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="value" min-width="500" label="照护建议">
                <template scope="{row}">
                  <div v-for="(item,i) in row.value" :key="i" style="margin-bottom:20px">
                    <!-- <span>题目{{ i+1 }}：{{ item.subjectTitle }}</span> -->
                    <!-- style="text-indent:20px" -->
                    <!-- <div>异常提示：{{ item.optionDes }}</div> -->
                    <!-- <div>照护建议：{{ item.careAdvice }}</div> -->
                    <div>{{ item.careAdvice }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <div />
            </div>
          </div>
        </div>
        <div style="text-align:right;margin-top:50px;">
          <el-button @click="returnGo">取消</el-button>
          <el-button type="primary" @click="submitReport">确定提交并生成评估报告</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
getPreviewAssess
import { getPreviewAssess, savePreview } from '@/api/evaluationManagement/assessmentForm'
export default {
  data() {
    return {
      length: 0,
      form: {
        careService: [],
        assessInfo: {
          assessScore: '',
          assessCareLevel: ''
        },
        tableData1: [],
        tableData2: []
      },
      assessId: ''
    }
  },
  mounted() {
    this.assessId = this.$route.params.id
    getPreviewAssess({ assessId: this.assessId }).then((res) => {
      if (res.code == 0) {
        this.form = res.data
        this.length = res.data.careService.length
      }
    })
  },
  methods: {
    returnGo() {
      this.$router.go(-1)
    },
    submitReport() {
      this.$confirm(
        ' 提交后，将生成评估报告，评估信息不可再编辑，确定提交吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        savePreview({ assessId: this.assessId }).then((res) => {
          if (res.code == 0) {
            this.$message.success('评估报告生成成功')
            this.$router.push('/evaluationManagement/esimateManage/assessmentForm')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reportContet {
  border: 1px solid #e3e3e3;
  display: flex;
  .reportTit {
    text-align: center;
    line-height: 60px;
    background: #f0f3f9;
    border-right: 1px solid #e3e3e3;
  }
}
.item {
  width: 50%;
  height: 50%;
}
.items {
  display: flex;
  flex-direction: column;
}
.itemList {
  width: 50%;
  text-align: center;
  border-top: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  height: 100%;
  line-height: 40px;
}
.itemList1 {
  width: 50%;
  text-align: center;
  line-height: 100%;
}
</style>
