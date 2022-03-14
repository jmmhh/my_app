<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="贴吧"
        @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if=" code!=='200' ">
        <van-loading
            color="#3296fa"
            vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else>
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleItem.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
              class="avatar"
              slot="icon"
              round
              fit="contain"
              :src="'http://127.0.0.1:8081'+userinfo.imgsrc"
          />
          <div slot="title" class="user-name">{{ userinfo.nickname }}</div>
          <div slot="label" class="publish-date"></div>
          <van-button
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              size="small"
              icon="plus"
          >关注</van-button>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content">{{articleItem.content}}</div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap"  v-if=" code === '400'">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-icon
          @click="showPopup"
          name="comment-o"
          badge="123"
          color="#777"
      />
      <van-icon
          color="#777"
          name="star-o"
      />
      <van-icon
          color="#777"
          name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <van-popup v-model="show" round closeable position="bottom" :style="{ height: '50%' }" >
      <van-list
          class="commentList"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.id" >
          <div slot="default" class="comments">
            <van-image
                class="userImg"
                slot="icon"
                round
                fit="contain"
                :src="'http://127.0.0.1:8081'+item.userimg"
            />
            <span class="commentUsername">{{item.username}}</span>
            <span class="commentContent">{{item.content}}</span>
            <span class="commentTime">{{item.time}}</span>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
    <!-- /底部区域 -->
  </div>
</template>
<script>
import {IdArticle,getComment} from "@/api/article";
import {userinfo} from "@/api/user";

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleID: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      articleItem:{},
      userinfo:{},
      code:'',
      show:false,
      list: [],
      loading: false,
      finished: false,
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleById()
  },
  methods: {
    onLoad() {
      this.getComments()
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      // 加载状态结束
        this.loading = false
        this.finished = true
        // 数据全部加载完成

    },
    showPopup() {
      this.show = true;
    },
    onClickLeft(){
      this.$router.back()
    },
    async getArticleById(){
      const params={id:this.articleID}
      try {
        const {data}=await IdArticle(params)
        this.code=data.code
        this.articleItem=data.data
        await this.getAutherInfo(data.data.auther)
      }catch (err){
        console.log(err)
      }
    },
    async getAutherInfo(username){
      const params= {username:username}
      try {
        const {data}=await userinfo(params)
        this.userinfo=data.data
      }catch (err){
        console.log(err)
      }
    },
    async getComments(){
      const params={id:this.articleID}
      try {
        const {data}=await getComment(params)
        for (let i=0;i<data.data.length;i++){
          this.list.push(data.data[i])
        }
        console.log(this.list)
      }catch (err){
        console.log(err)
      }
    },

  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
.commentList{
  .comments{
    .userImg{
      width: 100px;
      height: 100px;
    }
    .commentUsername{
      color: #496289;
      position: absolute;
      left: 120px;
    }
    .commentContent{
      color: #000000;
      font-size: 25px;
      position: absolute;
      left: 220px;
      top: 30px;
    }
    .commentTime{
      left: 120px;
      color: #969791;
      font-size: 20px;
      position: absolute;
      top: 60px;
    }
  }
}
</style>