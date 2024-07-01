<template>
	<view>
	<!-- 	<brageinfo :props_id="props_id">
			
		</brageinfo> -->
		<view class="Opinions" v-if="['4','5','6'].includes(inspectionStatus)">
			<span>意见</span>
			<u-input v-model="auditingform.content" type="textarea" :border="true" :height="100" :auto-height="true" />
			<span>附件</span>
			<u-upload 
			class="upload"
			:header='Upheader'
			ref="uUpload"  
			max-count="1"
			accept="image" 
			:action="action"
			:auto-upload="false"
			@on-success="uploadSuccess"
			@on-change="onchange"
			@on-choose-complete="onComlete"
			>
			</u-upload>
			<view class="buts" >
				<u-button  type="info">返回</u-button>
				<u-button  @click='auditingpass' type="primary">合格</u-button>
				<u-button  @click="auditingdispass" type="error">不合格</u-button>
			</view>
		<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
	// import brageinfo from "@/pages/brageinfo/brageinfo.vue"
	import { inspectioninfo,selfInspection,inspectionstest,acceptance} from "@/api/audit.js"
	import { getToken } from '@/utils/auth'
	import config from '@/config'
	const baseUrl = config.baseUrl 
	export default {
		name:'AuditTn',
		
		// components:{
		// 	brageinfo
		// },
		data() {
			return {
				// 检验状态
				inspectionStatus:'',
				// 检验ID
				processInspectionId:'',
				// 传入组件ID
				props_id:'',
				// 提交地址
				action: baseUrl + '/common/ossUpload',
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
					Authorization:''
				},

			}
		},
		onLoad(options){
			console.log('options',options);
			this.props_id = options.id
			this.inspectionStatus = options.inspectionStatus
			this.processInspectionId= options.processInspectionId
		},
		methods: {
			// 合格
			auditingpass(){
				// 1 合格 2 不合格
				this.auditingform.state = 1
				this.Upheader.Authorization = 'Bearer ' + getToken()
				this.$refs.uUpload.upload();
				this.fileList.length == 0 ? this.Submitaudit() : this.$refs.uUpload.upload();
				console.log(this.auditingform);
				// ossUpload(this.auditingform).then(res=>{
				// 	console.log('上传',res);
				// })
				// selfInspection(this.auditingform).then((res)=>{
				// 	console.log('合格',res);
				// })
			},
			// 不合格
			auditingdispass(){
				console.log('22222');
				this.auditingform.state = 2
				this.Upheader.Authorization = 'Bearer ' + getToken()
				if(this.auditingform.content == ''){
					console.log('4444');
					this.$refs.uToast.show({
						type: 'error',
						title: '请输入意见',
						message: '请输入意见',
						duration:1000,
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
					})
					return
				}
				console.log('3333');
				
				this.fileList.length == 0 ? this.Submitaudit() : this.$refs.uUpload.upload();
				
			},
			uploadSuccess(data){
				this.auditingform.attachUrl = data.data
				this.Submitaudit()
			},
			// 提交审核意见
			async Submitaudit(){
					this.auditingform.processInspectionId = this.processInspectionId
					let inspectioninfoRes = await inspectioninfo(this.processInspectionId)
					this.auditingform.taskId = inspectioninfoRes.data.taskId
					// console.log('提交成功',data);
					console.log('inspectioninfo',inspectioninfoRes);
					console.log('this.auditingform',this.auditingform)
					let inspectionRes = ''
					switch (this.inspectionStatus){
						case '4':
						console.log('66666');
							inspectionRes = await selfInspection(this.auditingform)
							break;
						case '5':
							inspectionRes = await inspectionstest(this.auditingform)
							break;
						case '6':
							inspectionRes = await acceptance(this.auditingform)
							break;
				
					}
					if( inspectionRes.code == 200){
						this.$refs.uToast.show({
							type: 'success',
							title: inspectionRes.message,
							message: inspectionRes.message,
							duration:1000,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							url: '/pages/inspection/inspection',
							complete() {
								uni.navigateBack({
									delta: 2
								});
							}
						})
						console.log('成功');
					}else{
						this.$refs.uToast.show({
							type: 'error',
							title: '失败',
							message: inspectionRes.data,
							duration:1000,
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							url: '/pages/inspection/inspection',
							complete() {
								uni.navigateBack({
									delta: 2
								});
							}
						})
					}
					console.log('inspectionRes',inspectionRes);
					console.log('inspectionStatus',this.inspectionStatus);
					
				
			},
			onchange(data){
				console.log('change',data);
			},
			// 选择文件完毕
			onComlete(list,data){
				this.fileList = list
				console.log('选择文件完毕',list,this.fileList);
			}
		}
	}
</script>

<style>
.Opinions{
	background-color: white;
	padding: 20upx;
	margin: 15upx 20upx;
}
.buts{
	display: flex;
	
}
/* .upload{
	margin: 0 auto;
} */
</style>
