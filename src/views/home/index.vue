<template>
<div class="home-container">
  <van-nav-bar class="page-nav-bar" fixed>
    <van-button
      class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search">搜索</van-button>
  </van-nav-bar>
  <van-tabs class="channel-tabs" v-model="active" animated swipeable>
  <van-tab :title="key.title" v-for="(key,index) in dt" :key="index"><ContentIndex :title="key"/></van-tab>
  </van-tabs>
  </div>
</template>

<script>
import ContentIndex from './content'
export default {
  name: "Home-Index",
  components: {ContentIndex},
  data(){
    return{
      dt:[
        {id:1,title:'全部'},
        {id:2,title:'交友'},
        {id:3,title:'技术'},
        {id:4,title:'音乐'}
      ],
      value:'',
      active:0
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  padding-top: 160px;
  .van-nav-bar__title{
    max-width: unset;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }


  /deep/ .channel-tabs{
    .van-tabs__content{
      min-height: 79vh;
    }
  }
  .van-tabs__wrap{
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
}

</style>