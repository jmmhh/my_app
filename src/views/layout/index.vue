<template>
<div class="layout-container">
  <router-view/>

  <van-tabbar class="layout-tablebar" route>
    <van-tabbar-item to="/">
      <i slot="icon" class="iconfont icon-shouye"></i>
      首页
    </van-tabbar-item>
    <van-tabbar-item to="/qa">
      <i slot="icon" class="iconfont icon-wenda" ></i>
      问答
    </van-tabbar-item>
    <van-tabbar-item to="/video">
      <i slot="icon" class="iconfont icon-shipin" ></i>
      视频
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <i slot="icon" class="iconfont icon-wode" ></i>
      {{$store.state.user ? '我的':'未登录'}}
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: "layout-index",
  data(){
    return{
      active:0
    }
  }
}
</script>

<style scoped lang="less">
  .layout-container{
    .layout-tablebar{
      i{
        font-size: 40px;
      }
    }
  }
</style>