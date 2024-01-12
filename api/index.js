import request from '@/utils/request'

// 首页比例
export function speed (data){
	return request({
		url:'/v1/applet/beams/speed',
		method:'get'
	})
}

// 梁片列表
export function bragelist(data){
	return request({
		url:'/v1/applet/beams',
		method:'get',
		params:data
	})
}

// 梁片详情
export function beamsinfo (data){
	return request({
		url:'/v1/applet/beams/' +data,
		method:'get'
	})
}


// 梁片扫码详情
export function qrinfo(data){
	return request({
		url:'/v1/h5/beams/' + data,
		method:'get',
		 headers: { isToken: false }
	})
}
// 修改梁片信息
export function updatebrage(data){
	return request({
		url:'/v1/applet/beams',
		method:'put',
		data:data
	})
}

// 绑定二维码
export function binded(data){
	return request({
		url:'/v1/applet/beams/'+data.qrCodeId+'/beams/'+data.beamId+'/actions/bind',
		method:'post'
	})
}

// 解绑二维码
export function jibinded(data){
	return request({
		url:'/v1/applet/beams/'+data.qrCodeId+'/beams/'+data.beamId+'/actions/unbind',
		method:'post'
	})
}


//工单派发
export function addorder(data){
	return request({
		url:'/v1/applet/beam/orders',
		method:'post',
		data:data
	})
}

// 空闲台座下拉框
export function freetailist(data){
	return request({
		url:'/v1/apple/beam/seatSettingss/freelist/' + data,
		method:'get'
	})
}
// 所有台座下拉框
export function allailist(data){
	return request({
		url:'/v1/apple/beam/seatSettingss',
		method:'get'
	})
}







// 施工班组部门下拉框
export function banlisu(data){
	return request({
		url:'/system/dept/constructionCrew',
		method:'get'
	})
}

// 模板下拉框
export function mulist(){
	return request({
		url:'/v1/applet/beam/templates',
		method:'get'
	})
}

// 详情工序列表
export function listsettingss(data){
	return request({
		url:'/v1/applet/beam/settingss/' + data,
		method:'get'
	})
}
//已完成的工序列表
export function settingoff(data){
	return request({
		url:'/v1/applet/beam/tasks',
		method:'get',
		params:data
	})
}
// 首次派发
export function firsttasks(data){
	return request({
		url:'/v1/applet/beam/tasks',
		method:'post',
		data:data
	})
}

// 接收,进行中
export function sentedtasks(data){
	return request({
		url:'/v1/applet/beam/tasks',
		method:'put',
		data:data
	})
}