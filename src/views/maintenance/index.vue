<!-- index.vue -->
<template>
	<el-container>
		<!--查询表单-->
		<el-header class="formDiv">
			<el-form :inline="true" :model="form" class="demo-form-inline">
				<el-form-item label="所属区域">
					<Address :area-code="areaCode" :form-code="form.areaCode" @getAreaCode="getAreaCode"
					         :id-edit="idEdit"
					         :width="'200px'" @keyup.enter.native="onSubmit"></Address>
				</el-form-item>

				<el-form-item label="所属账号">
                    <el-input
                        clearable
                        v-model="form.accountNumber"
                        placeholder="请输入账户"
                        style="width: 200px"
					></el-input>
				</el-form-item>
                <el-form-item label="服务日期">
                  <el-date-picker
                    v-model="signDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
				</el-form-item>
			</el-form>
            <div class="systemMagger">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="志愿者服务记录管理" name="1">
                        <div class="paddings">
						    <el-button type="primary" @click="deleteList('r',1)">按区域清除</el-button>
						    <el-button type="primary" @click="deleteList('r',2)">按账号清除</el-button>
						    <el-button type="primary" @click="deleteList('r',3)">按服务日期清除</el-button>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="志愿者服务对象管理" name="2">
                        <div class="paddings">
						    <el-button type="primary"  @click="deleteList('o',1)">按区域清除</el-button>
						    <el-button type="primary"  @click="deleteList('o',2)">按账号清除</el-button>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="志愿者管理" name="3">
                        <div class="paddings">
						    <el-button type="primary"  @click="deleteList('v',1)">按区域清除</el-button>
						    <el-button type="primary"  @click="deleteList('v',2)">按账号清除</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

		</el-header>
        <div class="systemMaggerDialog">
            <el-dialog
                :title="tittle"
                :visible.sync="centerDialogVisible"
                center>
                <p style="color:red;font-weight:700;">*重要提示：本次确认操作，无法撤消，请务必谨慎操作</p>
                <p v-if="number>0">{{type}}共计{{number}}条记录，是否确认清除</p>
                <p v-else>暂无服务记录</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deletaConfig" :disabled="number>0?false:true">确 定</el-button>
                </span>
                </el-dialog>
        </div>
	</el-container>
</template>

