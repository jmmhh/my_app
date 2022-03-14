
//用户相关请求
import {request} from "@/utils/requests"
import qs from 'qs'

export const login = (data)=>{
    return request({
        method:'post',
        url:'/user/login',
        data:qs.stringify(data)
    })
}

export const reguser = (data) =>{
    return request({
        method:'post',
        url:'/user/reguser',
        params:qs.stringify(data)
    })
}

export const userinfo = (data) =>{
    return request({
        method:'post',
        url:'/user/getInfo',
        data:qs.stringify(data)
    })
}

export const changeInfo = (data) => {
    return request({
        method:'post',
        url:'/user/changeInfo',
        data:qs.stringify(data)
    })
}