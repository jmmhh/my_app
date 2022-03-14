<template>
<div class="user-container">
  <van-nav-bar class="page-nav-bar" title="注册">
    <van-icon slot="left" name="cross" @click="$router.back()"/>
  </van-nav-bar>
  <van-form @submit="onSubmit">
    <van-field
        v-model="user.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules"
        maxlength="14"
    />
    <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="rules"
        maxlength="14"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { reguser } from "@/api/user";

export default {
  name: "ReguserIndex",
  data(){
    return {
      user:{
        username:'',
        password:''
      },
      rules:[
        { required: true, message: '请填写正确格式用户名' ,pattern:/^[\S]{4,14}$/}
      ]
    }
  },
  methods: {
    async onSubmit() {
      const user=this.user
      try {
        const res = await reguser(user)
        if (res.data.status === 1){
          this.$notify({ type: 'warning', message: res.data.message });
        }else if(res.data.status === 0){

          this.$notify({ type: 'success', message: res.data.message+',请登录' });
          this.$router.back()
        }
      }catch (err){
        this.$notify({type:'danger',message:err.message})
      }
    },
  },
}
</script>

<style scoped>

</style>