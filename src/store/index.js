import Vuex from "vuex";
import Vue from "vue";
import {setItem,getItem} from "@/utils/storage";

Vue.use(Vuex)

const TOKEN_KEY = 'TOKEN_USER'
const Username='Username'
const UserImg='UserImg'
export default new Vuex.Store({
    state:{
        user:getItem(TOKEN_KEY),
        username:getItem(Username),
        userImg:getItem(UserImg)
    },
    mutations:{
        setUser(state,data){
            state.user=data
            setItem(TOKEN_KEY,state.user)
        },
        setUsername(state,data){
            state.username=data
            setItem(Username,data)
        },
        setUserImg(state,data){
            state.userImg=data
            setItem(UserImg,'http://127.0.0.1:8081'+data)
        }
    },
    actions:{

    },
    modules:{

    }
})
