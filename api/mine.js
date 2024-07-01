import request from '@/utils/request'

// 获取用户信息
export function getInfo (data){
	return request({
		url:'/v1/applet/getInfo',
		method:'get',
	})
}
