<!-- dialog.vue -->

<template>
  <el-dialog :title="title" :visible="dialogTableVisible" @close='closeDialog' @open="open"
             :closeOnClickModal="closeOnClickModal" :closeOnPressEscape="closeOnPressEscape" width="60%"
             :close-on-click-modal="false" v-dialogDrag class="role-dailog" ref="dailog">
    <div class="new-daillog-body" ref="dailogBody" :style="{ height: heightChange}">
      <el-container>
        <el-header>
          <h2 class="info" style="padding-top: 0;">基本信息</h2>
          <el-form ref="form" :model="form" :rules="rulesForm" label-width="80px">
            <el-row :gutter="0">
              <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
                <el-form-item label="角色名称" prop="roleName">
                  <el-input ref="roleName" v-model="form.roleName" clearable
                            placeholder="请输入角色名称" :disabled="disabled" @keyup.enter.native="submitDialog"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
                <el-form-item label="角色类型" prop="roleType">
                  <el-select ref="roleType" v-model="form.roleType" placeholder="请选择角色类型" clearable
                             :disabled="disabled"  @keyup.enter.native="submitDialog">
                    <el-option v-for="item in roleTypeOptions" :key="item.dictValue"
                               :label="item.dictLabel" :value="item.dictValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
                <el-form-item label="角色排序" prop="roleSort">
                  <el-input ref="roleSort" v-model.number="form.roleSort" clearable
                            placeholder="请输入角色排序" :disabled="disabled"  @keyup.enter.native="submitDialog"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="this.adaptiveGrid_plus.md" :lg="this.adaptiveGrid_plus.lg">
                <el-form-item label="角色状态" prop="status">
                  <el-switch class="switchStyle"
                             ref="status"
                             v-model="form.status"
                             active-text="启用"
                             inactive-text="禁用"
                             active-value="0"
                             :disabled="disabled"
                             inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="数据范围" prop="dataScope">
                  <el-radio-group v-model="form.dataScope" :disabled="disabled">
                    <el-radio :label="item.dictValue" v-for="(item, index) in dataScope" :key="index">{{item.dictLabel}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-header>
        <el-main>
          <div style="width: 50%; float:left;">
            <h2 class="info" style="padding-top: 0;">菜单权限</h2>
            <!--
              default-expand-all //是否默认展开所有节点
              highlightCurrent //是否高亮当前选中节点，默认值是 false。
              check-on-click-node //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
              default-expanded-keys //默认展开的节点的 key 的数组
              default-checked-keys //默认勾选的节点的 key 的数组
            -->
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              expand-on-click-node
              :default-expanded-keys="checkedKeys"
              :default-checked-keys="checkedKeys"
              label="remake"
              :props="defaultProps"
              @check="handleNodeClick"
              @node-click="onlyHandleNodeClick"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0)"
              @keyup.enter.native="submitDialog"
            >
            </el-tree>
          </div>
          <div style="width: 50%; float:left;" v-if="form.dataScope === '2'">
            <h2 class="info" style="padding-top: 0;">数据权限</h2>
            <el-tree
              :data="treeListData"
              show-checkbox
              node-key="deptId"
              ref="treeList"
              highlight-current
              check-on-click-node
              expand-on-click-node
              check-strictly
              :default-expanded-keys="checkedListKeys"
              :default-checked-keys="checkedListKeys"
              label="remake"
              :props="defaultListProps"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0)"
              @keyup.enter.native="submitDialog"
            >
            </el-tree>
          </div>
        </el-main>
      </el-container>
    </div>
    <div slot="footer" class="dialog-footer"  v-show="modelType !== 'look'">
      <el-button @click="closeDialog()">取 消</el-button>
      <el-button type="primary" @click="submitDialog('open')" :disabled="submitDisabled"
                 class="dailog-btn">保 存
      </el-button>
      <el-button type="primary" @click="submitDialog('close')" :disabled="submitDisabled"
                 class="dailog-btn">保存且关闭
      </el-button>
    </div>
    <div slot="footer" class="dialog-footer" v-show="modelType === 'look'">
      <el-button type="primary" @click="closeDialog()" class="dailog-btn">关 闭
      </el-button>
    </div>
    <Drawer :title="ruleTitle" :display.sync="display" :inner="true" :width="drawerWidth" :mask="false" >
      <div>
        <el-checkbox-group v-model="checkList">
           <div v-for="(item, index) in ruleData" :key="index"  style="margin-bottom: 10px">
             <el-checkbox :label="item.id" :disabled="disabled">{{item.ruleName}}</el-checkbox>
           </div>
        </el-checkbox-group>
        <div v-if="ruleData.length === 0" style="margin-bottom: 20px">
          暂无配置项
        </div>
        <div v-if="ruleData.length !== 0">
          <el-button type="primary" @click="rulesSub()" class="dailog-btn" v-show="!disabled">保 存
          </el-button>
          <el-button type="primary" @click="rulesSub('close')" class="dailog-btn" v-show="!disabled">保存且关闭
          </el-button>
        </div>
      </div>
    </Drawer>
  </el-dialog>
