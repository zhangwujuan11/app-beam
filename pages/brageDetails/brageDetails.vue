<template>
	<view class="content">
		<view class="forminfo">
			<view
				style="border-bottom: 1px solid #EBEBEB;padding: 20upx 0;color: black;display: flex;justify-content: space-between;align-items: center;">
				<span>梁片信息</span>
				<!-- <span v-if="!form.qrCodeImg">-</span> -->
				<image @click="show=true" v-if="form.qrCodeImg" class="qrimg" :src="form.qrCodeImg"
					style="width: 32px;height: 32px;"></image>
			</view>
			<u-form :model="form" ref="uForm" label-width="180">
				<!-- <u-form-item label="梁片名称">{{form.beamName}}</u-form-item>
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
				</u-form-item> -->
				<!-- <u-form-item label="试验负责人">
					<block v-if="!form.testingManager">-</block>
					<block v-if="form.testingManager">{{form.testingManager}}</block>
				</u-form-item> -->
				<!-- <u-form-item label="施工单位">
					<block v-if="!form.constructionCompany">-</block>
					<block v-if="form.constructionCompany">{{form.constructionCompany}}</block>
				</u-form-item>
				<u-form-item label="梁板编号">
					<block v-if="!form.beamCode">-</block>
					<block v-if="form.beamCode">{{form.beamCode}}</block>
				</u-form-item>
				<u-form-item label="左右幅">
					<block v-if="!form.leftRightAmplitude">-</block>
					<block v-if="form.leftRightAmplitude">{{form.leftRightAmplitude}}</block>
				</u-form-item>
				<u-form-item label="桥墩名称">
					<block v-if="!form.beamName">-</block>
					<block v-if="form.beamName">{{form.beamName}}</block>
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
					<block v-if="!form.designLength">-</block>
					<block v-if="form.designLength">{{form.designLength}}</block>
				</u-form-item>
				<u-form-item label="建设单位">
					<block v-if="!form.constructionUnit">-</block>
					<block v-if="form.constructionUnit">{{form.constructionUnit}}</block>
				</u-form-item>
				<u-form-item label="设计单位">
					<block v-if="!form.designUnit">-</block>
					<block v-if="form.designUnit">{{form.designUnit}}</block>
				</u-form-item> -->
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
		<u-collapse :head-style="{'color':'#181818','font-size':'16px','position':'relative','font-weight': '500','padding-left':'20px'}">
			<view v-for="(item,index) in haveprocessList" :key="index">
				<image src="@/static/titleinfo.png" class="collapesimg">
				<u-collapse-item :title="'工序名称：'+ item.processName">
					<view class="gongxusep">
						<view class="sepline"></view>
						<view class="forminfo forminfotwo">
					<!-- 	{{item.deptName}}
						{{item.deptName}}
						{{item.deptName}}
						{{item.deptName}}
						{{item.deptName}}
						{{item.deptName}}
						{{item.deptName}}
						{{item.deptName}} -->
							<u-form :model="item"  label-width="180">
								<u-form-item label="施工班组">{{item.deptName}}</u-form-item>
								<u-form-item label="台座编号">{{item.seatCode}}</u-form-item>
								<u-form-item label="模版编号">{{item.templateNumber}}</u-form-item>
								<u-form-item label="开始时间">{{item.beginTime}}</u-form-item>
								<u-form-item label="结束时间">{{item.endTime}}</u-form-item>
								<u-form-item label="验收状态">{{item.inspectStatus ? '合格' : '不合格'}}</u-form-item>
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
					<view class="forminfo forminfotwo" style="padding-bottom: 120upx;">
						<u-form :model="addform" ref="addform" label-width="180">
							<u-form-item label="施工班组" prop="category" right-icon="arrow-right">
								<uni-data-select  v-if="addform.taskStatus == null" v-model="addform.deptId"  :localdata="banlist" @change="depname($event)"></uni-data-select>
								<text v-else>{{addform.deptName}}</text>
							</u-form-item>
							<u-form-item label="台座编号" right-icon="arrow-right">
								<uni-data-select v-model="addform.seatId" :disabled="addform.taskStatus != null" :localdata="freelist"></uni-data-select>
							</u-form-item>
							<u-form-item label="模版编号" right-icon="arrow-right">
								<uni-data-select v-model="addform.templateId" :disabled="addform.taskStatus != null" :localdata="mobanlist"></uni-data-select>
							</u-form-item>
							<!-- <u-form-item label="验收状态" right-icon="arrow-right"  v-if="addform.taskStatus == 4 || addform.taskStatus == 5 ||addform.taskStatus == 6 ">
								<uni-data-select v-model="addform.inspectStatus" :localdata="yanstatus"></uni-data-select>
							</u-form-item> -->
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
						<view class="btnbox">
							<view class="con">
								<u-button @click="goback">返回</u-button>
								<u-button @click="sencendbtn" type="warning" v-if="addform.taskStatus == 1 && checkPermi(['beam:inspection:accept'])">接收</u-button>
								<u-button @click="sencendbtn" type="warning" v-if="addform.taskStatus == 2 && checkPermi(['beam:inspection:inProgress'])">进行中</u-button>
								<u-button @click="sencendbtn" type="warning" v-if="addform.taskStatus == 3 && checkPermi(['beam:inspection:underRectification'])">整改中</u-button>
								<u-button type="warning" disabled v-if="addform.taskStatus == 4">工序审核（自检）</u-button>
								<u-button type="warning" disabled v-if="addform.taskStatus == 5">工序审核（项目人员检验）</u-button>
								<u-button type="warning" disabled v-if="addform.taskStatus == 6">工序审核（监理人员验收）</u-button>
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
	import { getToken } from '@/utils/auth'
	import { inspectioninfo,selfInspection,inspectionstest,acceptance} from "@/api/audit.js"
	import config from '@/config'
	import { checkPermi } from "@/utils/permission";
	const baseUrl = config.baseUrl 
	export default {
		name:'brageinfo',
		props: {
			props_id: {
				type: String,
			}
		},
		data() {
			return {
				ConstructionTeams:[],
				ConstructionCrew:[],
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
				showtime:false,
				fileList:[],
				planId:'',
				isf:0
			};
		},
		onLoad(option) {
			this.id = option.id
			this.planId = option.planId
			this.isf = option.isf
			if(option.showcheck){
				this.flgsss=false
			}else{
				this.flgsss=true
			}
		},
		onBackPress(e) {  
			uni.redirectTo({
				url: '/pages/bragelist/bragelist'
			});
			return true
		}, 
		mounted() {
			!this.id && (this.id = this.props_id,this.flgsss=false)
			this.getlist()
			// 空闲台座
			// console.log('222',this.planId);
			// if(isf == 1){
			// 	return
			// }
			// freetailist(this.id).then(res => {
			// 	if(res.data){
			// 		res.data.map(item => {
			// 			this.freelist.push({
			// 				text: item.seatCode,
			// 				value: item.seatId
			// 			})
			// 		})
			// 	}
			// })
			// 施工班组
			banlisu().then(res => {
				this.ConstructionCrew = res.data
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
					// console.log('res.data.methodSettingsId',res.data.methodSettingsId);
					res.data.methodSettingsId!=null && listsettingss(res.data.methodSettingsId).then(da => {
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
								}else if(this.haveprocessList.length == this.processList.length && this.haveprocessList[this.processList.length-1].taskStatus !=7){
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
							// 施工班组过滤
							  this.$set(this.addform,"teamIds",this.addform.teamIds.split(','))
							  this.$set(this.addform,"teamIdsdep",[])
							  for(let i=0;i<this.ConstructionCrew.length;i++){
							    for(let q=0;q<this.addform.teamIds.length;q++){
							      if(this.addform.teamIds[q]==this.ConstructionCrew[i].deptId){
							        this.addform.teamIdsdep.push(this.ConstructionCrew[i])
							      }
							    }
							  }           
							this.addform.teamIdsdep.map(item => {
								this.banlist.push({
									text: item.deptName,
									value: item.deptId
								})
							})
						})
					})
				})
				this.$delete(this.fileList, 0)
			},
			goback(){
				uni.reLaunch({
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
			// 合格
			auditingpass(index){
				// 1 合格 2 不合格
				this.addform.state = 1
				this.$nextTick(()=>{
					if(index == 4){
						selfInspection(this.addform).then(res=>{
							if(res.code == 200){
								uni.showToast({
									title: res.message
								});
								this.getlist()
							}
						})
					}else if (index == 5){
						inspectionstest(this.addform).then(res=>{
							if(res.code == 200){
								uni.showToast({
									title: res.message
								});
								this.getlist()
							}
						})
					}else if(index == 6){
						acceptance(this.addform).then(res=>{
							if(res.code == 200){
								uni.showToast({
									title: res.message
								});
								this.getlist()

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
										this.getlist()
									}
								}
							})
						}else if (index == 5){
							inspectionstest(this.addform).then(res=>{
								if(res.code == 200){
									uni.showToast({
										title: res.message
									});
									this.getlist()
								}
							})
						}else if(index == 6){
							acceptance(this.addform).then(res=>{
								if(res.code == 200){
									uni.showToast({
										title: res.message
									});
									this.getlist()
								}
							})
						}
					}
				})
			},
			uploadSuccess(data){
				this.addform.attachUrl = data.data
			},
			// 选择文件完毕
			onComlete(list,data){
				this.fileList = list
				this.$refs.uUpload.upload()
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
		height:fit-content;
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
		height:fit-content;
	}

	.btnbox {
		width: 100%;
		background-color: #EFEFEF;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
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
	.ybtn{
		width:180upx;
		font-size: 14px;
	}
	/deep/.u-collapse-body {
		max-height:740upx !important;
	}
	/deep/.uni-select__selector{
		z-index: 999 !important;
	}
	/deep/.Opinions .u-form-item__body{
		display: block !important;
	}
</style>
