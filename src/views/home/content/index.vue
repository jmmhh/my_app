<template>
  <div class="article-list">
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" clickable>
        <div slot="default"><articleItem :articleItem="item"/></div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import articleItem from "@/components/article-list";
import {allArticle,categoryArticle} from "@/api/article";
export default {
  name: "ContentIndex",
  components: {articleItem},
  props:['title'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      if (this.title.id===1){
        this.getAllArticle()
      }else {
        this.getTypeArticle(this.title.title)
      }
      // 加载状态结束
        // 加载状态结束
      // this.finished = true;
        // 数据全部加载完成s
      },
    async getAllArticle(){
      try {
        const res=await allArticle()
        this.list=res.data.data
        this.finished=true
        this.loading=false
      }catch (err){
        console.log(err)
      }
    },
    async getTypeArticle(title){
      try {
        let params={category:title}
        const res=await categoryArticle(params)
        this.list=res.data.data
        this.finished=true
        this.loading=false
      }catch (err){
        console.log(err)
      }
    }
  },
  created() {

  }
}
</script>

<style scoped lang="less">
.article-list{
  height: 79vh;
  overflow-y: auto;
}
</style>