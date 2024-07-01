<template>
		<view class="content">
			<view class="forminfo">
				<view style="border-bottom: 1px solid #EBEBEB;padding: 20upx 0;color: black;display: flex;justify-content: space-between;align-items: center;">
					<span>梁片信息</span>
					<span v-if="!form.qrCodeImg">-</span>
					<image @click="show=true" v-if="form.qrCodeImg" class="qrimg" :src="form.qrCodeImg"
						style="width: 32px;height: 32px;"></image>
				</view>
				<u-form :model="form" ref="uForm" label-width="160">
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
					<u-form-item label="检验状态">
						<u-tag v-if="inspectionStatus == 7" :text="'完成'" type="success" />
						<u-tag v-if="inspectionStatus == 3":text="'整改'" type="error" />
						<u-tag v-if="inspectionStatus == 5":text="'检验'" type="warning" />
						<u-tag v-if="inspectionStatus == 6":text="'验收'" type="success" />
					</u-form-item>
					
				</u-form>
			</view>
		<view class="AuditLog">
			<view class="Logs">
				<text>审核日志</text>
				<view class="Logsli" v-for="(item,index) in loglist">
					<view><text>审核人</text>{{item.createBy}}</view>
					<view><text>意&emsp;见</text>{{item.auditView || '--'}}</view>
					<view><text>状&emsp;态</text>{{item.state==1?'合格':'不合格' }}</view>
					<view><text>时&emsp;间</text>{{item.createTime}}</view>
					<view><text>工&emsp;序</text>{{item.processName}}</view>
					<view v-if="fitter(item.attachUrl)"><text>附&emsp;件</text><u-image @click="openimg(item.attachUrl)" width="200rpx" height="200rpx" :src="item.attachUrl"></u-image></view>
					<view v-if="!fitter(item.attachUrl)&& item.attachUrl!=null"><text>附&emsp;件</text><u-link :href="item.attachUrl">查看</u-link></view>
				</view>
				
				<view class="nodata Logsli" v-if="loglist.length == 0">
					暂无数据
				</view>
			</view>
		</view>
		<u-popup v-model="show"  mode="center" >
			<image  style="width: 500upx;"  :src="form.qrCodeImg"></image>
		</u-popup>
		<u-popup v-model="attachshow"  mode="center" >
			<image  style="width: 500upx;"  :src="imgurl"></image>
		</u-popup>
	</view>
</template>

<script>
	import { beaminfo, tanklog } from "@/api/inspection.js"
	export default {
		name:'AuditLog',
		data() {
			return {
				form:{},
				inspectionStatus:'',
				loglist:[],
				show:false,
				imgurl:'',
				constructionProcess:'',
				attachshow:''
			}
		},
		onBackPress(e) {
			uni.redirectTo({
				url: '/pages/inspection/inspection'
			});
			return true
		}, 
		onLoad(options){
			this.inspectionStatus=options.inspectionStatus
			beaminfo(options.id).then(res=>{
				this.form=res.data
			})
			tanklog(options.taskId).then(res=>{
				this.loglist=res.data.items
			})
			this.constructionProcess = options.constructionProcess
		},
		methods: {
			fitter(e){
				 var imagePattern = /\.(jpg|jpeg|png|gif)$/i;
				  return imagePattern.test(e);
			},
			openimg(e){
				this.imgurl=e
				this.attachshow=true
			}
		}
	}
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
	.u-flex {
		align-items: flex-start;
		flex-direction:column;
	}
	.nodata{
		line-height: 64upx;
		text-align: center;
		width: 100%;
	}
	.Logsli{
		width: 100%;
		background-color: white;
		border-radius: 16upx;
		line-height: 48upx;
		padding: 30upx;
		margin: 20upx 0;
		box-sizing: border-box;
	}
	.Logsli text{
		margin-right: 25upx;
	}
	.AuditLog{
			width: 702upx;
			margin-top: 20upx;
	}
</style>
