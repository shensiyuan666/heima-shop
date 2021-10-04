import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
      goodsObj:{},
      isCollect:false
  },

  onLoad(options) {
    // 接收goods_list中navigator传过来的goods_id
    const {goods_id}=options
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id){
    const res=await request({url: '/goods/detail',data:{goods_id}})
    let collect=wx.getStorageSync('collect')||[]
    let isCollect=collect.some(v=>v.goods_id===res.goods_id)
    this.setData({
        goodsObj:res,
        isCollect
    })
  },

  // 预览轮播图图片
  handlePreviewImage(e){
    let {goodsObj} =this.data
    let urls=goodsObj.pics.map(v=>v.pics_mid)
    let currentUrl=e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      currentUrl
    })
  },

  hanldeCollect(){
    let {goodsObj} = this.data
    let isCollect=false
    let collect=wx.getStorageSync('collect')||[]
    let index=collect.findIndex(v=>v.goods_id===goodsObj.goods_id)
    // 缓存中存在就取消收藏，否则就添加收藏
    if(index!=-1){
      collect.splice(index,1)
      isCollect=false
      wx.showToast({
        title: '取消成功',
        icon:'success',
        mask:true
      })
    }else{
      collect.push(goodsObj)
      isCollect=true
      wx.showToast({
        title: '添加成功',
        icon:'success',
        mask:true
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },

  addshopcar(){
    let {goodsObj} = this.data
    let cart=wx.getStorageSync('cart')||[]
    let index=cart.findIndex(v=>v.goods_id===goodsObj.goods_id)
    // 购物车中不存在此商品就添加，存在就数量+1
    if(index===-1){
      cart.push(goodsObj)
      goodsObj.num=1
      goodsObj.checked=true
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  }
})