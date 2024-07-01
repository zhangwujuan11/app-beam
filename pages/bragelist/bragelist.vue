<template>
	<view class="con">
		<view class="topserch">
			<view class="ser">
				<u-search 
				v-model="queryform.keyFields"
				shape="square" 
				bg-color="#fff" 
				placeholder="请输入关键词" 
				@custom="getlist()"
				:action-style="{background:'#5FB760',color:'white',padding:'5px 0','border-radius': '4px'}">
					
				</u-search>
			</view>
		</view>
		<view class="ul">
			<view class="li" v-for="(item,index) in tabledata" :key="index" @click.stop="golook(item.beamId,item.planId,1)">
				<view class="bu">
					<text>{{item.beamCode}}</text>
					<view style="padding-right: 24upx;">
						<u-tag text="初始" mode="light" v-if="item.completeStatus == 0"/>
						<u-tag text="未派发" mode="light" v-if="item.completeStatus == 1"/>
						<u-tag text="施工中" mode="light" v-if="item.completeStatus == 20"/>
						<u-tag text="完成" mode="light" v-if="item.completeStatus == 30"/>
					</view>
				</view>
				<view class="licon">
					<view class="liconline">
						<text>梁片名称</text><span style="color:blue">{{item.beamName}}</span>
						<u-icon name="arrow-right" size="20"></u-icon>
					</view>
					<!-- <view class="liconline">
						<text>入库日期</text>{{item.beamName}}
					</view> -->
					<view class="liconline">
						<text>二维码</text>
						<span v-if="!item.qrCodeImg">-</span>
						<image  v-if="item.qrCodeImg" :src="item.qrCodeImg"></image>
					</view>
					<view class="bt-li">
							<view class="bt-licon">
								<button v-if="item.qrCodeImg" class="goadd" @click.stop="jieabngqrcode(item.beamId,item.beamCode, item.qrId)">解绑二维码</button>
								<button v-if="!item.qrCodeImg" class="goadd" @click.stop="bindqrcode(item.beamId)">绑定二维码</button>
								<button 
								style="background-color: #0091F2;color: white;border: none;" 
								v-if="(item.completeStatus == null ||item.completeStatus == '0')&&item.planId" 
								class="goinfo" 
								@click.stop="addorderbtn(item.beamId)">生成工单</button>
								<button v-if="(item.completeStatus == '1' ||item.completeStatus == '20')&&item.planId" class="goinfo" @click.stop="goinfo(item.beamId)">工单派发</button>
								<button class="goadd" @click.stop="golook(item.beamId,item.planId) " v-if="(item.completeStatus != null ) && item.planId ">工单查询</button>
								</view>
							</view>
					</view>
				</view>
			</view>
			<br>
			<span>没有更多了</span>
		<!-- <image class="addlist" src="../../static/camer.png" @click="goadd"></image> -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { bragelist, binded, jibinded, addorder } from '@/api/index.js'
	import { toast, showConfirm, tansParams } from '@/utils/common'
	import constant from '../../utils/constant'
	export default {
		data() {
			return {
				queryform:{
					pageNum:1,
					pageSize:10,
					keyFields:'',
					bridgeId:uni.getStorageSync('brigeId')
				},
				tabledata:[],
				total:0
			}
		},
		onBackPress(e) {
			uni.reLaunch({
				url:'/pages/index/index'
			})
			return true
		}, 
		onLoad(option) {
			if(option.beamid){
				bragelist({"beamId":option.beamid,bridgeId:uni.getStorageSync('brigeId')}).then(res=>{
					this.tabledata=res.data.items
					this.total=res.data.total
					this.$refs.uToast.show({
						title: "工单未生成"
					})
				})
			}else{
				this.getlist()
			}
		},
		methods: {
			getlist(){
				// this.queryform.pageNum = 1 
				bragelist(this.queryform).then(res=>{
					this.tabledata=res.data.items
					this.total=res.data.total
				})
			},
			
			// 工单派发
			addorderbtn(e){
				addorder({'beamId':e}).then(res=>{
					if(res.code == 200){
						this.$refs.uToast.show({
							title: "工单已生成"
						})
						this.queryform.pageSize = this.queryform.pageNum * this.queryform.pageSize
						let _pageNum = this.queryform.pageNum 
						this.queryform.pageNum = 1
						this.getlist()
						this.queryform.pageNum = _pageNum
						this.queryform.pageSize = 10
					}
				})
			},
			goinfo(e){
				uni.navigateTo({
					url: '/pages/brageinfo/brageinfo?id=' +e
				})
			},
			golook(e,planId,isf){
				uni.navigateTo({
					// url:'/pages/brageDetails/brageDetails'
					// url: '/pages/brageinfo/brageinfo?showcheck=false&id=' + e+"&planId="+planId+"&isf="+isf
					url: '/pages/brageDetails/brageDetails?showcheck=false&id=' + e+"&planId="+planId+"&isf="+isf
				})
			},
			goadd(e){
				uni.navigateTo({
					url:'/pages/brageadd/brageadd?id=' + e
				})
			},
			// 绑定二维码
			bindqrcode(e){
				uni.scanCode({
					success: (res) => {
						let string=JSON.stringify(res.result)
						let index = string.lastIndexOf("=");
						let needid = string.substring(index+1, string.length-1);
						if(res.result.includes('qrId')){
							binded({
								qrCodeId:needid,
								beamId:e
							}).then(ress=>{
								this.$refs.uToast.show({
									title: "绑定成功"
								})
							this.queryform.pageSize = this.queryform.pageNum * this.queryform.pageSize
							let _pageNum = this.queryform.pageNum 
							this.queryform.pageNum = 1
							this.getlist()
							this.queryform.pageNum = _pageNum
							this.queryform.pageSize = 10
							}).catch(err=>{
								console.log(err.data)
							})
						}else{
							this.$refs.uToast.show({
								title: "二维码信息错误"
							})
						}
						
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
			},
			// 解绑二维码
			jieabngqrcode(e,i,y){
				// ♯
				i = i.replace('#','♯')
				showConfirm('确认解绑梁板编号为' + i +'的二维码?').then(res => {
				  if (res.confirm) {
					  jibinded({
							qrCodeId:y,
							beamId:e
						}).then(ress=>{
							this.$refs.uToast.show({
								title: "解绑成功"
							})
							this.queryform.pageSize = this.queryform.pageNum * this.queryform.pageSize
							let _pageNum = this.queryform.pageNum 
							this.queryform.pageNum = 1
							this.getlist()
							this.queryform.pageNum = _pageNum
							this.queryform.pageSize = 10
						})
				  }
				})
			}
			
			// goadd(){
			// 	uni.scanCode({
			// 		success: (res) => {
			// 			console.log("6666",res)
			// 		},
			// 		fail: (err) => {
			// 			this.$refs.uToast.show({
			// 				title: "识别二维码失败",
			// 			})
			// 		},
			// 		complete: () => {
			// 			console.log('扫码结束')
			// 		}
			// 	})
			// }
		},
		onReachBottom() { //触底事件
			if (this.queryform.pageNum * this.queryform.pageSize >= this.total) {
				uni.showToast({
					title: '没有更多数据了',
					icon: 'none',
					duration: 1000
				});
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			} else {
				if (this.queryform.pageNum <= this.queryform.pageNum - 1) {
					setTimeout(() => {
						uni.hideLoading()
					}, 500)
				} else {
					uni.showLoading({
						title: '加载中'
					});
					this.queryform.pageNum++
					bragelist(this.queryform).then(res=>{
						if(res.code == 200){
							this.total=res.data.total
							this.tabledata=[...this.tabledata,...res.data.items]
						}
					})
				}
				setTimeout(() => {
					uni.hideLoading()
				}, 500)
			}
		}
	}
</script>

<style>
	.con{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.topserch{
		width: 100%;
		background-color: #004097;
		display: flex;
		justify-content: center;
		padding-top:30upx;
		padding-bottom: 12upx;
	}
	.topserch .ser{
		width: 702upx;
	}
	.ul{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.ul .li{
		width: 702upx;
		background-color: white;
		border-radius: 16upx;
		margin-top: 20upx;
	}
	.li .bu{
		border-bottom: 1px solid #EBEBEB;
		line-height: 82upx;
		text-indent: 24upx;
		color: #666666;
		font-size: 0.8rem;
		display: flex;
		justify-content: space-between;
	}
	.li .licon{
		padding: 24upx;
	}
	.liconline{
		display: flex;
		color: #1A1A1A;
		font-size: 0.8rem;
		margin: 24upx 0;
	}
	.liconline text{
		display: block;
		width: 160upx;
		color: #999999;
	}
	.addlist{
		position: fixed;
		right: 0;
		bottom: 118upx;
		width: 136upx;
		height: 136upx;
	}
	.liconline image{
		width: 114upx;
		height: 114upx;
	}
	.bt-li{
		width:100%;
		display: flex;
		justify-content:flex-end;
		margin-bottom: 15upx;
	}
	.bt-licon{
		/* width: 90%; */
		display: flex;
		/* position: relative; */
		/* height: 50upx; */
		/* background-color: red; */
	}
	.bt-li button:only-child{
		/* display: block; */
	}
	.bt-li button{
/* 		width: 180upx;
		height: 80upx; */
		color: #004097;
		border: 1px solid #004097;
		border-radius: 8upx;
		background-color: white;
		line-height: 50upx;
		font-size: 0.8rem;
		
		height: 50upx;
		width:188upx;
		/* margin:0; */
		margin-left: 15rpx;
		/* margin-right: 20rpx; */
		/* margin:0 0 1rpx 50upx; */
	}
	.bt-li .goadd{
		background-color: #004097;
		color: white;
	}
	/deep/.u-mode-light-primary{
		text-indent:0;
	}
</style>