<script>
    import Address from "@/components/Address"
    import {getMaintenance,deleteMaintenance} from "@/api/systemConfig/module"
	export default {
		components: {
			Address,
        },
        // v:志愿者，o:服务对象,r服务记录
		data() {
			return {
        signDate: ["", ""],//活动时间
				form: {
          startServiceDate:'',
          endServiceDate: '',
                    areaCode: [],
                    accountNumber:'',
                    moduleType :''
                },
                tittle:'哈哈哈',
                centerDialogVisible: false,
				areaCode: [],
                idEdit: false,
                options:[],
                number:100,
                type:'某某街道',
                activeNames:['1','2','3']
			}
		},
		mounted() {
		},
		methods: {
			// 获取区域的值
			getAreaCode(val) {
				this.areaCode = val
      },
      deleteList(type,num){
        if (this.signDate && this.signDate[0] && this.signDate[1]) {
          this.form.startServiceDate = this.signDate[0];
          this.form.endServiceDate = this.signDate[1];
        }else{
           this.form.startServiceDate =""
           this.form.endServiceDate=""
        }
        if(type=='r'&&num==1){
           if(!this.areaCode.length){
					   this.$message.error('请选择区域！')
          }else{
             this.tittle="志愿者服务记录-按区域清除"
             this.form.areaCode=this.areaCode[this.areaCode.length-1]
             this.form.moduleType= 'r'
             delete this.form.startServiceDate
             delete this.form.endServiceDate
             delete this.form.accountNumber
             this.getNumber(type,num)
          }
        }
        if(type=='r'&&num==2){
           if(!this.form.accountNumber){
					   this.$message.error('请输入账号！')
          }else{
             this.tittle="志愿者服务记录-按账号清除"
             this.form.moduleType= 'r'
             delete this.form.startServiceDate
             delete this.form.endServiceDate
             delete this.form.areaCode
             this.getNumber(type,num)
          }
        }
        if(type=='r'&&num==3){
          if(!this.form.startServiceDate){
				    this.$message.error('请选择服务日期！')
          }else{
            if(!this.form.accountNumber&&!this.areaCode.length) {
					    this.$message.error('请选择区域或账号！')
            }else if(this.form.accountNumber&&this.areaCode.length){
              this.$message.error('区域或账号只能填写一个！')
            }else{
              if(!this.form.accountNumber&&this.areaCode.length){
                 this.form.areaCode=this.areaCode[this.areaCode.length-1]
                                delete this.form.accountNumber
                                this.form.moduleType= 'r'
                                this.tittle="志愿者服务记录-按服务日期清除"
                                this.getNumber(type,num)
                            }else{
                                delete this.form.areaCode
                                this.form.moduleType= 'r'
                                this.tittle="志愿者服务记录-按服务日期清除"
                                this.getNumber(type,num)
                            }
                        }
                    }
                }
                if(type=='o'&&num==1){
                    if(!this.areaCode.length){
					    this.$message.error('请选择区域！')
                    }else{
                        this.tittle="志愿者服务对象-按区域清除"
                        this.form.areaCode=this.areaCode[this.areaCode.length-1]
                        this.form.moduleType= 'o'
                        this.signDate=[]
                        // delete this.form.serviceDate
                        delete this.form.startServiceDate
                        delete this.form.endServiceDate
                        delete this.form.accountNumber
                        this.getNumber(type,num)
                    }
                }
                if(type=='o'&&num==2){
                    if(!this.form.accountNumber){
					    this.$message.error('请输入账号！')
                    }else{
                        this.tittle="志愿者服务对象-按账号清除"
                        this.form.moduleType= 'o'
                        this.signDate=[]
                        // delete this.form.serviceDate
                        delete this.form.startServiceDate
                        delete this.form.endServiceDate
                        delete this.form.areaCode
                        this.getNumber(type,num)
                    }
                }
                if(type=='v'&&num==1){
                    if(!this.areaCode.length){
					    this.$message.error('请选择区域！')
                    }else{
                        this.signDate=[]
                        this.tittle="志愿者-按区域清除"
                        this.form.areaCode=this.areaCode[this.areaCode.length-1]
                        this.form.moduleType= 'v'
                        // delete this.form.serviceDate
                        delete this.form.startServiceDate
                        delete this.form.endServiceDate
                        delete this.form.accountNumber
                        this.getNumber(type,num)
                    }
                }
                if(type=='v'&&num==2){
                    if(!this.form.accountNumber){
					    this.$message.error('请输入账号！')
                    }else{
                        this.signDate=[]
                        this.tittle="志愿者-按账号清除"
                        this.form.moduleType= 'v'
                        // delete this.form.serviceDate
                        delete this.form.startServiceDate
                        delete this.form.endServiceDate
                        delete this.form.areaCode
                        this.getNumber(type,num)
                    }
                }

            },
            deletaConfig(){
                let obj =this.form
                obj.total=this.number
                deleteMaintenance(obj).then(res=>{
                    if(res.code===0){
                        this.$message.success('删除成功！')
                        this.centerDialogVisible = false
                    }else{
					    this.$message.error(res.msg)
                    }
                }).cahch(err=>{
					this.$message.error(err.msg)
                })
            },
            getNumber(type,num){
                getMaintenance(this.form).then(res=>{
                    if(res.code==0){
                        const {areaCodeName,startServiceDate,endServiceDate,accountNumber,total} = res.data
                        if(type==='r'&&num==1){
                            this.type=areaCodeName
                        }
                        if(type==='r'&&num==2){
                            this.type=accountNumber+'账号'
                        }
                        if(type==='r'&&num==3){
                            this.type=startServiceDate+'至'+endServiceDate+'日期'
                        }
                        if(type==='o'&&num==1){
                            this.type=areaCodeName
                        }
                        if(type==='o'&&num==2){
                            this.type=accountNumber+'账号'
                        }
                        if(type==='v'&&num==1){
                            this.type=areaCodeName
                        }
                        if(type==='v'&&num==2){
                            this.type=accountNumber+'账号'
                        }
                        this.number=total
                        this.centerDialogVisible = true
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    this.$message.error(err.msg)
                })
            }
		}
	}
</script>

<style scoped>
    @import "~@/styles/form.css";
    .paddings{
        padding:30px 20px 20px;
    }
</style>
|
