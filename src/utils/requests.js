import axios from "axios";
import store from "@/store";

export const request=axios.create({
    baseURL:'http://127.0.0.1:8081/api'
})

request.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization=`Bearer ${store.state.user}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});