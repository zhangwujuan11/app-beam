<template>
	<view class="content">
		
		<view class="bgcolo">
			<image src="../../static/index.png" mode=""></image>
		</view>
		<view class="text-area">
			<view class="echairbox">
				<view class="echaileft">
					<text style="font-size: 36upx;font-weight: 800;">梁片进度</text>
					<text style="font-size: 24upx;color: #4D4D4D;">施工中</text>
					<view style="font-size: 48upx;color: #F6A400;">{{infodata.inComplete}}<text style="font-size: 24upx;">片</text></view>
					<text style="font-size: 24upx;color: #4D4D4D;">已完成/总数</text>
					<text style="font-size: 48upx;color: #3565FF;">{{infodata.complete}}/<text style="font-size: 40upx">{{infodata.data[1].value}}</text> <text style="font-size: 24upx;">片</text></text>
				</view>
				<view class="echairjght echarts" style="width: 241upx;height: 241upx;">
					<view style="width: 240upx;height: 240upx;">
						<l-echart  ref="chart" @finished="init"></l-echart>
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
				<view class="li" @click="goinspection" style="position: relative;">
					<image src="@/static/gongxushenhe.png" mode=""></image>
					<!-- <u-badge style="display: block;position: absolute;top: -15upx;right: 50upx;" type="error" count="7"></u-badge> -->
					<text>
						工序审核
					</text>

				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import * as echarts from '@/uni_modules/lime-echart/echarts.min';
	import { speed,qrinfo,allbriges } from '@/api/index.js'
	export default {
		data() {
			return {
				show: false,
				list: [],
				defaultValue:[0],
				brigename:'',
				option: {},
				infodata: {
					inComplete:'0',
					complete:'0'
				}
			};
		},
		onShow() {
			this.getlist()
		},
		update() {

		},
		methods: {
			
			// 大桥切换
			// confirmSelectClick(e) {
			// 	this.brigename=e[0].label
			// 	this.$store.state.brigeId=e[0].value
			// 	this.$store.state.brigeName=e[0].label
			// 	uni.setStorageSync('brigeId',e[0].value); 
			// 	uni.setStorageSync('brigeName',e[0].label); 
			// 	// console.log(this.$store.state.brigeName)
			// 	this.contant()
			// },
			getlist() {
				this.contant()
				allbriges().then(res=>{
					this.list=res.data
					if(uni.getStorageSync('brigeId')){
						this.brigename=uni.getStorageSync('brigeName')
						this.$store.state.brigeId=res.data[0].bridgeId
						this.$store.state.brigeName=res.data[0].bridgeName
						this.contant()
					}else{
						this.brigename=res.data[0].bridgeName
						this.$store.state.brigeId=res.data[0].bridgeId
						this.$store.state.brigeName=res.data[0].bridgeName
						uni.setStorageSync('brigeId',res.data[0].bridgeId);
						uni.setStorageSync('brigeName',res.data[0].bridgeName); 
						this.contant()
					}
				})
			},
			contant(){
				let brigeId = uni.getStorageSync('brigeId') 
				brigeId && speed(brigeId).then(res => {
					this.infodata = res.data
					let option = {
						color: ['#3565FF','#F2F2F2'],
						tooltip: {
						        trigger: 'none'  // 设置 tooltip 不触发
						},
						legend: {
						      show:false,
							  selectedMode:false
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
							silent:true,  //关键句
							radius: ["90%", "68%"],
							center: ['50%', '50%'],
							avoidLabelOverlap: false,
							label: {show: false},
							data: res.data.data,
							labelLine: { //删除指示线
								show: false
							},
							hoverAnimation: false,
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
							},
							itemStyle: {
							    // 柱状图颜色
							    // color: 'rgba(46, 199, 201)'
							}
						}]
					}

					this.option = option
					this.$refs.chart.init(echarts, chart => {
						chart.setOption(this.option);
						this.$refs.chart.resize()
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
						let isTrue = string.lastIndexOf("qrId");
						let needid = string.substring(index+1, string.length-1);
						// if(needid.lastIndexOf("http")!=-1 ||){}
						console.log('string',string);
						console.log('needid',needid);
						console.log('isTrue',isTrue);
						if(isTrue == -1){
							uni.showToast({
								title: "二维码信息错误",
								icon:"none"
							})
							throw '二维码信息错误'
						}
						
						qrinfo(needid).then(ress=>{
							console.log('请求信息',ress)
							// console.log('sssss',res,needid,(needid == null || needid == undefined || needid == ''));
							// if(ress.data == null || ress.data == undefined || ress.data == ''){
							// 	uni.showToast({
							// 		title: "二维码信息错误"
							// 	})
							// 	throw '二维码信息错误'
							// }
							if(ress.data == null){
								uni.showToast({
									title: "暂无数据"
								})
							}
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
						uni.showToast({
							title: "识别二维码失败",
							icon:'none'
						})
					},
					complete: () => {
						console.log('扫码结束')
					}
				})
			},
			goinspection(){
				uni.navigateTo({
					url: '/pages/inspection/inspection'
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
	.slebox{
		width: 100%;
		background-color: #004097;
		height: 42px;
	}
	/deep/.u-btn--default,.u-size-default{
		width: 50% !important;
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
		flex-wrap: wrap;
	}

	.li {
		width: 332upx;
		height: 208upx;
		background-color: white;
		border-radius: 16upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #4D4D4D;
		font-size: 0.9rem;
		margin-bottom: 20upx;
	}

	.li text {
		display: block;
		line-height: 38upx;
		margin-top: 15upx;
	}

	.li image {
		width: 100upx;
		height: 100upx;
	}

	::v-deep .lime-echart {
		height: 100% !important;
		width: 100% !important;
	}
</style>