<template>
	<el-container>
		<el-main class="formDiv" style="margin: 22px 10px 10px 10px;">
			<template>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="所有消息" name="all">
						<el-collapse v-model="activeNames_A">
							<el-collapse-item :name="'item_a_'+index" v-for="(item,index) in this.theAllMessageData" :key="index">
								<template slot="title">
									<div>
										<!--网站公告-->
										<span v-if="item.msgType === 'web_ment'" class="itemTitleIcon" style="background-color:#EDC707;">
											<i class="iconfont iconwzgg"></i>
										</span>
										<!--系统通知-->
										<span v-else-if="item.msgType === 'sys_notification'" class="itemTitleIcon" style="background-color:#4E9DE2;">
											<i class="iconfont iconxttz"></i>
										</span>
										<!--工作通知-->
										<span v-else="item.msgType === 'job_notice'" class="itemTitleIcon" style="background-color:#E76949;">
											<i class="iconfont icongztz"></i>
										</span>

										<span>【{{item.msgTypeName}}】</span>
										<span>{{item.title}}</span>
										<span style="margin-left: 20px;font-size: 12px;color:#999999;">{{item.createTime}}</span>
									</div>
								</template>
								<div style="padding-left: 50px;">{{item.content}}</div>
							</el-collapse-item>
						</el-collapse>
					</el-tab-pane>
					<el-tab-pane label="未读消息" name="unread">
						<el-collapse v-model="activeNames_B">
							<el-collapse-item :name="'item_b_'+index" v-for="(item,index) in this.theAllMessageData" :key="index">
								<template slot="title">
									<div>
										<!--网站公告-->
										<span v-if="item.msgType === 'web_ment'" class="itemTitleIcon" style="background-color:#EDC707;">
											<i class="iconfont iconwzgg"></i>
										</span>
										<!--系统通知-->
										<span v-else-if="item.msgType === 'sys_notification'" class="itemTitleIcon" style="background-color:#4E9DE2;">
											<i class="iconfont iconxttz"></i>
										</span>
										<!--工作通知-->
										<span v-else="item.msgType === 'job_notice'" class="itemTitleIcon" style="background-color:#E76949;">
											<i class="iconfont icongztz"></i>
										</span>

										<span>【{{item.msgTypeName}}】</span>
										<span>{{item.title}}</span>
										<span style="margin-left: 20px;font-size: 12px;color:#999999;">{{item.createTime}}</span>
									</div>
								</template>
								<div style="padding-left: 50px;">{{item.content}}</div>
							</el-collapse-item>
						</el-collapse>
					</el-tab-pane>
					<el-tab-pane label="已读消息" name="readed">
						<el-collapse v-model="activeNames_C">
							<el-collapse-item :name="'item_c_'+index" v-for="(item,index) in this.theAllMessageData" :key="index">
								<template slot="title">
									<div>
										<!--网站公告-->
										<span v-if="item.msgType === 'web_ment'" class="itemTitleIcon" style="background-color:#EDC707;">
											<i class="iconfont iconwzgg"></i>
										</span>
										<!--系统通知-->
										<span v-else-if="item.msgType === 'sys_notification'" class="itemTitleIcon" style="background-color:#4E9DE2;">
											<i class="iconfont iconxttz"></i>
										</span>
										<!--工作通知-->
										<span v-else="item.msgType === 'job_notice'" class="itemTitleIcon" style="background-color:#E76949;">
											<i class="iconfont icongztz"></i>
										</span>

										<span>【{{item.msgTypeName}}】</span>
										<span>{{item.title}}</span>
										<span style="margin-left: 20px;font-size: 12px;color:#999999;">{{item.createTime}}</span>
									</div>
								</template>
								<div style="padding-left: 50px;">{{item.content}}</div>
							</el-collapse-item>
						</el-collapse>
					</el-tab-pane>
				</el-tabs>
			</template>

			<pagination class="mssageDetailsPagination"
					v-show="dataTotal>0"
					:total="dataTotal"
					:page.sync="form.pageNum"
					:limit.sync="form.pageSize"
					@pagination="getMessageDetailsData(form)"
			/>
		</el-main>
	</el-container>
