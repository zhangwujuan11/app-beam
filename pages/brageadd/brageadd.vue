<template>
	<view class="content">
		<view class="forminfo">
			<view style="border-bottom: 1px solid #EBEBEB;padding: 20upx 0;color: black;">梁片信息</view>
			<u-form :model="form" ref="uForm" label-width="140">
				<!-- <u-form-item label="标段名称"  @click.native="show=true"  right-icon="arrow-right">
					<text v-if="!form.name" style="color: #D7D7D7;font-size: 28upx;">请选择标段名称</text>
					<block v-if="form.name">{{form.name}}</block>
					<u-select  v-model="show" mode="single-column" :list="list" @confirm="biaoduan"></u-select>
				</u-form-item> -->
				<!-- <u-form-item label="梁片名称"><u-input v-model="form.lpname" placeholder="请输入梁片名称" /></u-form-item> -->
				<u-form-item label="浇筑日期"  @click.native="showdata=true"  right-icon="arrow-right">
					<text v-if="!form.pouringDate" style="color: #D7D7D7;font-size: 28upx;">请选择浇筑时间</text>
					<block v-if="form.pouringDate">{{form.pouringDate}}</block>
					<u-calendar :pickerOptions="pickerOptions" max-date="2050-01-01"  v-model="showdata" mode="date" @change="showdatachange"></u-calendar>
				</u-form-item>
				<u-form-item label="张拉日期"  @click.native="showdatazl=true"  right-icon="arrow-right">
					<text v-if="!form.tensioningDate" style="color: #D7D7D7;font-size: 28upx;">请选择张拉日期</text>
					<block v-if="form.tensioningDate">{{form.tensioningDate}}</block>
					<u-calendar v-model="showdatazl" mode="date" max-date="2050-01-01"  @change="zlchange"></u-calendar>
				</u-form-item>
				<!-- <u-form-item label="入库时间"  @click.native="showdatark=true"  right-icon="arrow-right">
					<text v-if="!form.rkdate" style="color: #D7D7D7;font-size: 28upx;">请选择入库时间</text>
					<block v-if="form.rkdate">{{form.rkdate}}</block>
					<u-calendar v-model="showdatark" max-date="2050-01-01"  mode="date" @change="jzdatechange"></u-calendar>
				</u-form-item> -->
			</u-form>
		</view>
		<view class="btnbox">
			<view class="con">
				<u-button @click="goback">返回</u-button>
				<u-button @click="changebtn" type="warning">确认提交</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { beamsinfo, updatebrage } from '@/api/index.js'
	export default {
		filters:{
			testTime(e){
				return e.substring(0,e.length-19);
			}
		},
		data() {
			return {
				pickerOptions:{
				    disabledDate(time){  
				        return false  
				    }  
				},
				form: {
					beamId:''
				},
				show:false,//标段下拉框
				showdata:false,//浇筑日期下拉
				showdatazl:false,//张拉日期下拉
				showdatark:false,//入库时间下拉
				radio: '',
				switchVal: false
			};
		},
		mounted() {
			this.getlist()
		},
		onLoad(option) {
			this.form.beamId=option.id
		},
		methods:{
			getlist(){
				beamsinfo(this.form.beamId).then(res=>{
					this.form=res.data
					this.form.pouringDate=this.form.pouringDate.substring(0,this.form.pouringDate.length-8)
					this.form.tensioningDate=this.form.tensioningDate.substring(0,this.form.tensioningDate.length-8)
				})
			},
			//浇筑日期
			showdatachange(e){
				this.form.pouringDate=e.result
			},
			
			// 张拉日期
			zlchange(e){
				this.form.tensioningDate=e.result
			},
			// 返回
			goback(){
				uni.navigateTo({
					url: '/pages/bragelist/bragelist'
				})
			},
			
			// 确认提交修改
			changebtn(){
				updatebrage(this.form).then(res=>{
					if(res.code == 200){
						this.$refs.uToast.show({
							title: '修改成功',
							type: 'success',
							url: '/pages/bragelist/bragelist'
						})
					}
				})
			}
			// // 入库时间
			// jzdatechange(e){
			// 	this.form.rkdate=e.result
			// },
			// // 选择标段
			// biaoduan(e){
			// 	this.form.name=e[0].label
			// 	console.log(e)
			// },
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
	}

	.forminfo {
		width: 702upx;
		background-color: white;
		border-radius: 16upx;
		margin-top: 24upx;
		padding: 24upx 32upx;
		box-sizing: border-box;
	}
	.btnbox{
		width: 100%;
		background-color: #EFEFEF;
		position: fixed;
		bottom: 0;
		
	}
	.btnbox .con{
		width: 702upx;
		display: flex;
		height: 108upx;
		align-items: center;
		justify-content: space-around;
	}
</style>