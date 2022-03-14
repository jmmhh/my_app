<template>
 <div class="my-container">
   <div v-if="user" class="header user-info">
     <div class="base-info">
       <div class="left">
         <van-image
             fit="cover"
             round
             class="avatar"
             :src="'http://127.0.0.1:8081'+userinfo.imgsrc"
         />
         <span class="name">{{userinfo.nickname}}</span>
       </div>
       <div class="right">
         <van-button size="mini" round @click="$router.push('/change')">编辑资料</van-button>
       </div>
     </div>
     <div class="date-states">
       <div class="data-item">
         <span class="count">0</span>
         <span class="text">头条</span>
       </div>
       <div class="data-item">
         <span class="count">0</span>
         <span class="text">关注</span>
       </div>
       <div class="data-item">
         <span class="count">0</span>
         <span class="text">粉丝</span>
       </div>
       <div class="data-item">
         <span class="count">0</span>
         <span class="text">获赞</span>
       </div>
     </div>
   </div>
   <div v-else class="header not-login">
     <div class="login-btn" @click="$router.push('/login')">
       <img src="../../assets/mobile.png" class="mobil-img" alt="">
       <span class="text">登录 / 注册</span>
     </div>
   </div>

   <van-grid :column-num="2" class="grid-nav" clickable>
     <van-grid-item class="grid-item">
       <i slot="icon" class="iconfont icon-shoucang"></i>
       <span class="text" slot="text">收藏</span>
       </van-grid-item>
     <van-grid-item class="grid-item">
       <i slot="icon" class="iconfont icon-lishi"></i>
       <span class="text" slot="text">历史</span>
       </van-grid-item>
   </van-grid>
   <van-cell title="消息通知" is-link />
   <van-cell class="mb-9" title="小智同学" is-link />
   <van-cell title="退出登录" clickable v-if="user" class="logout-cell" @click="onLogout"/>

 </div>
</template>

<script>
import {mapState} from 'vuex'
import {userinfo} from "@/api/user";

export default {
  name: "My-Index",
  data(){
    return {
      userinfo: {}
    }
  },
  computed:{
    ...mapState(['user']),
    ...mapState(['username']),
  },
  methods:{
    onLogout(){
      this.$dialog.confirm({
        title: "确认退出吗?"
      })
          .then(() => {
            // on confirm
            this.$store.commit('setUser',null)
          })
          .catch(() => {
            // on cancel
          })
    },
    async getuserinfo(){
      const data={username:this.username}
        try {
          const res=await userinfo(data)
          if (res.data.code === '401'){
            this.$notify({ type: 'warning', message: res.data.message });
            this.$store.commit('setUser',null)
          }
          this.$store.commit('setUserImg',res.data.data.imgsrc)
          this.userinfo=res.data.data
        }catch (err){
          this.$notify({ type: 'warning', message: '获取用户失败,请稍后重试' });
        }
    }
  },
  created() {
    if (this.user){
      this.getuserinfo()
    }
  }
}
</script>

<style scoped lang="less">
  .my-container{
    .header{
      height: 361px;
      background: url("../../assets/banner.png");
      background-size: cover;
    }
    .not-login{
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn{
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        .mobil-img{
          width: 132px;
          height: 132px;
        }
        .text{
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .user-info{
      .base-info{
        height: 231px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          display: flex;
          align-items: center;
          .avatar{
            width: 132px;
            height: 132px;
            border: 4px solid #fff;
            margin-right: 23px;
          }
          .name{
            font-size: 30px;
            color: #fff;
          }
        }
      }
      .date-states{
        display: flex;
        .data-item{
          flex: 1;
          height: 130px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          color: #fff;
          .count{
            font-size: 36px;
          }
          .text{
            font-size: 23px;
          }
        }
      }
    }
    .grid-nav{
      .grid-item{
        height: 141px;
        .iconfont{
          font-size: 45px;
        }
        .icon-shoucang{
          color: #eb5253;
        }
        .icon-lishi{
          color: #ff9d1d;
        }
        span.text{
          font-size: 28px;
        }
      }
    }
    .logout-cell{
      color: indianred;
      text-align: center;
      margin-top: 9px;
    }
  }


</style>