</template>

<script>
	import Pagination from "@/components/Pagination";
	import {getMessageDetailsData, getMessageReadStatus} from "@/api/systemConfig/user";
	import {getDate_YMD} from "@/utils/index.js";
	import {mapGetters} from 'vuex'
  import eventBus from '@/utils/eventBus'
  export default {
		components: {Pagination},
		computed: {
			...mapGetters([
				'tabbarItemName'
			]),
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
		},
		watch: {
			tabbarItemName: function(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.activeName = 'unread';
					this.form.readState = '0';
					this.getMessageDetailsData(this.form);
				}
			}
		},
		data() {
			return {
				activeName:'all',
				activeNames_A:'item_a_0',
				activeNames_B:'item_b_0',
				activeNames_C:'item_c_0',
				form:{
					pageNum:1,
					pageSize:10,
					readState:'',
				},
				dataTotal:0,//分页消息总数
				theAllMessageData:[],//所有信息的数据
        arg: 0
			};
		},

		//在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
		mounted() {
			//进入‘消息列表’页默认打开未读消息面板，并请求未读消息的数据
			if(this.$route.query.readStatus === 'all'){
				this.activeName = 'all';
				this.form.readState = '';
			}
			else {
				this.activeName = 'unread';
				this.form.readState = '0';
			}
			this.getMessageDetailsData(this.form);
		},

		methods: {
      getMessageReadStatus(id){
        getMessageReadStatus(id).then(response => {
          if (response.code === 0) {
            eventBus.$emit('change', 0)
            // this.getMessageDetailsData(this.form);
            // getMessageDetailsData(this.form).then(response => {
            //   if (response.code === 0 && response.rows) {
            //     this.dataTotal = response.total;
            //     this.theAllMessageData = response.rows;
            //     this.$store.commit("message/ADD_MESSAGE_LIST",response);
            //   }
            // })
            //判断tab菜单是否有‘消息列表’标签，如果有：则让‘消息列表’的未读消息刷新新数据。如果没有：则不进行任何操作
            // this.visitedViews.forEach(item=>{
            //   if (item.name === "messageDetails"){
            //     this.$store.commit("message/ADD_TABBAR_ITEM_NAME",id);
            //   }
            // });
          }
          else {
            this.$message.error('改变消息状态接口失败！1');
          }
        }).catch(() => {
          this.$message.error('改变消息状态接口失败！2');
        });
      },
			//获取消息数据
			getMessageDetailsData(parmas){
				getMessageDetailsData(parmas).then(response => {
					if (response.code === 0 && response.rows) {
						this.dataTotal = response.total;
						this.theAllMessageData = response.rows;
						if (this.activeName === 'unread') {
						  const arr = []
              this.theAllMessageData.forEach(item =>{
                arr.push(item.id)
              })
              if(arr.length > 0 ) {
                this.getMessageReadStatus(arr.join(','))
              }
            }
					}
					else {
						this.$message.error('数据字典接口请求失败！');
					}
				}).catch(() => {
					this.$message.error('数据字典接口请求失败！');
				});
			},
			//tabs切换
			handleClick(val){
				switch (val.name) {
					case 'all':
						this.form.readState='';
						break;
					case 'unread':
						this.form.readState='0';
						break;
					case 'readed':
						this.form.readState='1';
						break;
				}
				this.getMessageDetailsData(this.form);
			},
			handleSizeChange(val) {
			},
			handleCurrentChange(val) {
			}
		}
	};
</script>

<style scoped>
	@import "~@/styles/form.css";
	.paginationPos{
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.mssageDetailsPagination{
		padding: 50px 0;
		margin: 0;
	}
</style>
