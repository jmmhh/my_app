import axios from "axios";
import store from "@/store";
const upload=axios.create({
    baseURL:'http://127.0.0.1:8081/ueditor/ue'
})

upload.interceptors.request.use(function (config) {
    // Do something before request is sent

    config.headers.Authorization=`Bearer ${store.state.user}`
    console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export const imgUpload= (data) => {
    return upload({
        method:'post',
        data,
        params:{action:'uploadimage'},
    })
}
