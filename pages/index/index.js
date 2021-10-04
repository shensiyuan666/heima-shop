import  {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
      swiperList:[],
      cateList:[],
      floorList:[]
  },

  onLoad() {
    this.getSwiperList()
    this.getCateList()
    this.getfloorList()
  },
  async getSwiperList(){
    const res=await request({url: '/home/swiperdata'})
    this.setData({
      swiperList:res
    })
  },

  async getCateList(){
    const res=await request({url: '/home/catitems'})
    this.setData({
      cateList:res
    })
  },

  async getfloorList(){
    const res=await request({url: '/home/floordata'})
    this.setData({
      floorList:res
    })
  }
})
