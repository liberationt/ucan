<template>
    <div>
        <el-dialog
			title="角色配置"
			width="1000px"
			:visible="dialogTableVisible"
			@close="closeDialog"
			@open="open"
			:close-on-click-modal="false"
			v-dialogDrag
      ref="dailog"
      class="account-dailog"
	    >
            <div class="dialogmain">
                <div class="roleList">
                    <p>角色列表</p>
                    <div class="rolemain" >
                        <el-input placeholder="输入关键字查询" v-model="params.roleName" clearable></el-input>
                        <div class="aaa" :style="{height: heightChange}">
                                <el-checkbox-group v-model="ruleList">
                                    <el-checkbox :label="item" v-for="(item,i) in dataLists" :key="i">{{item.roleName}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                    </div>
                </div>
                <div class="confirm">
                    <div @click="addrole"><i class="el-icon-plus"></i></div>
                    <div @click="deleted"><i class="el-icon-minus"></i></div>
                </div>
                <div class="chexkedList">
                    <p>已选角色</p>
                    <div class="checkedmain">
                        <el-input placeholder="输入关键字查询" v-model="checkedName" clearable ></el-input>
                        <div class="aaa" :style="{height: heightChange}">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox :label="item" v-for="(item,i) in checkListLists" :key="i">{{item.roleName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align:right;margin-top:20px;">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
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
	} from "@/api/systemConfig/role";
import elementResizeDetectorMaker from "element-resize-detector"
export default {
	props: ["dialogTableVisible","tableRowValue","ajaxData"], //接受父模板传递的自定义属性
    data(){
        return{
            roleName:'',
            checkedName:'',
            checkListList:[],
            ruleList:[],
            checkList:[],
            dataList:[],
            defaultList:[],
            state1:'',
            total:'',
            params:{
                roleName: '',//关键字查询-角色名称
                userId:''
            },
            heightChange: '210px',
        }
    },
    computed: {
        dataLists() {
            let arrList =[]
            this.dataList.map(item=>{
                if(item.roleName.indexOf(this.params.roleName)!=-1){
                    arrList.push(item)
                }
            })
            return arrList;
        },
        checkListLists() {
            let arrList=[]
            this.checkListList.map(item=>{
                if(item.roleName.indexOf(this.checkedName)!=-1){
                    arrList.push(item)
                }
            })
            return arrList;
        }

    },
    methods:{
        open(){
            this.params.userId = this.tableRowValue.userId
            getCheckedList(this.tableRowValue.userId).then(res=>{
                this.checkListList = res
                this.defaultList = res
            })
            getTableData(this.params).then(res=>{
                if(res.code==0){
                    this.dataList = res.rows
                }
            }).catch(err=>{

            })
        },
        closeDialog(){
            this.$nextTick(() => {
                this.roleName=''
                this.checkedName=''
                this.ruleList=[]
                this.checkListList=[]
                this.checkList=[]
                this.dataList=[]
                this.params={
                    roleName: '',//关键字查询-角色名称
                    userId:''
                }
            });
            this.$emit("dialogHides");
        },
        handleSelect(item){
        },
        // 确认提交
        confirm(){
            // this.$confirm('确定修改？', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         this.datahandel()
            //     }).catch(() => {
            // })
            this.datahandel()
        },
        //数据处理
        datahandel(){
            //得到的初始数据
            let defaultList =[]
            //删除的数据
            let deletedList = []
            //相同的数据
            let sameList = []
            this.checkListList.forEach(item=>{
               defaultList.push({
                   userId:this.tableRowValue.userId,
                   roleId:item.roleId,
                   mark:'user',
                   type:''
               })
            })
            this.defaultList.forEach(item1=>{
                defaultList=defaultList.filter(item2=>item2.roleId!==item1.roleId)
            })
            this.defaultList.forEach(item1=>{
                sameList=sameList.concat(this.checkListList.filter(item2=>item1.roleId==item2.roleId))
            })
            if(sameList.length){
                for(var i = 0; i < this.defaultList.length; i++){
                    var obj = this.defaultList[i];
                    var num = obj.roleId;
                    var isExist = false;
                    for(var j = 0; j < sameList.length; j++){
                        var aj = sameList[j];
                        var n = aj.roleId;
                        if(n == num){
                            isExist = true;
                            break;
                        }
                    }
                    if(!isExist){
                        deletedList.push({
                            userId:this.tableRowValue.userId,
                            roleId:obj.roleId,
                            mark:'user',
                            type:'del'
                        });
                    }
                }
            }else{
                this.defaultList.forEach(item=>{
                    deletedList.push({
                        userId:this.tableRowValue.userId,
                        roleId:item.roleId,
                        mark:'user',
                        type:'del'
                    })
                })
            }
            defaultList.forEach(item=>item.type="add")
            let dataList = defaultList.concat(deletedList)
            saveCheckedList(dataList).then(res=>{
                if(res.code==0){
                    this.$message({
                        showClose: true,
                        message: '操作成功',
                        type: 'success'
                    });
                    this.ajaxData()
                    this.closeDialog()
                }
            })
        },
        //添加
        addrole(){
            this.checkListList =this.checkListList.concat(this.ruleList)
            this.ruleList.forEach(item1 => {
                this.dataList = this.dataList.filter(item2 => item2.roleId !== item1.roleId);
            });
            this.ruleList=[]
        },
        //删除
        deleted(){
            let arrList=[]
            let arrLists = this.checkListList
            this.checkList.forEach(item1 => {
                this.checkListList = this.checkListList.filter(item2 => item2.roleId !== item1.roleId);
                arrList=arrList.concat(arrLists.filter(item2 => item2.roleId === item1.roleId))
            });
            this.dataList = this.dataList.concat(arrList)
            arrList=[]
        }
    },
    mounted(){
      const _this = this
      const erd = elementResizeDetectorMaker()
      erd.listenTo(this.$refs.dailog.$el.lastChild, function (element) {
        let height = element.offsetHeight - 306 +'px'
        _this.$nextTick(function () {
          this.heightChange = height
          // this.$refs.dailogBody.style.height = height
        })
      })
    }
}
</script>
<style lang="scss" scoped>
    .dialogmain{
        position: relative;
        z-index:99999;
        display: flex;
        justify-content: space-between;
        .roleList,.chexkedList{
            width: 44%;
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
                  margin-top: 10px;
                  overflow: auto;
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
