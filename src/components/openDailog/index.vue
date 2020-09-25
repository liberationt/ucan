<template>
  <el-dialog
    ref="dailog"
    v-dialogDrag="false"
    :title="title"
    :visible="dialogTableVisible"
    :width="width"
    class="all-dailog"
    :close-on-click-modal="false"
    @close="close"
    @open="open"
  >
    <div class="all-dailog-body" :style="{ height: heightChange }">
      <slot name="content" />
    </div>
    <div slot="footer" class="dialog-footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: 'Index',
  props: ['dialogTableVisible', 'close', 'open', 'title', 'width', 'height'], // 接受父模板传递的自定义属性
  data() {
    return {
      heightChange: ''
    }
  },
  mounted() {
    const _this = this
    const erd = elementResizeDetectorMaker()
    const borderHeight = this.height ? this.height : 48
    erd.listenTo(this.$refs.dailog.$el.lastChild, function(element) {
      const height = element.offsetHeight - borderHeight + 'px'
      _this.$nextTick(function() {
        this.heightChange = height
        // this.$refs.dailogBody.style.height = height
      })
    })
  }
}
</script>

<style lang="scss">
  .all-dailog {
    .el-dialog {
      min-width: auto;
    }
    .el-dialog__body {
      overflow: visible;
      padding:  0 0;
      .all-dailog-body{
        padding: 20px 36px 56px 36px;
        overflow: auto;
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
