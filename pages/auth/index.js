import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from "../../utils/asyncWx.js";

Page({
  async handleGetUserInfo(e){
    // const {encryptedData,rawData,iv,signature} = e.detail
    // const {code}=await login()
    // const params={encryptedData,rawData,iv,signature,code}
    // const {token}=await request({ url: '/users/wxlogin', data:params,method:'POST'})
    // 个人APPID无法获取token
    wx.setStorageSync('token',  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    wx.navigateBack({
      delta: 1,
    })
  }
  
})