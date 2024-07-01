<template>
	<view class="content">
		<view class="userinfo">
			<u-avatar :src="avatar" size="150" style="margin-right: 30upx;"></u-avatar>
			<view class="">
				<span style="display: block;font-weight: 900;font-size: 1.2rem;">{{deptName}}</span>
				<span style="display: block;font-size: 1.1rem;margin-top: 15upx;">{{userName}}</span>
			</view>
		</view>
		<view class="menuList">
			<u-cell-group>
				<!-- <u-cell-item icon="setting-fill" title="我的信息"></u-cell-item> -->
				<u-cell-item icon="map" title="切换桥梁" @click="show = true" :value="brigename"></u-cell-item>
				<u-cell-item icon="account-fill" title="用户协议" @click="RegAgreement"></u-cell-item>
				<u-cell-item icon="file-text-fill" title="隐私政策" @click="Privacy"></u-cell-item>
				<!-- <u-cell-item icon="setting-fill" title="修改密码"></u-cell-item> -->
				<u-cell-item icon="question-circle-fill" title="当前版本" :value="version==''?'V1.0.0':version" :arrow = 'false'></u-cell-item>
			</u-cell-group>
		</view>
		<view class="buts">
			<u-button type="primary" @click="loguot" class="loguot" >退出登录</u-button>
		</view>
			<!-- <u-button type="success" @click="show = true" >{{brigename}}</u-button> -->
			<u-select
			v-model="show" 
			:list="list" 
			:default-value="defaultValue"
			label-name="bridgeName" 
			value-name="bridgeId" 
			@confirm="confirmSelectClick"
			></u-select>
			<!-- <u-toast ref="uToast" /> -->
	</view>
</template>

<script>
	import { allbriges } from '@/api/index.js'
	import { getInfo } from '@/api/mine.js'
	import config from '@/config'
	import storage from '@/utils/storage'
	import store from '@/store'
	const baseUrl = config.baseUrl
	
	export default {
		data() {
			return {
				show: false,
				list: [],
				defaultValue:[0],
				brigename:'',
				userName:'',
				deptName:'',
				avatar:'',
				version:'V1.0.0'
			}
		},
		onLoad() {
			const accountInfo = uni.getAccountInfoSync();
			this.version=accountInfo.miniProgram.version//仅线上有用
			this.userName=uni.getStorageSync('storage_data').vuex_name
			this.getlist()
			getInfo().then((res)=>{
				this.deptName = res.user.dept.deptName
				this.avatar = baseUrl + res.user.avatar
				// this.avatar = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" //测试使用头像
				// console.log('userinfo',res,this.avatar);
			})
		},
		methods: {
			// 大桥切换
			confirmSelectClick(e,i) {
				let _e = JSON.parse(JSON.stringify(e))
				if(_e[0].label=='null' || _e[0].label == null){
					this.getlist()
					return
				}
				this.brigename=e[0].label

				// this.defaultValue =
				this.$store.state.brigeId=e[0].value
				this.$store.state.brigeName=e[0].label
				uni.setStorageSync('brigeId',e[0].value); 
				uni.setStorageSync('brigeName',e[0].label); 
				// console.log(this.$store.state.brigeName)
				this.getlist()
					// e[0].value !='' && this.$refs.uToast.show({
					// 	title: '切换成功',
					// 	type: 'success',
					// })
			},
			getlist() {
				allbriges().then(res=>{
					this.list=res.data
					if(uni.getStorageSync('brigeId')){
						this.brigename=uni.getStorageSync('brigeName')
						this.$store.state.brigeId=res.data[0].bridgeId
						this.$store.state.brigeName=res.data[0].bridgeName
					}else{
						this.brigename=res.data[0].bridgeName
						this.$store.state.brigeId=res.data[0].bridgeId
						this.$store.state.brigeName=res.data[0].bridgeName
						uni.setStorageSync('brigeId',res.data[0].bridgeId);
						uni.setStorageSync('brigeName',res.data[0].bridgeName); 
					}
					this.list.filter((e,i)=>{
						e.bridgeId == uni.getStorageSync('brigeId') && (this.defaultValue = [i])
					})
				})
				
			},
			loguot(){
				uni.showModal({
					title: "注意",
					content: "确定退出系统吗？",
					success: function (res) {
						if (res.confirm) {
							store.dispatch('LogOut').then(res => {
							  uni.removeStorage({
							  	key:'brigeName'
							  })
							  uni.removeStorage({
							  	key:'brigeId'
							  })
							  uni.reLaunch({
							    url: '/pages/login'
							  })
							}) 
						}
					}
				})
			},
			Privacy(){
				const PrivacyURL = 'https://test.ayingtech.com/pc/ys.html'
				uni.navigateTo({
					
					url:'/pages/Agreement/Agreement?title=隐私协议&url='+PrivacyURL
				})
			},
			RegAgreement(){
				const PrivacyURL = 'https://test.ayingtech.com/pc/user.html'
				uni.navigateTo({
					url:'/pages/Agreement/Agreement?title=用户协议&url='+PrivacyURL
				})
			}
			
		}
	}
</script>

<style scoped>
.content{
	padding: 20upx;
	box-sizing: border-box;
}
.userinfo{
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 30upx;
}
.loguot{
	margin-top: 100upx;
}

/deep/ .u-size-default.data-v-2bf0e569 {
	margin-top: 50upx;
}
</style>
