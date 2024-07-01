<template>
	<view class="content">
		<AuditTn></AuditTn>
		<view class="forminfo">
			<view
				style="border-bottom: 1px solid #EBEBEB;padding: 20upx 0;color: black;display: flex;justify-content: space-between;align-items: center;">
				<span>梁片信息</span>
				<!-- <span v-if="!form.qrCodeImg">-</span> -->
				<image @click="show=true" v-if="form.qrCodeImg" class="qrimg" :src="form.qrCodeImg"
					style="width: 32px;height: 32px;"></image>
			</view>
			<u-form :model="form" ref="uForm" label-width="180">
				<u-form-item label="梁片名称">{{form.beamName}}</u-form-item>
				<u-form-item label="梁板编号">
					<block v-if="!form.beamCode">-</block>
					<block v-if="form.beamCode">{{form.beamCode}}</block>
				</u-form-item>
				<u-form-item label="左右幅">
					<block v-if="!form.leftRightSpan">-</block>
					<block v-if="form.leftRightSpan">{{form.leftRightSpan == '01' ? '左幅' :'右幅'}}</block>
				</u-form-item>
				<u-form-item label="桥墩名称">
					<block v-if="!form.pierId">-</block>
					<block v-if="form.pierId">{{form.pierNo}}</block>
				</u-form-item>
				<u-form-item label="浇筑日期">
					<block v-if="!form.pouringDate">-</block>
					<block v-if="form.pouringDate">{{form.pouringDate}}</block>
				</u-form-item>
				<u-form-item label="张拉日期">
					<block v-if="!form.tensioningDate">-</block>
					<block v-if="form.tensioningDate">{{form.tensioningDate}}</block>
				</u-form-item>
				<u-form-item label="梁片尺寸">
					<block v-if="!form.beamSize">-</block>
					<block v-if="form.beamSize">{{form.beamSize}}</block>
				</u-form-item>
				<u-form-item label="梁板强度">
					<block v-if="!form.beamStrength">-</block>
					<block v-if="form.beamStrength">{{form.beamStrength}}</block>
				</u-form-item>
				<u-form-item label="预制长度">
					<block v-if="!form.prefabricatedLength">-</block>
					<block v-if="form.prefabricatedLength">{{form.prefabricatedLength}}米</block>
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
				<u-form-item label="建设单位">
					<block v-if="!form.constructionUnit">-</block>
					<block v-if="form.constructionUnit">{{form.constructionUnit}}</block>
				</u-form-item>
				<u-form-item label="设计单位">
					<block v-if="!form.designUnit">-</block>
					<block v-if="form.designUnit">{{form.designUnit}}</block>
				</u-form-item>
				<u-form-item label="监理单位">
					<block v-if="!form.supervisionUnit">-</block>
					<block v-if="form.supervisionUnit">{{form.supervisionUnit}}</block>
				</u-form-item>
				<u-form-item label="施工单位">
					<block v-if="!form.constructionCompany">-</block>
					<block v-if="form.constructionCompany">{{form.constructionCompany}}</block>
				</u-form-item>



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
								<view class="forminfoCrad">
										<view>
											<span>施工班组</span>
											{{item.deptName || '-'}}
										</view>
										<view>
											<span>台座编号</span>
											{{item.seatCode || '-'}}
										</view>
										<view>
											<span>模版编号</span>
											{{ item.templateNumber || '-' }}
										</view>
										<view>
											<span>开始时间</span>
											{{item.beginTime || '-'}}
										</view>
										<view>
											<span>结束时间</span>
											{{ item.endTime || '-' }}
										</view>
										<view>
											<span>验收状态</span>
											{{ item.inspectStatus == 1 ? '合格' : '不合格' }}
										</view>
								</view>
							</view>
						</view>
					</u-collapse-item>
			</view>
		</u-collapse>
		<!-- 派发工序 -->
		<view style="margin-top: 20px;"  v-if="flgs && flgsss">
			<image src="@/static/titleinfo.png" class="collapesimg">
				<view style="display: flex;justify-content: space-between;">
					<text class="countitle" >{{addform.processName}}</text>
					<u-tag text="工序审核（自检）" type="warning" v-if="addform.taskStatus == 4"/>
					<u-tag text="工序审核（项目人员检验）" type="warning" v-if="addform.taskStatus == 5"/>
					<u-tag text="工序审核（监理人员验收）" type="warning" v-if="addform.taskStatus == 6"/>
				</view>
				<view class="gongxusep gongxusepteo" style="margin-top: 10px;">
					<view class="sepline"></view>
					<view class="forminfo forminfotwo">
						<u-form :model="addform" ref="addform" label-width="180">
							<u-form-item label="施工班组" prop="category" >
								{{addform.deptName}}
							</u-form-item>
							<u-form-item label="台座编号" >
								{{ addform.seatCode }}
							</u-form-item>
							<u-form-item label="模版编号" >
								{{ addform.templateNumber }}
							</u-form-item>
							<!-- <u-form-item label="开始时间" >
								{{ addform.beginTime || '-' }}
							</u-form-item>
							<u-form-item label="结束时间" >
								{{ addform.endTime || '-'}}
							</u-form-item> -->
							<u-form-item label="验收状态" disabled v-if="addform.taskStatus == 2">
								<uni-data-select v-model="addform.inspectStatus" :localdata="yanstatus"></uni-data-select>
							</u-form-item>
							<u-form-item label="意见" class="Opinions" v-if="addform.taskStatus == 4 || addform.taskStatus == 5 ||addform.taskStatus == 6 ">
									<u-input v-model="addform.content" type="textarea" :border="true" :height="100" :auto-height="true" />
								</u-form-item>
								<u-form-item label="附件" class="Opinions"  v-if="addform.taskStatus == 4 || addform.taskStatus == 5 ||addform.taskStatus == 6 ">
									<view>
										<u-upload
										class="upload"
										:header='Upheader'
										ref="uUpload"  
										max-count="1"
										accept="image" 
										:action="action"
										:auto-upload="false"
										@on-success="uploadSuccess"
										@on-choose-complete="onComlete"
										>
										</u-upload>
									</view>
								</u-form-item>
								<u-form-item  v-if="addform.taskStatus == 4 && checkPermi(['beam:inspection:selfInspection'])">
									<view style="display: flex;justify-content: center;">
										<button class="ybtn"  @click='auditingpass(addform.taskStatus)' style="background-color: #2979ff;" type="primary">合格</button>
										<button class="ybtn"  @click="auditingdispass(addform.taskStatus)" type="error">不合格</button>
									</view>
								</u-form-item>
								<u-form-item  v-if="addform.taskStatus == 5 && checkPermi(['beam:inspection:test'])">
									<view style="display: flex;justify-content: center;">
										<button class="ybtn"  @click='auditingpass(addform.taskStatus)' style="background-color: #2979ff;" type="primary">合格</button>
										<button class="ybtn"  @click="auditingdispass(addform.taskStatus)" type="error">不合格</button>
									</view>
								</u-form-item>
								<u-form-item  v-if="addform.taskStatus == 6 && checkPermi(['beam:inspection:acceptance'])">
									<view style="display: flex;justify-content: center;">
										<button class="ybtn"  @click='auditingpass(addform.taskStatus)' style="background-color: #2979ff;" type="primary">合格</button>
										<button class="ybtn"  @click="auditingdispass(addform.taskStatus)" type="error">不合格</button>
									</view>
								</u-form-item>
							</u-form>
							<u-toast ref="uToast"></u-toast>
							<!-- <view class="btnbox">
								<view class="con">
									<u-button @click="goback">返回</u-button>
									<u-button type="warning" disabled v-if="addform.taskStatus == 4">工序审核（自检）</u-button>
									<u-button type="warning" disabled v-if="addform.taskStatus == 5">工序审核（项目人员检验）</u-button>
									<u-button type="warning" disabled v-if="addform.taskStatus == 6">工序审核（监理人员验收）</u-button>
								</view>
							</view> -->
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
	import AuditTn from '@/pages/Audit/Audit.vue'
	
	import { inspectioninfo,selfInspection,inspectionstest,acceptance} from "@/api/audit.js"
	import { getToken } from '@/utils/auth'
	import { checkPermi } from "@/utils/permission";
	import config from '@/config'
	const baseUrl = config.baseUrl 
	
	
	export default {
		name:'AuditnInfo',
		components:{
			AuditTn,
		},
		props: {
			// props_id: {
			// 	type: String,
			// 	// required: true,
			// }
		},
		data() {
			return {
				// 检验状态
				inspectionStatus:'',
				// 检验ID
				processInspectionId:'',
				// 传入组件ID
				props_id:'',
				// 提交地址
				// 文件List
				fileList:[],
				// 检验表单
				auditingform:{
					"processInspectionId": 0,
					"taskId": 0,
					"content": "",
					"attachUrl": "",
					"state": 0
				},
				// 上传图片请求头
				Upheader:{
					Authorization:'Bearer ' + getToken()
				},
				// 提交地址
				action: baseUrl + '/common/ossUpload',
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
		onBackPress(e) {  
			uni.redirectTo({
				url: '/pages/inspection/inspection'
			});
			return true
		}, 
		onLoad(options) {
			this.inspectionStatus = options.inspectionStatus
			this.processInspectionId= options.processInspectionId
			this.id = options.id 
			if(options.showcheck){
				this.flgsss=false
			}else{
				this.flgsss=true
			}
		},
		mounted() {
			!this.id && (this.id = this.props_id,this.flgsss=false)
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
			// allailist().then(res=>{
			// 	res.data.items.map(item => {
			// 		this.alllist.push({
			// 			text: item.seatCode,
			// 			value: item.seatId
			// 		})
			// 	})
			// })			
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
			checkPermi,
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
									if(item.taskStatus == 7){
										this.haveprocessList.push(item)
									}
								})
								let addchage=JSON.stringify(msg.data)
								this.addform = this.processList[msg.data.length]
								let lastarrat= JSON.parse(addchage).pop()
								if(lastarrat.taskStatus == 7 && this.haveprocessList.length != this.processList.length){
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
				this.$delete(this.fileList, 0)
			},
			goback(){
				uni.reLaunch({
					url: '/pages/inspection/inspection'
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
			},
				// async Submitaudit(){
				// 					this.auditingform.processInspectionId = this.processInspectionId
				// 					let inspectioninfoRes = await inspectioninfo(this.processInspectionId)
				// 					this.auditingform.taskId = inspectioninfoRes.data.taskId
				// 					// console.log('提交成功',data);
				// 					// console.log('inspectioninfo',inspectioninfoRes);
				// 					// console.log('this.auditingform',this.auditingform)
				// 					let inspectionRes = ''
				// 					switch (this.inspectionStatus){
				// 						case '4':
				// 						// console.log('66666');
				// 							inspectionRes = await selfInspection(this.auditingform)
				// 							break;
				// 						case '5':
				// 							inspectionRes = await inspectionstest(this.auditingform)
				// 							break;
				// 						case '6':
				// 							inspectionRes = await acceptance(this.auditingform)
				// 							break;
								
				// 					}
				// 					if( inspectionRes.code == 200){
				// 						this.$refs.uToast.show({
				// 							type: 'success',
				// 							title: inspectionRes.message,
				// 							message: inspectionRes.message,
				// 							duration:1000,
				// 							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				// 							url: '/pages/inspection/inspection',
				// 							complete() {
				// 								uni.navigateBack({
				// 									delta: 2
				// 								});
				// 							}
				// 						})
				// 					}else{
				// 						this.$refs.uToast.show({
				// 							type: 'error',
				// 							title: '失败',
				// 							message: inspectionRes.data,
				// 							duration:1000,
				// 							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				// 							url: '/pages/inspection/inspection',
				// 							complete() {
				// 								uni.navigateBack({
				// 									delta: 2
				// 								});
				// 							}
				// 						})
				// 					}
				// 			},
			
			// 合格
				auditingpass(index){
					// 1 合格 2 不合格
					this.addform.state = 1
					this.$nextTick(()=>{
						if(index == 4){
							selfInspection(this.addform).then(res=>{
								if(res.code == 200){
									this.$refs.uToast.show({
										type: 'success',
										title: '成功',
										message: '成功',
										duration:1000,
										iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
									})
									uni.reLaunch({
										url:'/pages/inspection/inspection'
									})
								}
							})
						}else if (index == 5){
							inspectionstest(this.addform).then(res=>{
								if(res.code == 200){
									this.$refs.uToast.show({
										type: 'success',
										title: '成功',
										message: '成功',
										duration:1000,
										iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
									})
									uni.reLaunch({
										url:'/pages/inspection/inspection'
									})
								}
							})
						}else if(index == 6){
							acceptance(this.addform).then(res=>{
								if(res.code == 200){
								
									this.$refs.uToast.show({
										type: 'success',
										title: '成功',
										message: '成功',
										duration:1000,
										iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
									})
									uni.reLaunch({
										url:'/pages/inspection/inspection'
									})
								}
							})
						}
					})
				},
				// 不合格
				auditingdispass(index){
					// 1 合格 2 不合格
					this.addform.state = 2
					this.$nextTick(()=>{
						if(!this.addform.content){
							uni.showToast({
								icon: 'error',
								title:'请输入审核意见'
							});
							
							return false
						}else{
							if(index == 4){
								selfInspection(this.addform).then(res=>{
									if(res.code == 200){
										if(res.code == 200){
											uni.showToast({
												title: res.message
											});
											uni.reLaunch({
												url:'/pages/inspection/inspection'
											})
										}
									}
								})
							}else if (index == 5){
								inspectionstest(this.addform).then(res=>{
									if(res.code == 200){
										uni.showToast({
											title: res.message
										});
										uni.reLaunch({
											url:'/pages/inspection/inspection'
										})
									}
								})
							}else if(index == 6){
								acceptance(this.addform).then(res=>{
									if(res.code == 200){
										uni.showToast({
											title: res.message
										});
										uni.reLaunch({
											url:'/pages/inspection/inspection'
										})
									}
								})
							}
						}
					})
				},
				// 提交审核意见
				// async Submitaudit(){
				// 		this.auditingform.processInspectionId = this.processInspectionId
				// 		let inspectioninfoRes = await inspectioninfo(this.processInspectionId)
				// 		this.auditingform.taskId = inspectioninfoRes.data.taskId
				// 		let inspectionRes = ''
				// 		switch (this.inspectionStatus){
				// 			case '4':
				// 				inspectionRes = await selfInspection(this.auditingform)
				// 				break;
				// 			case '5':
				// 				inspectionRes = await inspectionstest(this.auditingform)
				// 				break;
				// 			case '6':
				// 				inspectionRes = await acceptance(this.auditingform)
				// 				break;
					
				// 		}
				// 		if( inspectionRes.code == 200){
				// 			this.$refs.uToast.show({
				// 				type: 'success',
				// 				title: inspectionRes.message,
				// 				message: inspectionRes.message,
				// 				duration:1000,
				// 				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				// 				url: '/pages/inspection/inspection',
				// 				complete() {
				// 					uni.navigateBack({
				// 						delta: 2
				// 					});
				// 				}
				// 			})
				// 		}else{
				// 			this.$refs.uToast.show({
				// 				type: 'error',
				// 				title: '失败',
				// 				message: inspectionRes.data,
				// 				duration:1000,
				// 				iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
				// 				url: '/pages/inspection/inspection',
				// 				complete() {
				// 					uni.navigateBack({
				// 						delta: 2
				// 					});
				// 				}
				// 			})
				// 		}
				// },
				uploadSuccess(data){
					this.addform.attachUrl = data.data
				},
				// 选择文件完毕
				onComlete(list,data){
					this.fileList = list
					this.$refs.uUpload.upload()
				},
				goupback(){
					uni.navigateBack({
						delta:1
					})
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
		overflow: hidden;
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
		/* height:850upx; */
		justify-content: space-between;
	}
	.gongxusepteo{
		/* height:450upx; */
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
	.countitle{
		color:#181818;
		font-size:16px;
		position:relative;
		font-weight: 500;
		padding-left:20px
	}
	.ybtn{
		width:180upx;
		font-size: 14px;
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
	.Opinions{
		background-color: white;
		padding: 0upx;
		margin: 0upx;
		width: 100%;
	}
	.Opinions_text{
		display: block;
		margin: 30upx 0upx;
		/* margin-bottom: 20upx; */
		/* color:red; */
		
	}
	.buts{
		display: flex;
		margin-top: 50upx;
		justify-content: space-between;
	}
	.forminfoCrad{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.forminfoCrad span{
		display: block;
		margin-right: 50upx;
	}
	.forminfoCrad view{
		display: flex;
		color:black;
		flex-direction: row;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #303133;
		box-sizing: border-box;
		line-height: 70rpx;
	}
	/deep/.uni-select__selector{
		z-index: 999 !important;
	}
	/deep/.Opinions .u-form-item__body{
		display: block !important;
	}
</style>