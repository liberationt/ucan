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
				default: 'lineChart'
			},
			id: {
				type: String,
				default: 'lineChart'
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
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id));
				this.chart.setOption({
					title:{
						text:'总数：'+this.chartData.total+'条',
						textStyle:{
							fontSize:'18',
							fontWeight:'normal',
						},
						left:'30',
						top:'0'
					},
					tooltip : {
						trigger: 'axis',
						axisPointer : {
							type : 'line'
						},
						padding:10,
						textStyle:{
							fontSize:16,
						},
						formatter: "{a} <br/>{b} : {c}（条）"
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: this.chartData.typeDataArr,
					},
					yAxis: {
						type: 'value',
						name:'单位（条）',
					},
					series: [{
						name:'服务记录统计：',
						data: this.chartData.typeCountArr,
						type: 'line',
						symbol:'circle',//拐点样式
						color:'#15AFB0',
						symbolSize: 6,//拐点大小
						//线条样式
						itemStyle: {
							color: '#00ff00',
							borderColor:'#ffffff',
							normal: {
								lineStyle: {        // 系列级个性化折线样式
									width: 2,
									type: 'solid',
									color: '#15AFB0'
								}
							},
						},
						//区域颜色渐变
						areaStyle:{
							normal:{
								//颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(21,175,196,0.80)'
								},{
									offset: 1,
									color: 'rgba(21,175,196,0.00)'
								}])
							}
						},
					}]
				})
			}
		}
	}
</script>
