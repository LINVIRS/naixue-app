<template>
  <view class="content">
    <view class="input_box">
      <textarea placeholder="请输入您要留言的内容" class="textarea border" v-model="message.content"></textarea>
      <input type="text" class="input-box border" v-model="message.name" placeholder="请输入用户名:" />
      <button @click="addMsg" class="submit">提交</button>
    </view>
    
    <view class="list">
      <view class="item" v-for="(item,index) in listData" :key="index">
        <view class="word">
          <text class="user_name">{{item.name}}</text>
          <text class="user_content">{{item.content}}</text>
        </view>
        <text class="delete" @click="removeMsg(item._id)">删除</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        message:{
          name:'',
          content:''
        },
        listData:[
          {
            _id:'',
            name:'',
            content:''
          }
        ]
      };
    },
    onLoad(){
      this.getData();
    },
    methods: {
      addMsg(){
        let data = this.message;
        uniCloud
        .callFunction({
          name:'add',
          data:data
        }).then(res=>{
          this.getData();
          this.message.name='';
          this.message.content='';
        });
      },
      getData(){
        uniCloud
        .callFunction({
          name:'get'
        }).then(res=>{
          this.listData = res.result.data
        });
      },
      removeMsg(id){
        console.log(id);
        let _id = id;
        uniCloud
        .callFunction({
          name:'remove',
          data: {
            _id
          }
        })
        .then(res=>{
          console.log(res.result.msg)
          this.getData();
          alert(res.result.msg)
        });
      }
    }
  }
</script>

<style>
.word{
   margin: 30rpx 50rpx 20rpx 50rpx;
}

.content {
  padding: 5px;
}

 .user_name{
   color: #3883ff;
   font-weight: 500;
  margin-right: 20rpx;
 }
 .user_content{
   font-size: small;
 }
 .delete{
   background-color: #e45c35;
   border-radius: 10rpx;
   color: white;
   font-size: 10rpx;
   font-size: medium;
   padding: 6rpx 10rpx 6rpx 10rpx;
   margin-left: 30rpx;
 }
 
 .border {
   border: 1px solid #eee;
 }
 
 .textarea {
   width: 100%;
  margin-bottom: 5px;
  border-radius: 5px;
 }
 
 .input-box {
   margin-bottom: 5px;
   border-radius: 5px;
   height: 35px;
 }
 
 .submit {
   background-color: #007AFF;
   border-radius: 5px;
   margin-bottom: 5px;
   color: white;
 }
</style>