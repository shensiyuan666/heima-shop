import  {request} from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  onShow() {
    let cart=wx.getStorageSync('cart')||[]
    let address=wx.getStorageSync('address')
    let totalPrice=0
    let totalNum=0
    cart.forEach(v=>{
        totalPrice+=v.goods_price*v.num
        totalNum+=v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  async handleOrderPay(){
      const token=wx.getStorageSync('token',token)
      if(!token){
        wx.navigateTo({
          url: '/pages/auth/index',
        })
      }
      const header={Authorization:token}
      const order_price=this.data.totalPrice
      const consignee_addr=this.data.address.all
      let goods=[]
      const cart=this.data.cart
      cart.forEach(v=>goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }))
      const params={order_price,consignee_addr,goods}
      const res=await request({url:'/my/orders/create',data:params,method:"POST"})
      console.log(res);
  }
})