<template>
  <div>
    <van-nav-bar
        title="个人信息"
        left-arrow
        right-text="保存"
        @click-left="$router.back()"
        @click-right="onSave"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="onChangePhoto">
        <van-image round width="30" height="30" :src="user.showImgsrc" />
      </van-cell>
      <van-cell title="昵称" :value="user.nickname"/>
      <van-cell title="性别" :value="user.gender"/>
      <van-cell title="简要" :value="user.breif"/>
    </van-cell-group>
    <van-button round block type="info" native-type="submit" class="change-btn" @click="showPopup">修改信息</van-button>

    <!--
      表单元素的 hidden 表示隐藏这个表单元素
     -->
    <van-popup v-model="show" round closeable close-icon="success" position="bottom" :style="{ height: '50%' }">
      <div class="changeInfo">
        <van-field v-model="user.nickname" label="昵称" />
        <van-radio-group v-model="user.gender" direction="horizontal" class="gender">
          性别&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<van-radio name="男" icon-size="24px">男</van-radio>
          <van-radio name="女" icon-size="24px">女</van-radio>
        </van-radio-group>
        <van-field v-model="user.breif" label="简要" />
      </div>

    </van-popup>
    <input type="file" hidden ref="file" @change="onFileChange" />
  </div>
</template>

<script>
import {userinfo} from "@/api/user";
import {imgUpload} from "@/api/img";
import {changeInfo} from "@/api/user";
export default {
  name: 'changeInfo',
  data () {
    return {
      user: {},
      show:false
    }
  },

  created () {
    const username=this.$store.state.username
    this.loadUserProfile(username)
  },

  methods: {
        async loadUserProfile (username) {
          const params={username:username}
          const { data } = await userinfo(params)
          data.data.showImgsrc='http://127.0.0.1:8081'+data.data.imgsrc
          this.user = data.data
        },
        showPopup() {
          this.show = true;
        },
        onChangePhoto () {
          this.$refs.file.click()
        },
        onFileChange () {
          const fileObj = this.$refs.file.files[0]
          if (fileObj) {
            this.user.showImgsrc = window.URL.createObjectURL(fileObj)
            this.user.change = true
          }else{
            this.user.change = false
          }
        },
        async onSave () {
          this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '保存中'
          })
          try {
            const formData = new FormData()
            // formData.append('名字', 数据)
            formData.append('file', this.$refs.file.files[0])
            if (this.user.change === true){
              const res=await imgUpload(formData)
              this.user.imgsrc=res.data.url
              this.user.username=this.$store.state.username
              console.log(res.data.url)
              console.log(this.user)
              await this.infoSave(this.user)
            }else{
              this.user.username=this.$store.state.username
              await this.infoSave(this.user)
            }
            this.$toast.success('保存成功')
          } catch (err) {
            console.log(err)
            this.$toast.fail('保存失败')
          }
        },
        async infoSave(user){
              try {
                await changeInfo(user)
              }catch (err){
                console.log(err)
              }
        }
}
}
</script>

<style scoped lang="less">
.change-btn{
  margin-top: 30px;
  background-color: #6db4fb;
  border: none;
}
.changeInfo{
  margin-top: 50px;
  line-height: 150px;
}
.gender{
  color: #646566;
  font-size: 28px;
  margin-left: 30px;
}

</style>