import request from '@/utils/request'

// 工序检验审核-自检
export function selfInspection (data){
	return request({
		url:'/v1/applet/beam/inspections/selfInspection',
		method:'put',
		'data':data
	})
}


// 工序检验审核-检验
export function inspectionstest (data){
	return request({
		url:'/v1/applet/beam/inspections/test',
		method:'put',
		'data':data
	})
}

// 工序检验审核-验收
export function acceptance (data){
	return request({
		url:'/v1/applet/beam/inspections/acceptance',
		method:'put',
		'data':data
	})
}


// 获取工序检验详细信息
export function inspectioninfo (data){
	return request({
		url:'/v1/applet/beam/inspections/'+data,
		method:'get',
		// params:data
	})
}




