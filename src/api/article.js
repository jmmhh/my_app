import {request} from "@/utils/requests";


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