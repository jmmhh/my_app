<template>
  <van-cell-group @click="$router.push(`/article/${articleItem.id}`)">
    <van-cell class="article-item">
      <div slot="title" class="title">{{articleItem.title}}</div>
      <div slot="label" class="label-info-wrap">
        <span><van-icon name="manager-o" /> {{articleItem.auther}}  </span>

        <span><van-icon name="clock-o" /> {{articleItem.time}}  </span>

        <span><van-icon name="eye-o" /> {{articleItem.seecount}}  </span>
      </div>
      <van-image
          class="right-cover"
          slot="default"
          width="100"
          height="100"
          fit="contain"
          :src="articleItem.imgsrc"
      />
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  name: "articleItem",
  props: ["articleItem"],
}
</script>



<style lang="less">
.article-item{
  position: relative;
  .title{
    margin-top: 20px;
  }
  .label-info-wrap{
    position: absolute;
    top: 150px;
  }
}
//.article-item {
//  .title {
//    font-size: 32px;
//    color: #3a3a3a;
//  }
//
//  .van-cell__value {
//    flex: unset;
//    width: 232px;
//    height: 146px;
//    padding-left: 25px;
//  }
//
//  .right-cover {
//    width: 232px;
//    height: 146px;
//  }
//
//  .label-info-wrap span {
//    font-size: 22px;
//    color: #b4b4b4;
//    margin-right: 25px;
//  }
//
//  .cover-wrap {
//    display: flex;
//    padding: 30px 0;
//    .cover-item {
//      flex: 1;
//      height: 146px;
//      &:not(:last-child) {
//        padding-right: 4px;
//      }
//      .cover-item-img {
//        width: 100%;
//        height: 146px;
//      }
//    }
//  }
//}
</style>