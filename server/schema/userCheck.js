const joi=require('joi');

const username=joi.string().alphanum().min(4).max(14).required();
const password=joi.string().pattern(/^[\S]{4,14}$/).required();
exports.userCheck={
    body:{
       username,
       password
    }
}