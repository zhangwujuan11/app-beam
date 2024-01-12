<template>
	<view class="content">
		<view class="bgcolo">
			<image src="../../static/index.png" mode=""></image>
		</view>
		<view class="text-area">
			<view class="echairbox">
				<view class="echaileft">
					<text style="font-size: 36upx;">梁片进度</text>
					<text style="font-size: 24upx;color: #4D4D4D;">施工中</text>
					<text style="font-size: 48upx;color: #F6A400;">{{infodata.inComplete}} <text style="font-size: 24upx;">片</text></text>
					<text style="font-size: 24upx;color: #4D4D4D;">已完成</text>
					<text style="font-size: 48upx;color: #3565FF;">{{infodata.complete}} <text style="font-size: 24upx;">片</text></text>
				</view>
				<view class="echairjght echarts" style="width: 241upx;height: 241upx;">
					<view style="width: 240upx;height: 240upx;">
						<l-echart ref="chart" @finished="init"></l-echart>
					</view>
				</view>
			</view>
			<view class="ul">
				<view class="li" @click="gobragea">
					<image src="@/static/li.png" mode=""></image>
					<text>梁片管理</text>
				</view>
				
				<view class="li" @click="serchcarm">
					<image src="@/static/godanchuli.png" mode=""></image>
					<text>
						工单处理
					</text>
				</view>
			</view>
		</view>
	</view>
</template>



<script>
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min';
	import {
		speed,qrinfo
	} from '@/api/index.js'
	export default {
		data() {
			return {
				option: {},
				infodata: {
					inComplete:'0',
					complete:'0'
				}
			};
		},
		onLoad() {
			this.getlist()
		},
		update() {

		},
		methods: {
			getlist() {
				let that = this
				speed().then(res => {
					this.infodata = res.data
					let option = {
						color: ['#F2F2F2','#3565FF'],
						 legend: {
						      show:false,
						    },
						xAxis: [{
							type: 'category',
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							}
						}, ],
						yAxis: [{
							type: 'category',
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							}
						}],
						series: [{
							type: 'pie',
							radius: ["90%", "68%"],
							center: ['50%', '50%'],
							avoidLabelOverlap: false,
							label: {show: false},
							data: res.data.data,
							labelLine: { //删除指示线
								show: false
							},
							label: {
								normal: {
									show: true,
									position: 'center', // 展示在中间位置
									formatter: res.data.percentage + "%" + '\n' + "完成比例",
									textStyle: {
										fontWeight: "normal",
										fontSize: 14,
										lineHeight: 20
									},
									position: "center",
									color: "#000",
								}
							}
						}]
					}
					this.option = option
					this.$refs.chart.init(echarts, chart => {
						chart.setOption(this.option);
					this.$refs.chart.resize()
					// this.chart.off("click")
					});
				})
			},
			async init() {
				const chart = await this.$refs.chart.init(echarts);
				chart.setOption(this.option)
			},
			setOption() {
				this.chart.setOption(options)
			},
			gobragea() {
				uni.navigateTo({
					url: '/pages/bragelist/bragelist'
				})
			},
			
			// 梁片详情派单
			serchcarm(){
				uni.scanCode({
					success: (res) => {
						let string=JSON.stringify(res.result)
						let index = string.lastIndexOf("=");
						let needid = string.substring(index+1, string.length-1);
						qrinfo(needid).then(ress=>{
							console.log(ress.data.completeStatus)
							if(ress.data.completeStatus == 0){
								uni.navigateTo({
									url: '/pages/bragelist/bragelist?beamid=' + ress.data.beamId
								})
							}else if(ress.data.completeStatus == 1 ||ress.data.completeStatus == 20){
								uni.navigateTo({
									url: '/pages/brageinfo/brageinfo?id=' + ress.data.beamId
								})
							}else{
								uni.navigateTo({
									url: '/pages/brageinfo/brageinfo?showcheck=false&id=' + ress.data.beamId
								})
							}
						})
					},
					fail: (err) => {
						this.$refs.uToast.show({
							title: "识别二维码失败",
						})
					},
					complete: () => {
						console.log('扫码结束')
					}
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.bgcolo {
		width: 100%;
		height: 198upx;
		background-color: #004097;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
		display: flex;
		justify-content: center;
	}

	.bgcolo image {
		width: 692upx;
		height: 284upx;
		margin-top: 40upx;
	}

	.text-area {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.echairbox {
		width: 692upx;
		height: 338upx;
		margin-top: 156upx;
		background-color: white;
		border-radius: 12upx;
		padding: 32upx 26upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;

	}

	.echaileft {
		display: flex;
		flex-direction: column;
		line-height: 52upx;
	}

	.ul {
		width: 692upx;
		margin-top: 20upx;
		display: flex;
		justify-content: space-between;
	}

	.li {
		width: 332upx;
		height: 168upx;
		background-color: white;
		border-radius: 16upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #4D4D4D;
		font-size: 24upx;
	}

	.li text {
		display: block;
		line-height: 38upx;
	}

	.li image {
		width: 80upx;
		height: 80upx;
	}

	::v-deep .lime-echart {
		height: 100% !important;
		width: 100% !important;
	}
</style>