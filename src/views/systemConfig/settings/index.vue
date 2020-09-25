<template>
  <el-container>
    <el-main class="tableContainer">
      <el-collapse :value="['baseItem_1', 'baseItem_2']">
        <el-collapse-item name="baseItem_1">
          <template slot="title">
            <div class="titleSlider">
              <span>
                <i class="titleTip"></i>自定义logo
              </span>
            </div>
          </template>
          <el-form ref="form_base" key="form_base" :model="form"
            :rules="rulesForm" label-width="120px">
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item label="系统名称" prop="sysName">
                  <el-input v-model.trim="form.sysName" clearable
                    placeholder="请输入系统名称" @keyup.enter.native="submitBtn"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item label="网站标题" prop="sysTitle">
                  <el-input v-model.trim="form.sysTitle" clearable
                    placeholder="请输入网站标题" @keyup.enter.native="submitBtn"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="0">
              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item label="企业logo" prop="logo">
                  <div style="display:flex;align-items:flex-end;">
                    <div>
                      <div class="image-wrapper" style="width: 200px; height: 200px;">
                        <img v-show="form.sysLogo" :src="fullLogoUrl" style="display: block; width: 200px; height: 200px;" />
                        <div class="image-modal" v-show="form.sysLogo">
                          <i class="image-icon el-icon-delete" @click="handleLogoRemove"></i>
                        </div>
                      </div>
                      <div>图像尺寸200*200</div>
                    </div>
                    <div style="margin-left: 24px;">
                      <div>logo预览</div>
                      <div class="image-wrapper" style="width: 32px; height: 32px;">
                        <img v-show="form.sysLogo" :src="fullLogoUrl" style="display: block; width: 32px; height: 32px;" />
                      </div>
                      <div>32*32</div>
                    </div>
                  </div>
                  <el-button v-if="!form.sysLogo" @click="handleLogoUpload" size="small" type="primary">
                    上传logo <input ref="fileLogo" type="file" accept="image/jpeg,image/png" hidden @change="handleFileLogoChange" />
                  </el-button>
                </el-form-item>
              </el-col>

              <el-col :md="adaptiveGrid.md" :lg="adaptiveGrid.lg">
                <el-form-item label="网页图标" prop="icon">
                  <div style="display:flex;align-items:flex-end;">
                    <div>
                      <div class="image-wrapper" style="width: 200px; height: 200px;">
                        <img v-show="form.sysIco" :src="fullIconUrl" style="display: block; width: 200px; height: 200px;" />
                        <div class="image-modal" v-show="form.sysIco">
                          <i class="image-icon el-icon-delete" @click="handleIconRemove"></i>
                        </div>
                      </div>
                      <div>图像尺寸200*200</div>
                    </div>
                    <div style="margin-left: 24px;">
                      <div>图标预览</div>
                      <div class="image-wrapper" style="width: 16px; height: 16px;">
                        <img v-show="form.sysIco" :src="fullIconUrl" style="display: block; width: 16px; height: 16px;" />
                      </div>
                      <div>16*16</div>
                    </div>
                  </div>
                  <el-button v-if="!form.sysIco" @click="handleIconUpload" size="small" type="primary">
                    上传图标 <input ref="fileIcon" type="file" accept="image/jpeg,image/png,image/x-icon" hidden @change="handleFileIconChange" />
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="baseItem_2">
          <template slot="title">
            <div class="titleSlider">
              <span>
                <i class="titleTip"></i>其他配置
              </span>
            </div>
          </template>
          <el-form ref="form_other" key="form_other" :model="form"
            :rules="rulesForm" label-width="120px">
            <el-row :gutter="0">
              <el-col>
                <el-form-item label="政策资讯是否需要审核" prop="policyIsPermit"
                  label-width="160px">
                  <el-radio-group v-model="form.policyIsPermit">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <el-footer>
        <div>
          <el-button v-if="isEditForm" type="warning" class="base-btn" @click="submitBtn" v-has="{class: '编辑'}">确定</el-button>
          <el-button v-else type="warning" class="base-btn" @click="submitBtn" v-has="{class: '新增'}">确定</el-button>
          <el-button class="cancel-btn" @click="cancelBtn">取消</el-button>
        </div>
      </el-footer>
    </el-main>

    <el-dialog
      title="上传logo"
      width="600px"
      :visible.sync="logoDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div style="width: 300px;height: 300px;margin: 0 auto;">
        <img ref="logoCropper" :src="originLogoUrl" style="max-width: 100%;" />
      </div>
      <span slot="footer">
        <el-button @click="handleLogoDialogCancel">取消</el-button>
        <el-button @click="handleLogoDialogConfirm" type="primary" :loading="logoUploading">
          {{ logoUploading ? '上传中' : '确定' }}
        </el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="上传图标"
      width="600px"
      :visible.sync="iconDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div style="width: 300px;height: 300px;margin: 0 auto;">
        <img ref="iconCropper" :src="originIconUrl" style="max-width: 100%;" />
      </div>
      <span slot="footer">
        <el-button @click="handleIconDialogCancel">取消</el-button>
        <el-button @click="handleIconDialogConfirm" type="primary">确定</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
  import {getToken} from '@/utils/auth';
  import {adaptiveGrid_max} from '@/common/index';
  import {mapGetters} from 'vuex';
  import Cropper from 'cropperjs';
  import 'cropperjs/src/css/cropper.css';
  import ajax from './ajax';
  import {closeSelectedTag} from "@/utils/rooterJump";
  import {createUserConfig, updateUserConfig} from '@/api/systemConfig/user';
  import { menuList } from '@/api/user'
  import {validateForms, scrollToTop} from '@/utils/index';

  export default {
    data() {
      return {
        isEditForm: false,
        form: {
          sysName: '', // 系统名称
          sysTitle: '', // 站点标题
          sysLogo: '', // logo链接
          sysIco: '', // 图标链接
          policyIsPermit: null, // 政策资讯是否需要审核，0 需要 1 不需要
        },
        rulesForm: {
          sysName: [
            {max: 20, trigger: 'blur', message: '系统名称不能超过20个字符，请重新输入'}
          ],
          sysTitle: [
            {max: 20, trigger: 'blur', message: '网页标题不能超过20个字符，请重新输入'}
          ]
        },
        adaptiveGrid: adaptiveGrid_max,

        originLogoUrl: '', // 用户选择的原始图片文件Blob URL
        logoDialogVisible: false,
        logoUploading: false,
        originIconUrl: '',
        iconDialogVisible: false,
        iconUploading: false,
      }
    },

    computed: {
      ...mapGetters([
        'token',
        'sysUserConfig'
      ]),
      fullLogoUrl() {
        if (this.form.sysLogo) {
          return process.env.VUE_APP_API_IMGURL + this.form.sysLogo;
        } else {
          return '';
        }
      },
      fullIconUrl() {
        if (this.form.sysIco) {
          return process.env.VUE_APP_API_IMGURL + this.form.sysIco;
        } else {
          return '';
        }
      }
    },

    mounted() {
      let sysUserConfig = this.sysUserConfig;
      if (sysUserConfig) {
        this.isEditForm = true;
        this.form.id = sysUserConfig.id;
        this.form.sysName = sysUserConfig.sysName;
        this.form.sysTitle = sysUserConfig.sysTitle;
        this.form.sysLogo = sysUserConfig.sysLogo;
        this.form.sysIco = sysUserConfig.sysIco;
        this.form.policyIsPermit = sysUserConfig.policyIsPermit;
      }
    },

    methods: {
      imageLoadError(e) {
      },
      // 点击上传
      handleLogoUpload() {
        this.$refs.fileLogo.value = null;
        this.$refs.fileLogo.click();
      },
      // 选中上传文件
      handleFileLogoChange(ev) {
        const files = ev.target.files;
        if (!files) return;
        let file = files[0];
        let isAccepted = ['image/jpeg', 'image/png'].includes(file.type);
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isAccepted) {
          return this.$message.error('请选择png、jpg或jepg格式的文件');
        }
        if (!isLt2M) {
          return this.$message.error('文件格式不能超过2M，请重新上传');
        }

        this.originLogoUrl = window.URL.createObjectURL(file);
        this.logoDialogVisible = true;

        this.$nextTick(() => {
          let el = this.$refs.logoCropper;
          this.logoCropper = this.createCropper(el);
        });
      },
      // 点击取消
      handleLogoDialogCancel() {
        this.logoCropper.destroy();
        window.URL.revokeObjectURL(this.originLogoUrl);
        this.originLogoUrl = null;
        this.logoDialogVisible = false;
      },
      // 点击确定
      handleLogoDialogConfirm() {
        // 必须设置 maxWidth, maxHeight 为 200 限制输出尺寸为 200 * 200
        let option = {width: 200, height: 200};
        this.logoCropper.getCroppedCanvas(option).toBlob((blob) => {
          blob.name = 'logo.png';
          this.logoUploading = true;
          this.uploadFile(blob, res => {
            this.logoUploading = false;
            this.logoCropper.destroy();
            this.form.sysLogo = res.data.fullPath;
            window.URL.revokeObjectURL(this.originLogoUrl);
            this.originLogoUrl = null;
            this.logoDialogVisible = false;
          }, err => {
            this.logoUploading = false;
            this.$message.error('上传失败！');
          });
        }, 'image/png');
      },
      // 点击删除
      handleLogoRemove() {
        this.form.sysLogo = null;
      },


      handleIconUpload() {
        this.$refs.fileIcon.value = null;
        this.$refs.fileIcon.click();
      },
      handleFileIconChange(ev) {
        const files = ev.target.files;
        if (!files) return;
        let file = files[0];
        let isAccepted = ['image/jpeg', 'image/png', 'image/x-icon'].includes(file.type);
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isAccepted) {
          return this.$message.error('请选择png、jpg或jepg格式的文件');
        }
        if (!isLt2M) {
          return this.$message.error('文件格式不能超过2M，请重新上传');
        }

        this.originIconUrl = window.URL.createObjectURL(file);
        this.iconDialogVisible = true;

        this.$nextTick(() => {
          let el = this.$refs.iconCropper;
          this.iconCropper = this.createCropper(el);
        });
      },
      handleIconDialogCancel() {
        this.iconCropper.destroy();
        window.URL.revokeObjectURL(this.originIconUrl);
        this.originIconUrl = null;
        this.iconDialogVisible = false;
      },
      handleIconDialogConfirm() {
        // 必须设置 maxWidth, maxHeight 为 200 限制输出尺寸为 200 * 200
        let option = {width: 200,height: 200};
        this.iconCropper.getCroppedCanvas(option).toBlob((blob) => {
          blob.name = 'icon.png';
          this.iconUploading = true;
          this.uploadFile(blob, res => {
            this.iconUploading = false;
            this.iconCropper.destroy();
            this.form.sysIco = res.data.fullPath;
            window.URL.revokeObjectURL(this.originIconUrl);
            this.originIconUrl = null;
            this.iconDialogVisible = false;
          }, err => {
            this.iconUploading = false;
            this.$message.error('上传失败！');
          });
        }, 'image/png');
      },
      handleIconRemove() {
        this.form.sysIco = null;
      },
      //提交按钮
      submitBtn() {
        let formRefs = ['form_base', 'form_other'].map(key => this.$refs[key]);
        validateForms(formRefs).then(() => {
          if (this.form.id) {
            updateUserConfig(this.form).then(response => {
              if (response.code === 0) {
                this.getSysUserConfig();
                this.$message({
                  type: 'success',
                  message: "企业设置保存成功!"
                });
                //关闭页面，跳转到列表
                this.closeDetailsPage();
              }
              else {
                this.$message.error("企业设置操作失败，失败原因是：" + response.msg);
              }
            }).catch(() => {
              this.$message.error("企业设置操作失败!");
            });
          } else {
            createUserConfig(this.form).then(response => {
              if (response.code === 0) {
                this.getSysUserConfig();
                this.$message({
                  type: 'success',
                  message: "企业设置保存成功!"
                });
                //关闭页面，跳转到列表
                this.closeDetailsPage();
              }
              else {
                this.$message.error("企业设置操作失败，失败原因是：" + response.msg);
              }
            }).catch(() => {
              this.$message.error("企业设置操作失败!");
            });
          }
        }).catch(objectList => {
          scrollToTop();
        });
      },
      //取消按钮
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
          this.closeDetailsPage();
        }).catch(() => {});
      },
      //返回按钮，关闭详情页
      closeDetailsPage() {
        closeSelectedTag(this, this.$route);
      },

      //获取userInfo
      getSysUserConfig() {
        menuList(this.token).then(res => {
          this.$store.dispatch('user/updateSysUserConfig', res.sysUserConfig);
        }).catch(error => {
          this.$message.error('刷新企业设置失败，请刷新页面！');
        });
      },

      // 创建一个 Cropper 实例
      createCropper(el) {
        return new Cropper(el, {
          // cropperjs 配置
          viewMode: 1, // 裁剪框不超过图片
          dragMode: 'move', // 可以移动图片
          aspectRatio: 1, // 裁剪框宽高比
          cropBoxMovable: false, // 裁剪框能否移动
          cropBoxResizable: false, // 裁剪框能否重设大小
          toggleDragModeOnDblclick: false, // 双击不切换 dragMode
          minCanvasWidth: 200, // 图片最小宽度
          minCanvasHeight: 200, // 图片最小高度
          minCropBoxWidth: 200, // 裁剪框最小宽度
          minCropBoxHeight: 200, // 裁剪框最小高度
          ready() {
            // 当canvas宽高不足 200 时，缩放到 200
            let containerData = this.cropper.getContainerData();
            let canvasData = this.cropper.getCanvasData();
            if (canvasData.width < 200) {
              let ratio = 200 / canvasData.naturalWidth;
              this.cropper.zoomTo(ratio, {
                x: containerData.width / 2,
                y: containerData.height / 2
              });
            }
            if (canvasData.height < 200) {
              let ratio = 200 / canvasData.naturalHeight;
              this.cropper.zoomTo(ratio, {
                x: containerData.width / 2,
                y: containerData.height / 2
              });
            }
            this.cropper.crop();
            // 当裁剪框宽高超过 200 时，设为 200
            let {left, top, width, height} = this.cropper.getCropBoxData();
            if (width > 200) {
              left = (left * 2 + width - 200) / 2;
              width = 200;
            }
            if (height > 200) {
              top = (top * 2 + height - 200) / 2;
              height = 200;
            }
            this.cropper.setCropBoxData({
              left,
              top,
              width,
              height
            });
            this.cropper.crop();
          },
        });
      },
      // 上传文件函数
      uploadFile(rawFile, onSuccess, onError) {
        let options = {
          action: process.env.VUE_APP_BASE_API + '/admin/agency/file/upload',
          headers: {
            Authorization: 'Bearer ' + getToken()
          },
          file: rawFile,
          filename: 'file',
          onProgress: e => {
          },
          onSuccess,
          onError
        }
        ajax(options);
      }
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

  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 30px;
  }
  .image-wrapper {
    position: relative;
    background-color: #f5f7fa;
  }
  .image-modal {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
  }
  .image-wrapper:hover .image-modal {
    opacity: 1;
  }
  .image-modal::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }
  .image-icon {
    cursor: pointer;
  }
</style>

