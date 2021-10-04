import  {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
      cates:[],
      leftMuneList:[],
      rightContent:[],
      currentIndex:0
  },

  onLoad() {
      // 判断获取缓存数据还是重新发请求
      const Cates=wx.getStorageSync('cates')
      if(!Cates){
        this.getCate()
      }
      else{
        if(Date.now()-Cates.time>60*1000){
          this.getCate()
        }else{
          let cates=Cates.data
          let leftMuneList=cates.map(v=>v.cat_name)
          let rightContent=cates[0].children
          this.setData({
              cates,
              leftMuneList,
              rightContent
          })
        }
      }
  },

  async getCate(){
    const res=await request({url: '/categories'})
    const cates=res
    wx.setStorageSync('cates', {time:Date.now(),data:cates})
    let leftMuneList=cates.map(v=>v.cat_name)
    let rightContent=cates[0].children
    this.setData({
      cates,
      leftMuneList,
      rightContent
    })
  },

  handleTab(e){
    let currentIndex=e.target.dataset.index
    let {cates}=this.data
    let rightContent=cates[currentIndex].children
    this.setData({
      currentIndex,
      rightContent
    })
  }
})