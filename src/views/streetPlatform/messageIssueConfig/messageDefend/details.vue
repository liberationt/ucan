<template>
  <el-container>
    <el-main class="tableContainer">
      <el-collapse v-model="activeCollapse">
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
            :rules="isEditForm ? rulesForm : null "
            label-width="140px"
          >
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '标题' : '标题：'" prop="title">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.title"
                    clearable
                    placeholder="请输入标题"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.title }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item :label="isEditForm ? '类型' : '类型：'" prop="contentType">
                  <el-select
                    v-if="isEditForm"
                    v-model="form.contentType"
                    clearable
                    style="width:100%;"
                    @keyup.enter.native="editContent"
                  >
                    <el-option
                      v-for="item in types"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                  <span v-else>{{ form.contentType }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item :label="isEditForm ? '链接地址' : '链接地址：'" prop="contentUrl">
                  <el-input
                    v-if="isEditForm"
                    v-model="form.contentUrl"
                    clearable
                    placeholder="请输入链接地址"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ form.contentUrl }}</span>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid_plus.md" :lg="adaptiveGrid_plus.lg">
                <el-form-item :label="isEditForm ? '所属区域' : '所属区域：'" prop="areaCode">
                  <Address
                    v-if="isEditForm"
                    :id-edit="idEdit"
                    :area-code="areaCode"
                    :form-code="form.areaCode"
                    :width="'100%'"
                    @getAreaCode="getAreaCode"
                    @keyup.enter.native="editContent('form_base')"
                  />
                  <span v-else>{{ address }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24" style="height:auto;">
                <el-form-item :label="isEditForm?'详细内容':'详细内容：'" prop="content">
                  <div v-if="isEditForm">
                    <QuillEditor ref="quillEditor" :editor-content="form.content" @pics="getPicList" @gethtml="getEditorHtml" />
                    <el-input ref="content" v-model="form.content" style="display: none;" />
                  </div>
                  <div v-else class="ql-container ql-snow">
                    <div class="ql-editor bizExtendContentVoDiv" v-html="form.content" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-footer>
        <div v-if="isEditForm" class="footerBtn">
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base', '1')">保存且发布</el-button>
          <el-button type="primary" class="base-btn btnMarginLeft15" @click="editContent('form_base', '0')">保存</el-button>
          <el-button class="mr" @click="cancelDetailsPage">取消</el-button>
        </div>
      </el-footer>
    </el-main>
  </el-container>
</template>

<script>
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import QuillEditor from '@/components/QuillEditor'
import { addMes, mesDetail, upDataDetail } from '@/api/esimate/esimate'
import { closeSelectedTag } from '@/utils/rooterJump'
import Address from '@/components/Address'
export default {
  name: 'MessageDefenddetails',
  components: { QuillEditor, Address },
  data() {
    return {
      isEditForm: true,
      idEdit: true,
      activeCollapse: ['baseItem_1'],
      form: {
        title: '',
        content: '',
        contentUrl: '',
        contentType: '',
        status: '',
        areaCode: ''
      },
      address: '',
      areaCode: [],
      imageInfoVos: [], // 富文本图片的集合
      rulesForm: {
        title: [
          { required: true, trigger: 'blur', message: '请填写标题！' },
          { max: 30, trigger: 'blur', message: '长度不能超过30，请重新输入' }
        ]
      },
      adaptiveGrid_plus: {
        md: adaptiveGrid_plus.md,
        lg: adaptiveGrid_plus.lg
      },
      adaptiveGrid: {
        md: adaptiveGrid_max.md,
        lg: adaptiveGrid_max.lg
      },
      types: [
        {
          dictLabel: '视频',
          dictValue: '视频'
        },
        {
          dictLabel: '公告',
          dictValue: '公告'
        }
      ]
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    const _userId_ = this.$route.params.id || ''

    if (this.modelType === 'edit') {
      this.getApplyDetail(_userId_)
    } else if (this.modelType === 'look') {
      this.isEditForm = false
      this.getApplyDetail(_userId_)
    } else if (this.modelType === 'add') {
      this.idEdit = false
    }
  },
  methods: {
    getAreaCode(val) {
      this.form.areaCode = val
    },
    // 获取详细
    getApplyDetail(id) {
      return new Promise((resolve, reject) => {
        mesDetail(id).then(res => {
          if (res.code === 0) {
            this.form = {
              id: res.data.id,
              title: res.data.title,
              content: res.data.content,
              contentUrl: res.data.contentUrl,
              contentType: res.data.contentType,
              status: res.data.status
            }
            if (this.modelType === 'edit') {
              if (res.data.areaCode) {
                this.form.areaCode = res.data.areaCode.split(',')
              }
            } else {
              this.address = res.data.areaCodeLevel
            }
            this.idEdit = false
          }
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    editContent(form, status) {
      this.form.status = status
      if (this.form.areaCode) {
        this.form.areaCode = this.form.areaCode[this.form.areaCode.length - 1]
      }
      if (this.modelType === 'add') {
        let word = ''
        if (status === '0') {
          word = '新增信息保存成功！'
        } else if (status === '1') {
          word = '新增信息保存发布成功！'
        }
        this.$refs[form].validate((valid) => {
          if (valid) {
            addMes(this.form).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: word
                })
                // 关闭页面，跳转到列表
                this.closeDetailsPage()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      } else if (this.modelType === 'edit') {
        let word = ''
        if (status === '0') {
          word = '编辑信息保存成功！'
        } else if (status === '1') {
          word = '编辑信息保存发布成功！'
        }
        this.$refs[form].validate((valid) => {
          if (valid) {
            upDataDetail(this.form).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: 'success',
                  message: word
                })
                // 关闭页面，跳转到列表
                this.closeDetailsPage()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      }
    },
    getPicList(val) {
      this.imageInfoVos = val
    },
    getEditorHtml(html) {
      this.form.content = html
    },
    cancelDetailsPage() {
      this.closeDetailsPage()
    },
    closeDetailsPage() {
      this.form = {
        title: '',
        content: '',
        contentUrl: '',
        contentType: '',
        status: ''
      }
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/messageIssueConfig/messageDefend')
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/form.css";
  .tableContainer {
    margin-top: 20px;
  }
  .beforRequired label::before{
    content: '*';
    color: #ff4949;
    display: inline-block;
    margin-right: 0px;
  }
  .bizExtendContentVoDiv > p{
    margin: 0 !important;
  }
</style>
