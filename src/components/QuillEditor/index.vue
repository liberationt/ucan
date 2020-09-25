<template>
  <div class="editor-wrapper">
    <Editors id="tinymce" v-model="currentValue" :init="tinymceInit" @onChange="handleChange()" @onBlur="handleChange()" />
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { uploadFileBySign } from '@/utils/index'
import tinymce from 'tinymce/tinymce'
import 'tinymce/icons/default/icons.min.js'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import axios from 'axios'
export default {
  name: 'Editor',

  components: {
    'Editors': Editor
  },
  props: {
    editorContent: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      tinymceHtml: '',
      tinymceInit: {},
      uploadUrl: process.env.VUE_APP_BASE_API + '/admin/agency/file/upload',
      headers: {
        Authorization: 'Bearer ' + getToken() // Authorization ，而不是token
      },
      currentValue: '',
      fileList: [], // 编辑时用于展示的数据
      textRange: [],
      pics: [], // 用于提交表单的数据

      imgAddSrcArray: []// 新上传的
    }
  },

  watch: {
    editorContent(val) {
      this.setCurrentValue(val)
    }
  },
  created() {
    const that = this
    this.tinymceInit = {
      language_url: '/tinymce/zh_CN.js',
      language: 'zh_CN',
      skin_url: '/tinymce/skins/ui/oxide',
      height: 300,
      plugins: 'image link advlist table lists paste preview fullscreen',
      toolbar: 'fontselect fontsizeselect forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | imageUpload quicklink h2 h3 blockquote table numlist bullist | link unlink image code ',
      browser_spellcheck: true, // 拼写检查
      branding: false, // 去水印
      statusbar: false, // 隐藏编辑器底部的状态栏
      paste_data_images: true, // 允许粘贴图像
      images_upload_handler: (blobInfo, success, failure) => {
        if (blobInfo.blob().name) {
          const formdata = new FormData()
          formdata.set('file', blobInfo.blob())
          axios({
            method: 'post',
            url: this.uploadUrl,
            data: formdata,
            headers: {
              'Authorization': 'Bearer ' + getToken(),
              'filterMode': localStorage.getItem('dataType')
            }
          }).then(res => {
            success(`${process.env.VUE_APP_API_IMGURL}${res.data.data.fullPath}`)
          }).catch(res => {
            failure('error')
          })
        }
      }
    }
  },
  mounted() {
    this.setCurrentValue(this.editorContent)
  },

  methods: {
    // 获取富文本的内容，传给父页面
    handleChange(e) {
      this.$emit('gethtml', this.currentValue)
      const imageList = this.getEditorImage(this.currentValue)
      const data = []
      imageList.forEach((item, index) => {
        data[index] = { 'imgUrl': item }
      })
      this.$emit('pics', data)
    },
    // 富文本内容的计算属性
    setCurrentValue(value) {
      if (value) {
        if (value === this.currentValue) return
        this.currentValue = value
      }
    },
    // 获取富文本中的图片
    getEditorImage(str) {
      const imgReg = /<img.*?(?:>|\/>)/gi
      const arr = str.match(imgReg)
      const arrNew = []
      if (arr && arr.length !== 0) {
        arr.forEach((item) => {
          arrNew.push(item.substr(10, item.length - 12))
        })
      }
      return arrNew
    }
  }
}
</script>
<style>
	.hidden-region {
		display: none;
	}
</style>