</template>

<script>
  import {
    getTableData,
    userPermissionsTree,
    getMenuCheckedId,
    queryRoleType,
    loadDepartmentTreeData,
    echoCheckedTreeNode,
    validateRoleName,
    addTableRowData0ne,
    editTableRowData,
    saveRules,
    getRules
  } from "@/api/systemConfig/role";
  import {
    getCharacters
  } from "@/api/systemConfig/user";
  import {adaptiveGrid_plus} from "@/common/index";
  import {allSelectdictionaryData} from '@/api/common';
  import Drawer from '@/components/Drawer/drawer'
  import {
    getRule
  } from "@/api/systemConfig/module";
  import elementResizeDetectorMaker from "element-resize-detector"
  export default {
    name: "myDialog",
    components: {
      Drawer
    },
    props: ['dialogTableVisible', 'tableRowValue', 'modelType', 'ajaxData'],//接受父模板传递的自定义属性
    data() {
      let verifyName = (rule, value, callback) => {
        let _value = value.trim();
        if (_value === '') {
          callback(new Error('角色名称不能为空，请填写！'));
        }
        else {
          let _parmas;
          if (this.modelType === "edit") {
            _parmas = {
              roleId: this.tableRowValue.roleId,
              roleName: _value
            };
          }
          else {
            _parmas = {
              roleName: _value
            };
          }

          validateRoleName(_parmas).then(response => {
            if (response === 1) {
              callback(new Error('该角色已存在！请重新输入！'));
            } else {
              callback();
            }
          })
            .catch(() => {
              callback(new Error('角色校验失败！'));
            });
        }
      };
      let checkIsNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('角色排序不能为空，请输入！'));
        }
        else {
          if (!Number.isInteger(value)) {
            callback(new Error('角色排序必须为数字类型！'));
          } else {
            callback();
          }
        }
      };
      return {
        heightChange: '50vh',
        display: false,
        drawerWidth: '300px',
        title: '',//弹框title
        submitDisabled: false,//未通过校验，则不能提交确认按钮
        validateRoleName: true,//角色名称校验
        validateRoleType: false,//角色类型校验
        disabled: false,
        form: {
          roleName: '',//角色名称
          roleType: '',//角色类型
          status: '',//角色状态
          roleSort: '',//角色排序
          dataScope: ''
        },
        //form 表单的验证规则
        rulesForm: {
          //角色名称
          roleName: [
            {required: true, trigger: ['blur'], validator: verifyName},
          ],
          //角色类型
          roleType: [
            {required: true, message: '角色类型不能为空，请选择！', trigger: 'change'},
          ],
          //角色排序
          roleSort: [
            {required: true, trigger: 'blur', validator: checkIsNumber},
          ],
        },
        roleTypeOptions: [],//角色类型
        closeOnClickModal: false,//是否可通过点击遮罩关闭
        closeOnPressEscape: false,//是否可通过按下 ESC 键关闭
        /*************************tree**************************/
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        menuIdsArr: [],//树节点数组
        checkedKeys: null || [],//选中的菜单keys
        // 数据权限
        treeListData: [],
        checkedListKeys: null || [],//选中的菜单keys
        deptIdsArr: [],// 数据权限树节点数组
        defaultListProps: {
          children: 'children',
          label: 'deptName'
        },
        //自适应
        adaptiveGrid_plus: {
          md: adaptiveGrid_plus.md,
          lg: adaptiveGrid_plus.lg
        },
        dataScope: [],
        ruleData: [],
        checkList: [],
        menuId: '',
        ruleTitle: '',
        newRoleId: ''
      };
    },
    mounted() {
      this.getDict();
      const _this = this
      const erd = elementResizeDetectorMaker()
      erd.listenTo(this.$refs.dailog.$el.lastChild, function (element) {
        let height = element.offsetHeight - 48 +'px'
        _this.$nextTick(function () {
          this.heightChange = height
          // this.$refs.dailogBody.style.height = height
        })
      })
    },
    methods: {
      // 规则确定
      rulesSub(type) {
        saveRules({
          menuId: this.menuId,
          roleId: this.newRoleId === '' ? this.tableRowValue.roleId : this.newRoleId,
          ruleIdS: this.checkList.join(',')
        }).then(res =>{
          if (res.code === 0) {
            this.$message.success('修改规则成功！')
            if (type === 'close') {
              this.display = false
            }
          } else if (res.code === 1) {
            this.$message.error('修改规则前请先保存菜单权限！')
          }
        })
      },
      // 获取已选规则
      getRuleAl() {
        getRules({
          menuId: this.menuId,
          roleId: this.tableRowValue.roleId,
        }).then(res =>{
          if (res.rules !== '-1' && res.rules !== null) {
            this.checkList = res.rules.split(',')
            this.checkList.forEach((item, index) =>{
              this.checkList[index] = parseInt(item)
            })
          }
        })
      },
      // 获取规则
      getRules(id) {
        getRule({menuId: id}).then(res =>{
          if (res.code === 0) {
            this.checkList = []
            this.getRuleAl()
            this.ruleData = res.rows
          }
        })
      },
      onlyHandleNodeClick(data, opo) {
        if (data.menuType === 'F') {
          this.ruleTitle = ''
          this.display = true;
          this.getRules(data.pid);
          this.menuId = data.id;
          this.ruleTitle = opo.parent.data.label + '-' + data.label
        }
      },
      handleNodeClick(data, allData, iii) {
        if (data.menuType === 'F') {
          if (allData.checkedKeys.indexOf(data.id) !== -1) {
            this.ruleTitle = ''
            this.$refs.tree.getCheckedKeys().forEach(item =>{
              if (data.id === item) {
                this.display = true;
                this.getRules(data.pid);
                this.menuId = data.id;
                this.ruleTitle = data.label
              }
            })
            if (allData.halfCheckedKeys.indexOf(data.pid) !== -1) {
              allData.halfCheckedNodes.forEach(item =>{
                if (item.id === data.pid) {
                  this.ruleTitle = item.label + '-' + this.ruleTitle
                }
              })
            } else {
              allData.checkedNodes.forEach(item =>{
                if (item.id === data.pid) {
                  this.ruleTitle = item.label + '-' + this.ruleTitle
                }
              })
            }
          }
        }
      },
      // 获取机构类型字典
      getDict() {
        return new Promise((resolve, reject) => {
          let dictKeys = ['data_scope'];
          allSelectdictionaryData(dictKeys).then(res => {
            let dict = res.data
            if (dict['data_scope']) {
              this.dataScope = dict['data_scope'];
            }
            resolve()
          }).catch(() => {
            reject()
          });
        });
      },
      //编辑-提交数据
      editTableRowSubmit(params, type) {
        if (this.tableRowValue !== params) {
          editTableRowData(params).then(response => {
            this.submitDisabled = false
            if (response.code === 0) {
              this.$message({
                type: 'success',
                message: response.msg
              });
              this.ajaxData()
              if (type === 'close') {
                this.closeDialog()
              }
            }
            else {
              this.$message.error(response.msg)
            }
          }).catch(() => {
            this.$message.error('操作失败！')
          })
        }
        else {
          this.$message.error('操作失败！');
        }
      },
      //添加行-提交数据
      addTableRowSubmit(params, type) {
        this.newRoleId = ''
        addTableRowData0ne(params).then(response => {
          this.submitDisabled = false
          if (response !== -1) {
            this.$message({
              type: 'success',
              message: '新增成功！'
            });
            this.newRoleId = response;
            this.ajaxData()
            if (type === 'close') {
              this.closeDialog()
            } else {
              this.$emit('type', 'edit')
              this.$emit('id', response)
              this.form.roleId = response
            }
            return false
          }
          else {
            this.$message.error('操作失败！')
            return false;
          }
        }).catch(() => {
          this.$message.error('操作失败！');
          return false;
        })
      },
      //取消关闭弹框
      closeDialog() {
        this.form = {
          roleName: '',//角色名称
          roleType: '',//角色类型
          status: '',//角色状态
          roleSort: '',//角色排序
        };
        this.treeData = [];
        this.checkedKeys = [];
        // 数据权限
        this.treeListData = [];
        this.checkedListKeys = [];
        this.$nextTick(() => {
          //this.$refs['form'].resetFields();
          this.$refs['form'].clearValidate();
        });
        this.display = false
        this.$emit('dialogHide', 'false');
      },
      // 确认，提交表单
      submitDialog(type) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.form.dataScope === '2') {
              if (this.$refs.treeList.getCheckedKeys().length === 0) {
                this.$message.warning('数据权限为空，请选择数据权限')
                return false
              }
            }

            this.menuIdsArr = this.$refs.tree.getCheckedKeys(true).join(',')
            this.form.dataScope === '2' ? this.deptIdsArr = this.$refs.treeList.getCheckedKeys().join(',') : this.deptIdsArr = this.deptIdsArr
            this.submitDisabled = true
            //编辑
            if (this.modelType === 'edit') {
              let params = {
                roleId: this.form.roleId,
                roleName: this.$refs.roleName.value,
                roleType: this.$refs.roleType.value,
                status: this.$refs.status.value,
                roleKey: this.form.roleKey || '',
                roleSort: this.$refs.roleSort.value,
                menuIds: this.menuIdsArr,
                deptIds: this.deptIdsArr, // 数据权限ID
                dataScope: this.form.dataScope
              };
              this.editTableRowSubmit(params, type);
            }
            //新增
            else {
              let params = {
                roleName: this.$refs.roleName.value,
                roleType: this.$refs.roleType.value,
                status: this.$refs.status.value,
                roleKey: this.form.roleKey || '',
                roleSort: this.$refs.roleSort.value,
                menuIds: this.menuIdsArr,
                deptIds: this.deptIdsArr, // 数据权限ID
                dataScope: this.form.dataScope
              };
              this.addTableRowSubmit(params, type)
            }
          }
          else {
            return false;
          }
        });
      },
      // 查看状态时，树不可编辑
      treeDisabled(arr) {
        arr.forEach((item, index) => {
          arr[index].disabled = true
          if (arr[index].children !== null && arr[index].hasChildren === true) {
            this.treeDisabled(arr[index].children)
          }
        })
      },
      //打开的回调
      open() {
        //通过数据字典请求角色类型的值
        let paramsRoleType = {dictType: 'role_type'};
        queryRoleType(paramsRoleType).then(response => {
          this.roleTypeOptions = response.rows;
        }).catch(() => {
          this.$message.error('角色类型请求失败！');
        });
        this.treeLoading = true;
        if (this.modelType === 'edit') {
          this.title = '编辑角色';
          //this.submitDisabled = false;
          this.form = {
            roleId: this.tableRowValue.roleId || '',
            roleName: this.tableRowValue.roleName || '',
            roleType: this.tableRowValue.roleType || '',
            status: this.tableRowValue.status || '0',
            roleSort: parseInt(this.tableRowValue.roleSort) || '',//角色排序
            dataScope: this.tableRowValue.dataScope ?  this.tableRowValue.dataScope : '1'
          };
          this.disabled = false
        } else if (this.modelType === "look"){
          this.title = "查看详情"
          this.form = {
            roleId: this.tableRowValue.roleId || '',
            roleName: this.tableRowValue.roleName || '',
            roleType: this.tableRowValue.roleType || '',
            status: this.tableRowValue.status || '0',
            roleSort: parseInt(this.tableRowValue.roleSort) || '',//角色排序
            dataScope: this.tableRowValue.dataScope ?  this.tableRowValue.dataScope : '1'
          };
          this.disabled = true
        } else {
          this.title = '新增角色';
          //this.submitDisabled = true;
          this.form = {
            roleId: this.tableRowValue.roleId || '',
            roleName: this.tableRowValue.roleName || '',
            // roleType: this.tableRowValue.roleType || 'custom_role',
            roleType: this.tableRowValue.roleType || '',
            status: this.tableRowValue.status || '0',
            roleSort: '',//角色排序
            dataScope: '1'
          };
          this.disabled = false
        }

        //请求树菜单
        setTimeout(() => {
          userPermissionsTree().then(response => {
            this.treeData = response || [];
            if (this.modelType === "look") {
              this.treeDisabled(this.treeData)
            }
            //请求树菜单成功后，再请求选中的菜单id集合
            setTimeout(() => {
              let _params = {roleId: this.tableRowValue.roleId || ''};
              getMenuCheckedId(_params).then(response => {
                this.checkedKeys = response || [];
              }).catch(() => {
                setTimeout(() => {
                }, 1000);
              });
            }, 500);
          }).catch(() => {
            setTimeout(() => {
            }, 1000);
          });
          // 数据权限
          let parmas = {status: 0, isRole: true};
          loadDepartmentTreeData(parmas).then(response => {
            if (response) {
              getCharacters().then(res => {
                if (res === true) {
                  response[0].disabled = false
                  this.treeListData = response || [];
                } else {
                  if (response[0].deptId === 1) {
                    response[0].disabled = true
                  }
                  this.treeListData = response || [];
                }
                if (this.modelType === "look") {
                  this.treeDisabled(this.treeListData)
                }
              })
              //请求树菜单成功后，再请求选中的菜单id集合
              if (this.tableRowValue.roleId) {
                echoCheckedTreeNode(this.tableRowValue.roleId).then(response => {
                  this.checkedListKeys = response || [];
                }).catch(() => {
                  setTimeout(() => {
                  }, 1000);
                })
              }
            }
          }).catch(() => {
            setTimeout(() => {
            }, 1000);
          });
        }, 200);
      }
    }
  };
</script>

<style scoped>
  .el-dialog__wrapper {
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }

  .el-row {
    margin: 0 !important;
  }

  .el-select, .el-date-editor {
    width: 100% !important;
  }

  .el-header {
    padding-left: 0;
    padding-right: 0;
  }

  .el-tree {
    padding-left: 30px;
    /*background: #f1f5f8;*/
    margin-bottom: 20px;
  }

  .menuLabel {
    font-size: 14px;
    color: #606266;
    font-weight: 700;
    padding-left: 5px;
  }
</style>
<style lang="scss">
  .role-dailog {
    .el-dialog__body {
      overflow: visible;
      padding:  0 0;
      .new-daillog-body {
        height: 50vh;
        padding: 20px 36px 66px 36px;
        overflow: auto;
        .el-main {
          overflow: visible;
        }
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
