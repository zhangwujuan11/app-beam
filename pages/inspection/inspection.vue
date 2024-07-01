<template>
	<view class="inspection_view">
		<view class="topserch">
			<view class="ser">
				<u-search 
				v-model="queryParams.keyFields"
				shape="square" 
				bg-color="#fff" 
				placeholder="请输入关键词" 
				@custom="getinspctions()"
				:action-style="{background:'#5FB760',color:'white',padding:'5px 0','border-radius': '4px'}">
					
				</u-search>
			</view>
		</view>
		
		<view >
			<u-tabs :list="tabslist"  :is-scroll="false" :current="current" @change="changetabs"></u-tabs>
		</view>
		
		<view class="beams" v-for="item,i in inspections " :key="i">
			<view style="background-color: white;width:100%">
				<view class="beams_title">
					{{ item.beamCode }}
				</view>
				<view style="margin-bottom:10upx ;">
					<span style="margin-right: 25upx;">梁片名称</span>
					<span>{{ item.beamName}}</span>
				</view>
				<view style="margin-bottom:10upx">
					<span style="margin-right:25upx">任务编号</span>
					<span>{{ item.taskNo }}</span>
				</view>
				<view style="margin-bottom:10upx">
					<span style="margin-right:25upx">工序名称</span>
					<span>{{ item.constructionProcess }}</span>
				</view>
						<span style="margin-right:25upx">检验状态</span>
						<u-tag v-if="item.inspectionStatus == 7" :text="'完成'" type="success" />
						<u-tag v-if="item.inspectionStatus == 3":text="'整改'" type="error" />
						<u-tag v-if="item.inspectionStatus == 4":text="'自检'" type="success" />
						<u-tag v-if="item.inspectionStatus == 5":text="'检验'" type="warning" />
						<u-tag v-if="item.inspectionStatus == 6":text="'验收'" type="success" />	

			</view>
				<view class="bts_view">
						<u-button class="bts" type="primary"  v-if="['4','5','6'].includes(item.inspectionStatus)" @click="goAudit(item.beamId,item.inspectionStatus,item.processInspectionId)">工序审核</u-button>
						<u-button class="bts" type="primary"  @click="goAuditLog(item.beamId,item.inspectionStatus,item.taskId,item.constructionProcess)">审核日志</u-button>
				</view>

		</view>
		<br>
		<u-loadmore  :status="Loadstatus" />

	</view>
</template>

<script>
	import { inspectionlist } from '@/api/inspection.js'
	export default {
		data() {
			return {
				// 数据条数
				total:'',
				// 触底刷新状态
				Loadstatus:'',
				// 查询参数
				queryParams: {
					bridgeName:'',
					pageNum: 1,
					pageSize: 10,
					bridgeName: null,
					leftRightSpan: null,
					locationCode: null,
					locationType: null,
					beamDimension: null,
					constructionMethod: null,
					constructionProcess: null,
					constructionTeam: null,
					regionCode: null,
					seatArea: null,
					seatNumber: null,
					templateCode: null,
					inspectionDate: null,
					inspectionStatus: null,
					tenantId: null,
					reviewStatus:1,
					startTime:'',
					endTime:''
				},
				// 没用待删
				queryform:{
					beamCode:'',
				},
				
				// 检验列表
				inspections:[],
				
				// tabs选中项
				current:1,
				
				// tabs列
				tabslist:[
					{
						name:'全部',
					},
					{
						name:'待审核',
						count: 0,
					}
				],
				
			}
		},
		methods: {
			changetabs(index){
				this.current = index;
				this.queryParams.reviewStatus = index
				this.queryParams.pageNum = 1
				this.queryParams.pageSize = 10
				this.getinspctions()
				// this.tabslist[1].count = this.total
				
			},
			goAudit(id,inspectionStatus,processInspectionId){
				uni.navigateTo({
					url: '/pages/Auditinfo/Auditinfo?id='+id+'&inspectionStatus='+inspectionStatus+"&processInspectionId="+processInspectionId
					// url: '/pages/Audit/Audit?id='+id+'&inspectionStatus='+inspectionStatus+"&processInspectionId="+processInspectionId
				})
			},
			goAuditLog(id,ins,taskId,constructionProcess){
				uni.navigateTo({
					url: '/pages/AuditLog/AuditLog?id='+id + '&inspectionStatus=' + ins +'&taskId=' + taskId+"&constructionProcess="+constructionProcess
				})
			},
			getinspctions(){
				inspectionlist(this.queryParams).then((res)=>{
					this.inspections = res.data.items
					this.total = res.data.total
					this.current == 1 && (this.tabslist[1].count = this.total)
				})
			},
			onReachBottom(){
				this.queryParams.pageNum++
				// this.queryParams.pageSize+=10
				// this.getinspctions()
				inspectionlist(this.queryParams).then((res)=>{
					if(res.data.items == null){
						return
					}
					this.inspections = this.inspections.concat(res.data.items)
					this.total = res.data.total
					this.current == 1 && (this.tabslist[1].count = this.total)
				})
				// this.queryParams.pageSize <= this.total && this.getinspctions()
			}
		},
		onLoad(){
			this.queryParams.bridgeName = uni.getStorageSync('brigeName')
			// this.queryParams.bridgeName = "福州418大桥"
			this.getinspctions()
		
		},
		onBackPress(e) {
			uni.reLaunch({
				url:'/pages/index/index'
			})
			return true
		}


	}
</script>

<style scoped>
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
.inspection_view{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.beams{
	display: flex;
	flex-direction: column;
	padding: 20upx 40upx 20upx 40upx;
	box-sizing: border-box;
	background-color: white;
	margin: 20upx 20upx 0upx 20upx;
	font-size: 0.8rem;
	border-radius: 30upx;
}

.beams_title{
	margin-bottom: 20upx;
	/* border: 1upx solid  black; */
	border-bottom: 1px solid #EBEBEB;
	line-height: 62upx;
	color: #666666;
	font-size: 0.8rem;
}
.bts_view{
	margin: 20upx 0 10upx 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.bts{
	/* width:250upx; */
	font-size: 0.8rem;
	/* height: 10upx; */
	/* width:150upx; */
	/* margin:0 0upx 0upx 20upx; */
	margin-left: 40upx;
}
/deep/ .u-badge{
	right: 120upx !important;
	/* display: none !important; */
}
/deep/ .u-size-default.data-v-2bf0e569{
	height: 60upx;
}
</style>
