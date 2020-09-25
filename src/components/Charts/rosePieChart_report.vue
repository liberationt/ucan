<template>
	<div :chartData="chartData" :isChange="isChange" :id="id" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	import resize from './mixins/resize'

	export default {
		mixins: [resize],
		props: {
			isChange:{
				type:Boolean,
				default:null,
			},
			chartData:{
				type: Object,
				default: {}
			},
			className: {
				type: String,
				default: 'twinBarChart'
			},
			id: {
				type: String,
				default: 'twinBarChart'
			},
			width: {
				type: String,
				default: '200px'
			},
			height: {
				type: String,
				default: '200px'
			}
		},
		watch:{
			isChange:{
				handler() {
					this.initChart();
				}
			}
		},
		data() {
			return {
				chart: null,
				counts:0,
			}
		},
		mounted() {
			this.initChart()
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose();
			this.chart = null;
		},
		methods: {
			initChart() {
				this.counts = this.chartData.total;
				this.chart = echarts.init(document.getElementById(this.id));
				this.chart.setOption({
					title:{
						text:'总数：'+this.counts+'个',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal',
						},
						left:'30',
						top:'0'
					},
					tooltip : {
						trigger: 'item',
						axisPointer : {
							type : 'shadow'
						},
						padding:10,
						textStyle:{
							fontSize:16,
						},
						formatter: "{a} <br/>{b} : {c}（个） <br/>占百分比：{d}%"
					},
					legend: {
						orient: 'vertical',
						top:'50',
						right: '20',
						data:this.chartData.typeDataArr,
					},
					calculable : true,
					color: ['#BC3B90','#634B9C','#1AB0AF','#38B25C','#AF9C64','#4755A4','#E4A445','#6E78B9','#C3CF3E','#E34E67','#52C0D0','#8AC66F','#4995D1','#DB87B0','#EEC624','#1E356D'],
					series : [
						{
							name:'社会组织统计：',
							type:'pie',
							radius : [50, 180],
							center : ['50%', '50%'],
							roseType : 'area',
							label: {
								normal: {
									show: false,//标识
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '16',
										fontWeight: 'bold'
									}
								}
							},
							lableLine: {
								normal: {
									show: false
								},
								emphasis: {
									show: true
								}
							},
							data:this.chartData.typeCountArr
						}
					]
				});
				let _that = this;
				this.chart.on('legendselectchanged', function(params) {
					_that.counts = 0;
					let selectedItemArr = new Array();
					Object.keys(params.selected).map((key,item)=>{
						if(params.selected[key]){
							selectedItemArr.push(key);
						}
					});
					_that.chartData.typeCountArr.forEach(item=>{
						if(selectedItemArr.some( i => i === item.name)){
							_that.counts += item.value;
						}
					});
					_that.chart.setOption({
						title: {
							text:'总数：'+_that.counts+'人',
						}
					});
				});
			}
		}
	}
</script>
