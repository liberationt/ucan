<template>
  <div>
    <el-dialog
      ref="dailog"
      v-dialogDrag
      title="分配账号"
      width="1000px"
      :visible="dialogTableVisible"
      :close-on-click-modal="false"
      class="account-dailog"
      @close="closeDialog"
      @open="open"
    >
      <div class="dialogmain rolrSp">
        <div class="roleList">
          <p>账号列表</p>
          <div class="rolemain">
            <el-input v-model="params.userName" placeholder="输入关键字查询" clearable @keyup.enter.native="onSubmit(1)" />
            <div class="aaa" :style="{height: heightChange}">
              <el-tree
                ref="tree"
                :data="tableData"
                show-checkbox
                node-key="id"
                :check-strictly="true"
                highlight-current
                check-on-click-node
                expand-on-click-node
                :default-expanded-keys="checkedKeys"
                :default-checked-keys="checkedKeys"
                label="remake"
                :props="defaultProps"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0)"
                @node-expand="notInRoleUserId"
                @keyup.enter.native="submitDialog"
              />
            </div>
          </div>
        </div>
        <div class="confirm">
          <div @click="addAccount"><i class="el-icon-plus" /></div>
          <div @click="delAccount"><i class="el-icon-minus" /></div>
        </div>
        <div class="chexkedList">
          <p>已选账号</p>
          <div class="checkedmain">
            <el-input v-model="checkedName" placeholder="输入关键字查询" clearable @keyup.enter.native="onSubmit(2)" />
            <div class="aaa" :style="{height: heightChange}">
              <el-checkbox-group v-model="checkList">
                <el-checkbox v-for="(item,i) in accountDatas" :key="i" :label="item">{{ item.deptName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:right;margin-top:20px;">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="sureBtn">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTableData,
  getCheckedList,
  saveCheckedList,
  validateRoleName
} from '@/api/systemConfig/role'
import {
  loadDepartmentTreeData,
  notInRoleUserId,
  searchIt,
  accountList
} from '@/api/systemConfig/department'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: 'AccountDailog',
  props: ['dialogTableVisible', 'tableRowValue'],
  data() {
    return {
      roleName: '',
      checkedName: '',
      checkListList: [],
      ruleList: [],
      checkList: [],
      dataList: [],
      defaultList: [],
      state1: '',
      total: '',
      params: {
        userName: ''// 关键字查询-角色名称
      },
      // my
      tableData: [],
      form: {
        status: '', // 部门状态
        deptName: '', // 关键字查询-部门名称
        pageNum: 1, // 当前页码
        pageSize: 10// 每页显示的数据数量
      },
      checkedKeys: null || [], // 选中的菜单keys
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      deptId: '',
      accountData: [],
      firstData: [],
      putArr: [],
      heightChange: '210px'
    }
  },
  computed: {
    accountDatas() {
      if (this.accountData.length !== 0) {
        const arrList = []
        this.accountData.map(item => {
          if (item.deptName.indexOf(this.checkedName) != -1) {
            arrList.push(item)
          }
        })
        return arrList
      }
    }
  }, // 接受父模板传递的自定义属性
  watch: {
    dialogTableVisible: {
      handler(newName, oldName) {
        if (this.tableRowValue !== '') {
          this.getData()
          this.accountList()
        }
      },
      immediate: true,
      deep: true
    },
    tableRowValue: {
      handler(newName, oldName) {
        if (this.tableRowValue !== '') {
          this.accountList()
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // this.getData()
    const _this = this
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.dailog.$el.lastChild, function(element) {
      const height = element.offsetHeight - 306 + 'px'
      _this.$nextTick(function() {
        this.heightChange = height
      })
    })
  },
  methods: {
    // 提交表单
    sureBtn() {
      const arrDel = JSON.parse(JSON.stringify(this.firstData))
      const arrAdd = JSON.parse(JSON.stringify(this.accountData))
      const newArr = []
      // 删除id
      this.firstData.forEach((item, index) => {
        for (let i = 0; i < this.accountData.length; i++) {
          if (item.userId === this.accountData[i].userId) {
            arrDel[index] = ''
          }
        }
      })
      this.accountData.forEach((item, index) => {
        for (let i = 0; i < this.firstData.length; i++) {
          if (item.userId === this.firstData[i].userId) {
            arrAdd[index] = ''
          }
        }
      })
      arrDel.forEach(item => {
        if (item !== '') {
          const delModel = {
            userId: '',
            roleId: this.tableRowValue.roleId,
            mark: 'role',
            type: 'del'
          }
          delModel.userId = item.userId
          newArr.push(delModel)
        }
      })
      arrAdd.forEach(item => {
        if (item !== '') {
          const addModel = {
            userId: '',
            roleId: this.tableRowValue.roleId,
            mark: 'role',
            type: 'add'
          }
          addModel.userId = item.userId
          newArr.push(addModel)
        }
      })
      saveCheckedList(newArr).then(res => {
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
          this.closeDialog()
        }
      })
    },
    // 添加账户递归去除已选的账号
    filterAddAccount(arr, newArr) {
      newArr.forEach((item, index) => {
        for (let i = 0; i < arr.length; i++) {
          if (item.userId === arr[i].userId) {
            arr.splice(i, 1)
          } else {
            if (arr[i].children && arr[i].children.length > 0) {
              this.filterAddAccount(arr[i].children, newArr)
            }
          }
        }
      })
    },
    // 添加账户
    addAccount() {
      if (this.$refs.tree.getCheckedNodes().length !== 0) {
        const arr = this.$refs.tree.getCheckedNodes()
        this.accountData = this.accountData.concat(arr)
        this.filterAddAccount(this.tableData, arr)
      } else {
        this.$message.error('未选择任何账号！')
      }
    },
    // 删除账户递归添加删除的账号
    filterDelAccount(arr, newArr) {
      newArr.forEach((item, index) => {
        for (let i = 0; i < arr.length; i++) {
          if (item.deptId === arr[i].deptId) {
            arr[i].children.push(item)
            arr[i].children = JSON.parse(JSON.stringify(arr[i].children))
          } else {
            if (arr[i].children && arr[i].children.length > 0) {
              const arrs = []
              arrs.push(item)
              this.filterDelAccount(arr[i].children, arrs)
            }
          }
        }
      })
    },
    // 删除账户
    delAccount() {
      if (this.checkList.length !== 0) {
        const arr = this.checkList
        arr.forEach(item1 => {
          this.accountData = this.accountData.filter(item2 => item2.userId !== item1.userId)
        })
        this.filterDelAccount(this.tableData, this.checkList)
        this.tableData = this.tableData
        this.checkList = []
      } else {
        this.$message.error('未选择任何账号！')
      }
    },
    // 账户列表
    accountList() {
      accountList(this.tableRowValue.roleId).then(res => {
        if (res) {
          this.accountData = res.data
          this.firstData = res.data
        }
      })
    },
    // 递归查找选择账户
    delDep(arr, data) {
      arr.forEach((item, i) => {
        if (item.deptId === this.deptId) {
          for (let j = 0; j < arr[i].children.length; j++) {
            if (arr[i].children[j].userName) {
              arr[i].children.splice(j, arr[i].children.length - j)
              if (arr[i].children.length === 0) {
                arr[i].children = [{ deptName: '', children: null, isLast: true }]
              }
            }
          }
        } else {
          if (arr[i].children) {
            this.delDep(arr[i].children, data)
          }
        }
      })
    },
    // 删除重置
    delData(data) {
      this.deptId = data.deptId
      this.delDep(this.tableData, data)
    },
    // 递归查找选择部门
    getDep(arr, data) {
      arr.forEach((item, i) => {
        if (item.deptId === this.deptId) {
          arr[i].children = arr[i].children.concat(data)
          if (arr[i].children[0].deptName === '') {
            arr[i].children.splice(0, 1)
          }
        } else {
          if (arr[i].children) {
            this.getDep(arr[i].children, data)
          }
        }
      })
    },
    // 点击子数据 如果没有这条数据把他插进去
    // putIntoArr(arr,id) {
    //   arr.forEach((item, index) =>{
    //     if (item.deptId === id) {
    //       item.children.forEach(list =>{
    //         if (list.deptName !== '') {
    //           this.putArr.push(list)
    //         }
    //       })
    //     } else {
    //       if (item.children && item.children !== null) {
    //         this.putIntoArr(item.children,id)
    //       }
    //     }
    //   })
    // },
    // 账号列表
    notInRoleUserId(data) {
      if (data.isFirst === true) {
        this.deptId = data.deptId
        data.isFirst = false
        // this.putIntoArr(this.tableData, data.deptId)
        notInRoleUserId({
          deptId: data.deptId,
          roleId: this.tableRowValue.roleId
        }).then(res => {
          if (res) {
            const data = res.data
            data.forEach((item, i) => {
              if (data[i].userName) {
                data[i].deptName = data[i].userName
              }
            })
            this.getDep(this.tableData, data)
            this.putArr = []
          }
        })
      }
    },
    // 循环遍历加disabled
    addDisabled(arr) {
      arr.forEach((item, i) => {
        arr[i].disabled = true
        arr[i].isFirst = true
        if (arr[i].hasChildren) {
          this.addDisabled(arr[i].children)
        } else {
          arr[i].children = [{ deptName: '', children: null, isLast: true }]
        }
      })
    },
    getData(data) {
      loadDepartmentTreeData(data).then(response => {
        this.tableData = response
        this.addDisabled(this.tableData)
        this.tableData = JSON.parse(JSON.stringify(this.tableData))
        this.loadingReset = false
        this.loadingSubmit = false
      }).catch(() => {
        this.$message.error('请求失败！')
        setTimeout(() => {
          this.loadingReset = false
          this.loadingSubmit = false
        }, 1000)
      })
    },
    open() {
      this.params.userId = this.tableRowValue.userId
      getCheckedList(this.tableRowValue.userId).then(res => {
        this.checkListList = res
        this.defaultList = res
      })
      getTableData(this.params).then(res => {
        if (res.code == 0) {
          this.dataList = res.rows
        }
      }).catch(err => {

      })
    },
    closeDialog() {
      this.$nextTick(() => {
        this.roleName = ''
        this.checkedName = ''
        this.ruleList = []
        this.checkListList = []
        this.checkList = []
        this.dataList = []
        this.params = {
          roleName: '', // 关键字查询-角色名称
          userId: ''
        }
      })
      this.$emit('dialogHides')
    },
    handleSelect(item) {
    },
    // 搜索
    onSubmit(num) {
      if (num !== 2) {
        searchIt(this.params).then(res => {
          this.tableData = res
          this.addDisabled(this.tableData)
          this.tableData = JSON.parse(JSON.stringify(this.tableData))
        }).catch(err => {

        })
      }
    }
  }
}
</script>
<style lang="scss">
  .dialogmain{
    position: relative;
    z-index:99999;
    display: flex;
    justify-content: space-between;
    .roleList,.chexkedList{
      width:44%;
      .el-checkbox-group{
        display: flex;
        flex-direction: column;
        .el-checkbox{
          margin-top:10px;
        }
      }
      .rolemain,.checkedmain{
        padding:20px;
        border:1px solid #aaaaaa;
        .aaa{
          height:210px;
          overflow: auto;
          margin-top: 10px;
        }
      }
    }
    .confirm{
      width:12%;
      padding-top:100px;
      div{
        width:40px;
        height:40px;
        text-align: center;
        line-height: 40px;
        margin: 30px auto;
        border:1px solid #aaaaaa;
        font-size:28px;
        cursor: pointer;
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
