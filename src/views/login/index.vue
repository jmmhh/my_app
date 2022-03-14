<template>
<div class="login-container"  >
  <!--  导航栏-->
  <van-nav-bar class="page-nav-bar" title="登录">
    <van-icon slot="left" name="cross" @click="$router.back()"/>
  </van-nav-bar>
  <!--  导航栏-->
<!--  登陆表单-->
  <van-form @submit="onSubmit">
    <van-field
        v-model="user.username"
        name="用户名"
        placeholder="请输入用户名"
        :rules="rules"
        maxlength="14"
    ><i slot="left-icon" class="iconfont icon-shouji"></i></van-field>
    <van-field
        v-model = "user.password"
        left-icon="iconfont icon-shouji"
        name="密码"
        placeholder="请输入密码"
        :rules="rules"
        maxlength="14"
    ><i slot="left-icon" class="iconfont icon-yanzhengma"></i>

    </van-field>
    <div class="login-btn-wrap">
      <van-button round block type="info" native-type="submit" class="login-btn">登录</van-button>
      <van-button round block type="info" style="margin-top: 7px" native-type="button" class="login-btn" @click="$router.push('/reguser')">注册用户</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import {login} from "@/api/user"
export default {
  name: "LoginIndex",
  data() {
    return {
      user:{
        username:'',
        password:''
      },
      rules:[
        { required: true, message: '请填写正确格式用户名' ,pattern:/^[\S]{4,14}$/}
      ]

    };
  },
  methods: {
    async onSubmit() {
      const user=this.user
      try {
        const res = await login(user)
        console.log(res)
        if (res.data.code === "401"){
          this.$notify({ type: 'warning', message: res.data.message });
        }else if(res.data.code === "200"){
          this.$notify({ type: 'success', message: res.data.message });
          this.$store.commit('setUser',res.data.token)
          this.$store.commit('setUsername',this.user.username)
          this.$router.back()
        }
      }catch (err){
        this.$notify({type:'danger',message:err.message})
      }
    },
  },
};

</script>

<style scoped lang="less">
.login-btn-wrap{
  padding: 53px 33px;
  .login-btn{
    background-color: #6db4fb;
    border: none;
  }
}
</style>