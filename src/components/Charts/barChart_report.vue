<template>
	<div :chartData="chartData" :barChartPannal="barChartPannal" :isChange="isChange" :id="id" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts';
	import resize from './mixins/resize';

	export default {
		mixins: [resize],
		props: {
			isChange:{
				type:Boolean,
				default:null,
			},
			barChartPannal:{
				type:Boolean,
				default:null,
			},
			chartData:{
				type: Object,
				default: []
			},
			className: {
				type: String,
				default: 'barChart'
			},
			id: {
				type: String,
				default: 'barChart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '100%'
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
				seriesData:[],
				counts: 0,
			}
		},
		mounted() {
			if (this.chartData) {
				this.initChart();
			}
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
				let dataTitle = [];
				this.seriesData = new Array();

				//选择‘男女比例’
				if(this.barChartPannal){
					this.seriesData = [
						{
							name: '男',
							type: 'bar',
							stack: '总量',
							barWidth:'50%',
							barMaxWidth: '50',
							color:'#1681E6',
							data: this.chartData['manCountArr']
						},
						{
							name: '女',
							type: 'bar',
							stack: '总量',
							barWidth:'50%',
							barMaxWidth: '50',
							color:'#E64547',
							data: this.chartData['womanCountArr']
						},
					];
					dataTitle = ['男','女'];
					this.counts = this.chartData.count;
				}
				//选择其他比例
				else {
					this.seriesData = [
						{
							name: '删除人数',
							type: 'bar',
							stack: '总量',
							barWidth:'50%',
							barMaxWidth: '50',
							color:'#1681E6',
							data: this.chartData['isDelCountArr']
						},
						{
							name: '删除人数',
							type: 'bar',
							stack: '总量',
							barWidth:'50%',
							barMaxWidth: '50',
							color:'',
							data: []
						},
					];
					dataTitle = ['删除人数'];
					this.counts = this.chartData.delCount;
				}

				this.chart = echarts.init(document.getElementById(this.id));
				this.chart.setOption({
					title:{
						text:'总数：'+this.counts+'人',
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
							type : 'shadow'
						},
						padding:10,
						textStyle:{
							fontSize:16,
						},
						formatter:function (params) {
							let str = '';
							let area = '';
							for (let i = 0; i < params.length; i++) {
								area = params[0].axisValue + '</br>';
								str += params[i].seriesName +'：'+ params[i].value + '（人）</br>';
							}
							return "志愿者统计：</br>"+area+str;
						}
					},
					legend: {
						width:120,
						itemWidth: 20,
						itemHeight: 12,
						itemGap: 10,
						top:'10',
						right: '10',
						textStyle: {
							fontSize: 14,
							color: '#333333'
						},
						data: dataTitle
					},
					grid: {
						left: '30',
						right: '40',
						bottom: '5%',
						containLabel: true
					},
					xAxis:  {
						axisTick:{
							alignWithLabel:true,
						},
						axisLabel:{
							margin:15,
							rotate:-30,
							fontSize:14,
						},
						type: 'category',
						data:this.chartData['areaDataArr']
					},
					yAxis: {
						type: 'value',
						minInterval: 1,
						name:'单位（人）',
					},
					series: this.seriesData,
				});
				let _that = this;
				this.chart.on('legendselectchanged', function(params) {
					_that.counts = 0;
					//点击男女
					if(params.name !== "删除人数"){
						if(params.selected['男']){
							if(_that.chartData.manCountArr){
								_that.chartData.manCountArr.forEach(item=>{
									_that.counts += item;
								});
							}
						}
						if(params.selected['女']){
							if(_that.chartData.womanCountArr){
								_that.chartData.womanCountArr.forEach(item=>{
									_that.counts += item;
								});
							}
						}
					}
					//点击删除人数
					else {
						if(params.selected['删除人数']){
							if(_that.chartData.isDelCountArr){
								_that.chartData.isDelCountArr.forEach(item=>{
									_that.counts += item;
								});
							}
						}
					}
					_that.chart.setOption({
						title: {
							text: '总数：' + _that.counts + '人',
						}
					});
				});
			},
		}
	}
</script>
