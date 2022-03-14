const {userCheck}=require('../schema/userCheck');//规定用户名密码
const joi=require('@escook/express-joi');//检查用户名密码的合法性
let express = require('express');
const router = express.Router();
//引入工具文件
let util=require('../util/util.js');
let upload=util.upload.single('file');

//引入封装好的数据库操作
let db=require('../db.js');

//登录路由
router.post('/login',joi(userCheck),(req,res)=>{
  let username=req.body.username;
  //对密码进行加密验证
  let password=util.encrypt(req.body.password);
  console.log('原密码',req.body.password,'现密码',password)
  //生成一个token
  let token=util.encodeJwt();
  let sql=db.login(username,password);
  //生成以一个token
  db.Query(sql).then(data=>{
    //在数据控能够查找到结果时，将token发送给前台
    if(data.length){
      console.log('用户登录成功！');
      return res.send({"code":"200","message":"登录成功！","token":token,});
    }else{
      return res.send({"code":"401","message":"账号或者密码错误，登录失败！"});
    }
    },err=>{
    res.send({"code":"401","message":"账号或者密码错误，登录失败！"});
  })
});


router.post('/reguser',joi(userCheck),(req,res)=>{
  let userinfo=req.body;
  const sqlStr=db.reguser(userinfo.username);
  db.Query(sqlStr).then(data=>{
    //在数据控能够查找到结果时，将token发送给前台
    if(data.length){
      return res.send({"code":"401","message":"该用户名已存在！"});
    }
    userinfo.password=util.encrypt(req.body.password)
    const sqlStr=db.regist(userinfo.username,userinfo.password);
    db.Query(sqlStr).then(data => {
      if (data.affectedRows!==1){
        return res.send({"code":"401","message":"用户注册失败,请稍后重试!"});
      }
      return res.send({"code":"200","message":"用户注册成功!"})
    }),err => {
      return res.send({"code":"401","message":err});
    }
    },err=>{
    res.send({"code":"401","message":err});
  })
});


// 获取个人信息
router.post('/getInfo',(req,res)=>{
  let sql=db.getInfo(req.body.username);
  db.Query(sql).then(data=>{
    console.log('获取个人信息成功！');
    console.log(data[0]);
    res.send({"code":"200","data":data[0]});
  },err=>{
    console.log(err);
    res.send({"code":"400","message":"服务器开小差了"});
  });
});


//更改个人信息
router.post('/changeInfo',upload, (req, res)=> {
  //如果有传了图片，才
    let params=req.body;
    console.log(params);
    console.log(params.change === 'true');
    //如果有图片，那么就获取图片
    if(params.nickname === ''|| params.username ===''){
      return res.send({status:'400',message:'修改错误'})
    }
    let sql=db.changeInfo(params);
    db.Query(sql).then(data=>{
      res.send({"code":"200"});
    },err=>{
      console.log(err);
      res.send({"code":"400"});
    });
});

module.exports = router;
