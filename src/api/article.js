import {request} from "@/utils/requests";

import qs from "qs";


export const allArticle = () => {
    return request({
        method:'GET',
        url:'/frontend/allArticle'
    })
}


export const categoryArticle = (articleType) =>{
    return request({
        method:'GET',
        url:'/frontend/categoryArticle',
        params:articleType
    })
}

export const getComment = (articleId) => {
    return request({
        method:'get',
        url:'/frontend/getComments',
        params:articleId
    })
}

export const IdArticle = (articleId) =>{
    return request({
        method:'GET',
        url:'/frontend/oneArticle',
        params: articleId
    })
}

export const uploadComment = (content) =>{
    return request({
        method:'post',
        url:'/frontend//makeComment',
        data:qs.stringify(content)
    })
}