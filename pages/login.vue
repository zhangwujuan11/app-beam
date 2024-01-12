<template>
<view class="login-container" style="background: url('../static/loginbg.png');background-size: 100% 100%;">
    <view class='login-context'>
        <view>
            <image src="../static/logo.png" style="width: 224upx;height: 224upx;"></image>
        </view>
        <view>
            <view style="font-size: 44upx; color:#333333;margin-bottom: 20upx;">
               欢迎来到智慧梁场管理系统
            </view>
        </view>
        <view style='margin-top:158upx;'>
            <form bindsubmit='loginForm'>
                <view style="position: relative;">
                    <input placeholder="请输入用户名" name='name' type='text'  v-model="loginForm.username"
                        style="background:#FFFFFF;color:#BCBCC1;height: 100upx;width:570upx;border-radius: 50upx; font-size: 28upx;padding:0 35upx;padding-left: 70upx;"
                        placeholder-style="color:#BCBCC1;" />
                    <image src="../static/user_icon.png"
                        style="width: 40upx;height: 40upx;position: absolute;top:28upx;left: 15upx;"></image>
                </view>
                <view style="margin-top:30upx;border-radius: 50upx;position: relative;">
                    <input placeholder="请输入密码" name='pwd' type='password' v-model="loginForm.password"
                        style="background:#FFFFFF;color:#BCBCC1;height: 100upx; border-radius: 50upx; font-size: 28upx;  padding: 0 35upx;padding-left: 70upx;"
                        placeholder-style="color:#BCBCC1;" />
                    <image src="../static/pwd_icon.png"
                    style="width: 40upx;height: 40upx;position: absolute;top: 28upx;left: 15upx;"></image>
                </view>
                <view  style="margin-top:90upx;">
					<u-button type="primary" size="default" @click="handleLogin" :disabled="!checked">登录</u-button>
                    <!-- <button  hover-class="btn-hover" formType="submit" >登录</button> -->
                </view>
				<view class="isready">
					<u-checkbox v-model="checked" ></u-checkbox>
					<view>
						我已阅读并同意 <text>《用户服务协议》</text>及<text>《隐私政策》</text>
					</view>
				</view>
            </form>
 
        </view>
    </view>
</view>
</template>
<script>
  import { getCodeImg } from '@/api/login'

  export default {
    data() {
      return {
		checked:false,
        codeUrl: "",
        captchaEnabled: true,
        globalConfig: getApp().globalData.config,
        loginForm: {
          username: "",
          password: "",
          // code: "",
          uuid: ''
        }
      }
    },
    created() {
      // this.getCode()
    },
    methods: {
      // 隐私协议
      // handlePrivacy() {
      //   let site = this.globalConfig.appInfo.agreements[0]
      //   this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      // },
      // // 用户协议
      // handleUserAgrement() {
      //   let site = this.globalConfig.appInfo.agreements[1]
      //   this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      // },
      // 登录方法
      async handleLogin() {
        if (this.loginForm.username === "") {
			
			uni.showToast({
			title: '请输入您的账号',
			icon:'none',
			duration: 2000
			})
        } else if (this.loginForm.password === "") {
			uni.showToast({
			title: '请输入您的密码',
			icon:'none',
			duration: 2000
			})
        } 
		// else if (this.loginForm.code === "" && this.captchaEnabled) {
  //         this.$modal.msgError("请输入验证码")
  //       } 
		else {
			uni.showLoading({
					lock: true, //同v-loading的修饰符
					text: '登录中，请耐心等待...', //加载文案
					background: 'rgba(10,29,69,0.8)', //背景色
					spinner: 'el-icon-loading', //加载图标
				})
          // this.$modal.msgSuccess("登录中，请耐心等待...")
          this.pwdLogin()
        }
      },
      // 密码登录
      async pwdLogin() {
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.loginSuccess()
        }).catch(() => {
          if (this.captchaEnabled) {
            // this.getCode()
          }
        })
      },
      // 登录成功后，处理函数
      loginSuccess(result) {
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
			uni.reLaunch({
				url: '/pages/index/index'
			})
        })
      }
    }
  }
</script>
<style scoped>
	.login-container{
	  width: 100%;
	  position: fixed;
	  height: 100vh;
	}
	
	.login-context {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  padding: 0 30upx;
	}
	
	
	.title {
	  font-size: large;
	  text-align: center;
	  padding-top: 10%;
	  font-weight: bold;
	}
	
	.login-box {
	  margin-top: 10%;
	  padding: 10% 5%;
	
	  border-radius: 10px;
	  box-shadow: 0 4px 4px #888888;
	}
	
	
	.login-btn {
	  width: 100% !important;
	  background-color: #2f6afd;
	  color: white;
	  font-weight: normal;
	  border-radius: 50upx;
	  height: 100upx;
	  display: flex;
	  justify-content: center;
	  flex-direction: column;
	  font-size: 32upx;
	}
	
	.background_image {
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  z-index: -999;
	}
	.isready{
		font-size: 24upx;
		margin-top: 20upx;
		display: flex;
		align-items: center;
	}
	.isready text{
		color: #004097;
	}

</style>