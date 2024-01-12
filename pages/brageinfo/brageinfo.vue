<template>
	<view class="content">
		<view class="forminfo">
			<view
				style="border-bottom: 1px solid #EBEBEB;padding: 20upx 0;color: black;display: flex;justify-content: space-between;align-items: center;">
				<span>梁片信息</span>
				<span v-if="!form.qrCodeImg">-</span>
				<image @click="show=true" v-if="form.qrCodeImg" class="qrimg" :src="form.qrCodeImg"
					style="width: 32px;height: 32px;"></image>
			</view>
			<u-form :model="form" ref="uForm" label-width="180">
				<u-form-item label="梁片名称">{{form.beamName}}</u-form-item>
				<u-form-item label="浇筑日期">
					<block v-if="!form.pouringDate">-</block>
					<block v-if="form.pouringDate">{{form.pouringDate}}</block>
				</u-form-item>
				<u-form-item label="张拉日期">
					<block v-if="!form.tensioningDate">-</block>
					<block v-if="form.tensioningDate">{{form.tensioningDate}}</block>
				</u-form-item>
				<u-form-item label="设计长度">
					<block v-if="!form.designLength">-</block>
					<block v-if="form.designLength">{{form.designLength}}米</block>
				</u-form-item>
				<u-form-item label="梁板高度">
					<block v-if="!form.slabHeight">-</block>
					<block v-if="form.slabHeight">{{form.slabHeight}}米</block>
				</u-form-item>
				<u-form-item label="梁板宽度">
					<block v-if="!form.slabWidth">-</block>
					<block v-if="form.slabWidth">{{form.slabWidth}} 米</block>
				</u-form-item>
				<u-form-item label="监理单位">
					<block v-if="!form.supervisionUnit">-</block>
					<block v-if="form.supervisionUnit">{{form.supervisionUnit}}</block>
				</u-form-item>
				<u-form-item label="试验负责人">
					<block v-if="!form.testingManager">-</block>
					<block v-if="form.testingManager">{{form.testingManager}}</block>

				</u-form-item>
				<u-form-item label="施工单位">
					<block v-if="!form.constructionCompany">-</block>
					<block v-if="form.constructionCompany">{{form.constructionCompany}}</block>
				</u-form-item>
				<!-- <u-form-item label="二维码">
					<span v-if="!form.qrCodeImg">-</span>
					<image @click="show=true" v-if="form.qrCodeImg" class="qrimg" :src="form.qrCodeImg"></image>
				</u-form-item> -->
			</u-form>
		</view>

		<u-collapse 
		:head-style="{'color':'#181818','font-size':'16px','position':'relative','font-weight': '500','padding-left':'20px'}"
		>
			<view v-for="(item,index) in haveprocessList" :key="index">
				<image src="@/static/titleinfo.png" class="collapesimg">
					<u-collapse-item :title="'工序名称：'+ item.processName">
						<view class="gongxusep">
							<view class="sepline"></view>
							<view class="forminfo forminfotwo">
								<u-form :model="item" ref="uForm" label-width="180">
									<u-form-item label="施工班组">{{item.deptName}}</u-form-item>
									<u-form-item label="台座编号">
										<uni-data-select disabled placeholder="-" v-model="item.seatId"
											:localdata="alllist"></uni-data-select>
									</u-form-item>
									<u-form-item label="模版编号">
										<uni-data-select disabled placeholder="-" v-model="item.templateId"
											:localdata="mobanlist"></uni-data-select>
									</u-form-item>
									<u-form-item label="开始时间">
										<u-input  disabled v-model="item.beginTime" type="text" />
									</u-form-item>
									<u-form-item label="结束时间">
										<u-input  disabled v-model="item.endTime" type="text" />
									</u-form-item>
									<u-form-item label="验收状态">
										<uni-data-select disabled placeholder="-" v-model="item.inspectStatus"
											:localdata="yanstatus"></uni-data-select>
									</u-form-item>
								</u-form>
							</view>

						</view>
					</u-collapse-item>
			</view>
		</u-collapse>
		<!-- 派发工序 -->
		<view style="margin-top: 20px;"  v-if="flgs && flgsss">
			<image src="@/static/titleinfo.png" class="collapesimg">
				<text class="countitle">{{addform.processName}}</text>
				<view class="gongxusep gongxusepteo" style="margin-top: 10px;">
					<view class="sepline"></view>
					<view class="forminfo forminfotwo">
						<u-form :model="addform" ref="addform" label-width="180">
							<u-form-item label="施工班组" prop="category" right-icon="arrow-right">
								<uni-data-select v-model="addform.deptId" :localdata="banlist" @change="depname($event)"></uni-data-select>
							</u-form-item>
							<u-form-item label="台座编号" right-icon="arrow-right">
								<uni-data-select v-model="addform.seatId" :localdata="freelist"></uni-data-select>
							</u-form-item>
							<u-form-item label="模版编号" right-icon="arrow-right">
								<uni-data-select v-model="addform.templateId" :localdata="mobanlist"></uni-data-select>
							</u-form-item>
							<!-- <u-form-item label="开始时间" right-icon="arrow-right"  @click="showtime = true">
								<u-input v-if="addform.beginTime" v-model="addform.beginTime"  @click="showtime = true" type="text" />
								<u-calendar v-model="showtime"  max-date="2050-01-01" @change="betime($event)"></u-calendar>
							</u-form-item>
							<u-form-item label="结束时间" right-icon="arrow-right" @click="showtimend()">
								<u-input v-if="addform.endTime" v-model="addform.endTime"  @click="showtimend = true" type="text" />
								<u-calendar v-model="showtime"  max-date="2050-01-01" @change="betime($event)"></u-calendar>
							</u-form-item> -->
							<u-form-item label="验收状态" right-icon="arrow-right"  v-if="addform.taskStatus == 2">
								<uni-data-select v-model="addform.inspectStatus" :localdata="yanstatus"></uni-data-select>
							</u-form-item>
						</u-form>
						<view class="btnbox">
							<view class="con">
								<u-button @click="goback">返回</u-button>
								<u-button @click="sencendbtn" type="warning" v-if="addform.taskStatus == 2">结束</u-button>
								<u-button @click="sencendbtn" type="warning" v-if="addform.taskStatus == 1">接收</u-button>
								<u-button @click="firstsend" type="warning" v-if="!addform.taskStatus">派发</u-button>
							</view>
						</view>
					</view>
				</view>
		</view>
		
		
		
		<u-popup v-model="show" mode="center" border-radius="14" :closeable="true">
			<view>
				<image :src="form.qrCodeImg" style="width: 320px;height: 320px;"></image>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { beamsinfo, freetailist, banlisu, mulist, listsettingss, settingoff, firsttasks, sentedtasks, allailist } from '@/api/index.js'
	export default {
		data() {
			return {
				form: {},
				id: '',
				show: false,
				addform: {
				},
				freelist: [],
				banlist: [],
				alllist:[],
				mobanlist: [],
				yanstatus: [{
						text: "合格",
						value: 1
					},
					{
						text: "不合格",
						value: 2
					}
				],
				processList: [], //当前桥梁应有的所有工序
				haveprocessList: [], //已经有记录的工序
				flgs:true,
				flgsss:true,
				showtime:false
			};
		},
		onLoad(option) {
			this.id = option.id
			if(option.showcheck){
				this.flgsss=false
			}else{
				this.flgsss=true
			}
		},
		mounted() {
			this.getlist()
			// 空闲台座
			freetailist(this.id).then(res => {
				res.data.map(item => {
					this.freelist.push({
						text: item.seatCode,
						value: item.seatId
					})
				})
			})
			
			// 所有台座接口
			allailist().then(res=>{
				res.data.items.map(item => {
					this.alllist.push({
						text: item.seatCode,
						value: item.seatId
					})
				})
			})			
			// 施工班组
			banlisu().then(res => {
				res.data.map(item => {
					this.banlist.push({
						text: item.deptName,
						value: item.deptId
					})
				})
			})
			// 模板
			mulist().then(res => {
				res.data.items.map(item => {
					this.mobanlist.push({
						text: item.templateNumber,
						value: item.templateId
					})
				})
			})
		},
		methods: {
			// 获取页面数据
			getlist() {
				this.haveprocessList=[]
				let that=this
				beamsinfo(this.id).then(res => {
					this.form = res.data
					listsettingss(res.data.methodSettingsId).then(da => {
						this.processList = da.data.processList
						settingoff({
							taskNo: res.data.taskNo
						}).then(msg => {
							if(msg.data){
								msg.data.map(item=>{
									if(item.taskStatus == 3){
										this.haveprocessList.push(item)
									}
								})
								let addchage=JSON.stringify(msg.data)
								this.addform = this.processList[msg.data.length]
								let lastarrat= JSON.parse(addchage).pop()
								
								if(lastarrat.taskStatus == 3 && this.haveprocessList.length != this.processList.length){
									this.addform.deptId=''
									this.addform.deptName=''
									this.addform.seatId=''
									this.addform.templateId=''
									this.addform.inspectStatus=''
								}else{
									this.addform= { ...this.addform, ...lastarrat};  
								}
								
								let flag =  true
								if(this.haveprocessList !=null && this.haveprocessList.length != this.processList.length ){
									flag =  true
								}else if(this.haveprocessList.length == this.processList.length && this.haveprocessList[this.processList.length-1].taskStatus !=3){
									flag =  true
								}else{
									flag =  false
								}
								this.flgs=flag
							}else{
								this.haveprocessList=[]
								this.addform = this.processList[0]
								this.flgs =true
								
							}
							
							
						})
					})
					
					
				})
			},
			goback(){
				uni.navigateTo({
					url:'/pages/bragelist/bragelist'
				})
			},
			firstsend(){
				this.addform.planId=this.form.planId
				firsttasks(this.addform).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title: '派发成功'
						});
						this.getlist()
					}
				})
			},
			sencendbtn(){
				this.addform.planId=this.form.planId
				sentedtasks(this.addform).then(res=>{
					if(res.code == 200){
						uni.showToast({
							title: '成功'
						});
						this.getlist()
					}
				})
			},
			depname(e){
				this.banlist.map(item=>{
					if(item.value == e){
						this.addform.deptName=item.text
					}
				})
			},
			betime(e){
				this.addform.beginTime=e.result
			}
		}
	};
