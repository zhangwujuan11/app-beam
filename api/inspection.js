import request from '@/utils/request'

//查询工序检验列表
export function inspectionlist (data){
	return request({
		url:'/v1/applet/beam/inspections',
		method:'get',
		params:data
	})
}

// 梁片详情
export function beaminfo(data){
	return request({
		url:'/v1/applet/beams/' + data,
		method:'get'
	})
}

// 审核记录
export function tanklog(data){
	return request({
		url:'/v1/applet/beam/logs/audit/list?taskId=' + data,
		method:'get'
	})
}

