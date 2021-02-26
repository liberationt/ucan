<template>
  <el-container>
    <el-main class="tableContainer">
      <el-tabs v-model="activeTabs">
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
              <el-form
                ref="form_base"
                key="form_base"
                :model="form"
                :rules="isEditForm ? rulesForm : null"
                label-width="140px"
              >
                <el-row :gutter="0">
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm ? '所属单位' : '所属单位：'" prop="orgId">
                      <el-select
                        v-if="isEditForm"
                        v-model.trim="form.orgId"
                        placeholder="请选择所属单位"
                        filterable
                        clearable
                        remote
                        reserve-keyword
                        :remote-method="remoteMethod"
                        :loading="loading"
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      >
                        <el-option
                          v-for="item in orgLists"
                          :key="item.orgId"
                          :label="item.orgName"
                          :value="item.orgId"
                        />
                      </el-select>
                      <span v-else>{{ form.orgName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'设备编号':'设备编号：'" prop="deviceId">
                      <el-input
                        v-if="isEditForm"
                        maxlength="60"
                        v-model.trim="form.deviceId"
                        clearable
                        placeholder="请输入设备编号"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.deviceId }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'设备名称':'设备名称：'" prop="deviceName">
                      <el-input
                        v-if="isEditForm"
                        maxlength="60"
                        v-model.trim="form.deviceName"
                        placeholder="请输入设备名称"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.deviceName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'设备提供商':'设备提供商：'" prop="deviceProvider">
                      <el-input
                        v-if="isEditForm"
                        v-model.trim="form.deviceProvider"
                        maxlength="30"
                        placeholder="请输入设备提供商"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.deviceProvider }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item label="设备类型">
                      <el-select v-if="isEditForm" v-model="form.deviceType" placeholder="请选择设备类型" clearable @keyup.enter.native="submitBtn">
                        <el-option
                          v-for="item in deviceTypeList"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.deviceType === 'vedio' ? '视频' : '穿戴设备' }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg" v-if="form.deviceType === 'wearable'">
                    <el-form-item label="设备子类型">
                      <el-select v-if="isEditForm" v-model="form.deviceChildType" placeholder="请选择子类型" clearable @keyup.enter.native="submitBtn">
                        <el-option
                          v-for="item in deviceTypeListChidren"
                          :key="item.dictValue"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                      <span v-else>{{ form.deviceChildType }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'视频设备名称1':'视频设备名称1：'" prop="eqName01">
                      <el-input
                        v-if="isEditForm"
                        ref="ecCode"
                        maxlength="60"
                        v-model.trim="form.eqName01"
                        placeholder="请输入视频设备名称1"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.eqName01 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'视频设备地址1':'视频设备地址1：'" prop="eqUrl01">
                      <el-input
                        v-if="isEditForm"
                        ref="ecCode"
                        maxlength="300"
                        v-model.trim="form.eqUrl01"
                        placeholder="请输入视频设备地址1"
                        clearable
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.eqUrl01 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'视频设备名称2':'视频设备名称2：'" prop="eqName02">
                      <el-input
                        v-if="isEditForm"
                        ref="ecCode"
                        v-model.trim="form.eqName02"
                        placeholder="请输入视频设备名称2"
                        clearable
                        maxlength="60"
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.eqName02 }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                    <el-form-item :label="isEditForm?'视频设备地址2':'视频设备地址2：'" prop="eqUrl02">
                      <el-input
                        v-if="isEditForm"
                        ref="ecCode"
                        v-model.trim="form.eqUrl02"
                        placeholder="请输入视频设备地址2"
                        clearable
                        maxlength="300"
                        style="width:100%;"
                        @keyup.enter.native="submitBtn"
                      />
                      <span v-else>{{ form.eqUrl02 }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
          <el-footer>
            <div v-if="isEditForm">
              <el-button type="warning" class="base-btn" @click="submitBtn">确定</el-button>
              <el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
            </div>
            <div v-else>
              <el-button v-if="editAuthority" type="warning" class="base-btn" @click="editContent">编辑</el-button>
              <el-button class="cancel-btn" @click="closeDetailsPage">返回</el-button>
            </div>
          </el-footer>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import { orgList, addSb, getSbDe, editSb } from '../../../../api/inteligentDeviceConfig/sheibei'
import { adaptiveGrid_max, adaptiveGrid_plus } from '@/common/index'
import { validateForms } from '@/utils/index'
import { closeSelectedTag } from '@/utils/rooterJump'
export default {
  name: 'Details',
  data() {
    return {
      isEditForm: true,
      activeTabs: 'base',
      activeCollapse: ['baseItem_1'],
      adaptiveGrid: adaptiveGrid_max,
      adaptiveGrid_plus: adaptiveGrid_plus,
      editAuthority: false,
      rulesForm: {},
      form: {
        orgName: '',
        orgId: '',
        deviceId: '',
        deviceName: '',
        deviceProvider: '',
        deviceType: '',
        deviceChildType: '',
        eqName01: '',
        eqName02: '',
        eqUrl01: '',
        eqUrl02: ''
      },
      deviceTypeList: [
        {
          dictLabel: '视频',
          dictValue: 'vedio'
        }, {
          dictLabel: '穿戴设备',
          dictValue: 'wearable'
        }
      ],
      deviceTypeListChidren: [
        {
          dictLabel: '手戴',
          dictValue: '手戴'
        }, {
          ictLabel: '头戴',
          dictValue: '头戴'
        }, {
          ictLabel: '脚戴',
          dictValue: '脚戴'
        }
      ],
      orgLists: [],
      loading: false
    }
  },
  watch: {
    'form.deviceType': {
      handler() {
        if (this.form.deviceType === 'vedio') {
          this.form.deviceChildType = ''
        }
      }
    }
  },
  mounted() {
    this.modelType = this.$route.query.modelType
    const _cardId_ = this.$route.params.id || ''

    if (this.modelType === 'look') {
      // 查看时，不要调用户信息接口，直接将表格行数据带来现实
      this.isEditForm = false

      // 请求当前用户信息
      getSbDe(_cardId_).then(response => {
        if (response.code === 0) {
          if (response.data) {
            this.form = response.data
          }
        } else {
          this.$message.error(response.msg)
        }
      }).catch(() => {
        this.$message.error('获取设备失败！')
      })

      /* 编辑按钮的权限控制*/
      getEditAuthority(this.$route.query.menuId).then(response => {
        response.forEach((item) => {
          if (item.menuName === '编辑') {
            this.editAuthority = item.visible === '0'
          }
        })
      }).catch(() => {
        this.$message.error('获取编辑按钮的权限控制失败！')
      })
    } else {
      this.isEditForm = true
      this.getData(_cardId_)
    }
  },
  methods: {
    async getData(id) {
      if (this.modelType === 'edit') {
        console.log(this.$route.query.org);
        await this.orgList(this.$route.query.org)
        await this.editGetData(id)
      } else if (this.modelType === 'add') {

      }
    },
    remoteMethod(query) {
      if (query.trim() !== '') {
        this.loading = true
        this.orgList(query)
      } else {
        this.orgLists = []
      }
    },
    orgList(key) {
      return new Promise((resolve, reject) => {
        orgList({
          keyword: key
        }).then(res => {
          if (res) {
            this.orgLists = res
            this.loading = false
          }
        })
        resolve()
      })
    },
    editGetData(id) {
      return new Promise((resolve, reject) => {
        // 请求当前用户信息
        getSbDe(id).then(response => {
          if (response.code === 0) {
            if (response.data) {
              this.form = response.data
            }
          } else {
            this.$message.error(response.msg)
          }
        }).catch(() => {
          this.$message.error('获取设备失败！')
        })
      })
    },
    submitBtn() {
      const formRefs = ['form_base'].map(key => this.$refs[key])
      validateForms(formRefs).then(() => {
        const _form = _.cloneDeep(this.form)
        this.orgLists.forEach(item => {
          if (item.orgId === _form.orgId) {
            _form.orgName = item.orgName
          }
        })
        if (this.modelType === 'add' && !this.form.id) {
          addSb(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '新增设备保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('新增设备操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('新增设备操作失败!')
          })
        }
        if (this.modelType === 'edit') {
          editSb(_form).then(response => {
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: '修改设备保存成功!'
              })
              // 关闭页面，跳转到列表
              this.closeDetailsPage()
            } else {
              this.$message.error('修改设备操作失败，失败原因是：' + response.msg)
            }
          }).catch(() => {
            this.$message.error('修改设备操作失败!')
          })
        }
      })
    },
    editContent() {},
    cancelBtn() {
      this.$confirm(
        '该页面的信息尚未保存，确定要关闭页面吗',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.closeDetailsPage()
      }).catch(() => {})
    },
    // 返回按钮，关闭详情页
    closeDetailsPage() {
      // 关闭页面
      closeSelectedTag(this, this.$route)
      this.$router.push('/streetPlatform/inteligentDeviceConfig/equipment')
    },
  }
}
</script>
<style scoped>
  @import "~@/styles/form.css";

  .tableContainer {
    margin-top: 20px;
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
</style>