</script>

<style scoped>
	.content {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding-bottom: 150upx;
	}

	.forminfo {
		width: 702upx;
		background-color: white;
		border-radius: 16upx;
		margin-top: 24upx;
		padding: 24upx 32upx;
		box-sizing: border-box;
	}

	.qrimg {
		width: 144upx;
		height: 144upx;
	}

	.collapesimg {
		width: 10upx;
		height: 36upx;
		position: absolute;
		margin-top: 20upx;
	}

	.gongxusep {
		width: 702upx;
		display: flex;
		height:850upx;
		justify-content: space-between;
	}
	.gongxusepteo{
		height:450upx;
	}

	.gongxusep .sepline {
		height: 100%;
		width: 10upx;
		height: 428upx;
		background: url(@/static/sepline.png) no-repeat;
		background-size: 100% 100%;
	}

	.forminfotwo {
		margin-top: 0;
		width: 672upx;
	}

	.btnbox {
		width: 100%;
		background-color: #EFEFEF;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.btnbox .con {
		width: 702upx;
		display: flex;
		height: 108upx;
		align-items: center;
		justify-content: space-around;
	}

	/deep/.uni-select {
		border: none !important;
	}

	/deep/.uni-select--disabled {
		background-color: white;
	}
	.countitle{
		color:#181818;
		font-size:16px;
		position:relative;
		font-weight: 500;
		padding-left:20px
	}
</style>