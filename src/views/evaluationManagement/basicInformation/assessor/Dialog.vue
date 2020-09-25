<template>
  <div class="accoutDailog">
    <el-dialog v-dialogDrag title="设置评估区域" :visible="centerDialogVisible" width="10%" @close="close">
      <div>
        <el-tree
          ref="tree"
          :data="dataList"
          :props="props"
          :load="loadNode"
          lazy
          node-key="areaCode"
          :default-expanded-keys="defaultExpanded"
          :default-checked-keys="defaultChecked"
          show-checkbox
          @check-change="handleCheckChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="getData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getAddress } from '@/api/userInfoConfig/elderInfo'
import { saveArea, getArea } from '@/api/evaluationManagement/basicInformation'
export default {
  props: ['centerDialogVisible', 'closeDialog', 'pensionAssessId'],
  data() {
    return {
      props: {
        label: 'areaName',
        children: 'children',
        isLeaf: 'hasChildren'
      },
      dataList: [],
      checkedDataList: [],
      defaultExpanded: [],
      defaultChecked: []
    }
  },
  mounted() {
    getArea(this.pensionAssessId).then(res => {
      if (res.code == 0) {
        let dataList = []
        const dataCheckList = []
        if (res.data && res.data.length) {
          res.data.forEach(item => {
            item.areaCodeLevelCode = item.areaCodeLevelCode.split(',').splice(0, item.areaCodeLevelCode.split(',').length - 1) // 设置默认展开
            dataList = dataList.concat(item.areaCodeLevelCode)
            dataCheckList.push(item.areaCode)
          })
        }
        dataList = Array.from(new Set(dataList))
        this.defaultExpanded = dataList
        this.defaultChecked = dataCheckList
      }
    })
  },
  methods: {
    close() {
      this.closeDialog()
    },
    handleCheckChange(data, value) {
      // this.checkedDataList = this.$refs.tree.getCheckedNodes()
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        getAddress({ areaCode: 0, scope: 'no_committee' }).then(res => {
          const dataList = []
          if (res && res.length) {
            return resolve(res)
          }
        })
      } else {
        getAddress({ areaCode: node.data.areaCode, scope: 'no_committee' }).then(res => {
          if (res && res.length) {
            res.forEach(item => {
              res.hasChildren = !res.hasChildren
            })
            return resolve(res)
          } else {
            return resolve([])
          }
        })
      }
    },
    getData() {
      const dataList = this.$refs.tree.getCheckedNodes()
      const paramsDataList = []
      if (dataList && dataList.length) {
        dataList.forEach(item => {
          paramsDataList.push({
            areaCode: item.areaCode,
            areaCodeName: item.areaName,
            level: item.level,
            pensionAssessId: this.pensionAssessId
          })
        })
      }
      saveArea(paramsDataList).then(res => {
        if (res.code == 0) {
          this.$message.success('设置评估区域成功')
          this.closeDialog()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
