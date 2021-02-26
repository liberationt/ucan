<template>
  <el-dialog
    ref="dailog"
    v-dialogDrag
    :title="title"
    :visible="dialogTableVisible"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    width="30%"
    class="es-dailog account-dailog"
    @close="closeDialog"
    @open="open"
  >
    <div class="dialogmain rolrSp">
      <div class="roleList">
        <div class="rolemain">
          <el-input v-model="form.userName" placeholder="输入关键字查询" clearable @keyup.enter.native="onSubmit(1)" />
          <div class="aaa" :style="{height: heightChange}">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item,i) in tableDatas" :key="i" :label="item">{{ item.userName }}</el-checkbox>
            </el-checkbox-group>
            <!--            <el-tree-->
            <!--              ref="tree"-->
            <!--              :data="tableData"-->
            <!--              show-checkbox-->
            <!--              node-key="id"-->
            <!--              :check-strictly="true"-->
            <!--              highlight-current-->
            <!--              check-on-click-node-->
            <!--              expand-on-click-node-->
            <!--              :default-expanded-keys="checkedKeys"-->
            <!--              :default-checked-keys="checkedKeys"-->
            <!--              label="remake"-->
            <!--              :props="defaultProps"-->
            <!--              element-loading-spinner="el-icon-loading"-->
            <!--              element-loading-background="rgba(0, 0, 0, 0)"-->
            <!--              @node-expand="notInRoleUserId"-->
            <!--            />-->
          </div>
        </div>
        <div style="text-align:right;margin-top:20px;">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="sureBtn">确认</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import {
  bindUser
} from '@/api/esimate/esimate'
export default {
  name: 'EsDailog',
  props: ['dialogTableVisible', 'close', 'orgId', 'tableList', 'bindSuccess'],
  data() {
    return {
      title: '账号列表',
      closeOnPressEscape: false,
      closeOnClickModal: false,
      form: {
        userName: ''
      },
      checkList: [],
      heightChange: '210px',
      // defaultProps: {
      //   children: 'children',
      //   label: 'userName'
      // },
      tableData: [],
      checkedKeys: null || [] // 选中的菜单keys
    }
  },
  computed: {
    tableDatas() {
      const arrList = []
      this.tableList.map(item => {
        if (item.userName.indexOf(this.form.userName) !== -1) {
          arrList.push(item)
        }
      })
      return arrList
    }
  },
  mounted() {
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.dailog.$el.lastChild, function(element) {
      const height = element.offsetHeight - 256 + 'px'
      _this.$nextTick(function() {
        this.heightChange = height
      })
    })
  },
  methods: {
    closeDialog() {
      this.close()
    },
    open() {
      this.tableData = []
      this.form.userName = ''
      this.checkList = []
    },
    onSubmit(num) {},
    // notInRoleUserId(data) {
    //   if (data.isFirst === true) {
    //     this.deptId = data.deptId
    //     data.isFirst = false
    //     // this.putIntoArr(this.tableData, data.deptId)
    //     // notInRoleUserId({
    //     //   deptId: data.deptId,
    //     //   roleId: this.tableRowValue.roleId
    //     // }).then(res => {
    //     //   if (res) {
    //     //     const data = res.data
    //     //     data.forEach((item, i) => {
    //     //       if (data[i].userName) {
    //     //         data[i].deptName = data[i].userName
    //     //       }
    //     //     })
    //     //     this.getDep(this.tableData, data);
    //     //     this.putArr = []
    //     //   }
    //     // })
    //   }
    // },
    sureBtn() {
      const arr = []
      this.checkList.forEach(item => {
        const data = {}
        data.orgId = this.orgId
        data.userId = item.userId
        arr.push(data)
      })
      bindUser(arr).then(res => {
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '添加账号成功!'
          })
          this.close()
          this.bindSuccess()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.es-dailog {
  .dialogmain {
    position: relative;
    z-index:99999;
    display: flex;
    justify-content: space-between;
    .roleList {
      width: 100%;
      .el-checkbox-group{
        display: flex;
        flex-direction: column;
        .el-checkbox{
          margin-top:10px;
        }
      }
      .rolemain{
        padding:20px;
        border:1px solid #aaaaaa;
        .aaa{
          height:210px;
          overflow: auto;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .account-dailog {
    .el-dialog__body {
      overflow: visible;
    }
  }
</style>
