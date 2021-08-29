// index.js
// 获取应用实例
const app = getApp()

import  {request} from '../../request/index.js'
Page({
  data: {
      swiperList:[]
  },
  // 事件处理函数
  onLoad() {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', 
    //   success: (res)=> {
    //     console.log(res.data)
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // })

    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then((res)=>{
      console.log(res.data);
      this.setData({
          swiperList:res.data.message
      })
    })
  }
})
