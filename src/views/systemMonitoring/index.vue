<template>
    <div>
		<el-header class="tableContainer">
            <span>服务名称：</span>
			<el-select v-model="value" filterable placeholder="请选择" @change="toLogon">
                <el-option
                v-for="item in options"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
                </el-option>
            </el-select>
		</el-header>
		<el-main class="tableContainer" v-if="value">
            <iframe id="content" :src="src"></iframe>
        </el-main>
    </div>
</template>

<script>
 import { allSelectdictionaryData } from '@/api/common';
    export default {
       data(){
           return{
                value:'',
                options: [],
                src:''
           }
       },
       methods:{
           toLogon(val){
            this.src=process.env.VUE_APP_BASE_API+val+'druid/login.html'
           },
           // 获取下拉字典
			getSelect() {
					//数据字典接口
                let dicKey = 'sql_monitor';
                allSelectdictionaryData(dicKey).then(response => {
                    if (response.code === 0) {
                        for (let k in response.data) {
                            switch (k) {
                                //房屋产权
                                case 'sql_monitor':
                                    this.options = response.data[k];
                                    break;
                            }
                        }
                    }
                })
			}
       },
       mounted(){
           console.log()
        this.getSelect()
       }
   }
</script>

<style scoped>
   #content {
        width: 100%;
        height: calc(100vh - 200px);
    }
</style>
|
