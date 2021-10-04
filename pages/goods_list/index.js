import {request} from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
      tabs:[
        {
          id:0,
          value:'综合',
          isActive:true
        },
        {
          id:1,
          value:'销量',
          isActive:false
        },
        {
          id:2,
          value:'价格',
          isActive:false
        }
      ],
      goodsList:[]
  },

  QueryParams:{
    cid:'',
    query:'',
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  onLoad(options) {
    this.QueryParams.cid=options.cid||''
    this.QueryParams.query=options.query||''
    this.getGoodsList()
  },

  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1
    this.getGoodsList()
  },

  onReachBottom(){
    if(this.QueryParams.pagenum>this.totalPages){
      wx.showToast({
        title: '没有下一页数据',
      })
    }
    else{
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  async getGoodsList(){
    const res=await request({url:'/goods/search',data:this.QueryParams})
    let {total}=res
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
        goodsList:[...res.goods,...this.data.goodsList]
    })
  },
  
  changeTabs(e){
    let {id}=e.detail
    let {tabs}=this.data
    tabs.forEach((v,i)=>i===id?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }
})