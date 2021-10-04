Page({
  data: {
    address:{},
    cart:[],
    checkAll:true,
    totalPrice:0,
    totalNum:0
  },

  onShow() {
    let cart=wx.getStorageSync('cart')||[]
    let address=wx.getStorageSync('address')
    this.setData({
      address
    })
    this.setCart(cart)
  },

  getAddress(){
    wx.showModal({
      content: '“黑马商城”需要访问您的通讯录地址',
      success (res) {
        if (res.confirm) {
              wx.chooseAddress({
              success: (res) => {
                let address=res
                address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
                wx.setStorageSync('address', address)
              },
            })
        }
      }
    })
  },

  handleAmount(e){
    let {cart} = this.data
    let {id,operation}=e.currentTarget.dataset
    let index=cart.findIndex(v=>v.goods_id===id)
    if(cart[index].num===1&&operation===-1){
      wx.showModal({
        content:'您是否要删除此商品？',
        success:(res)=>{
          if(res.confirm){
            cart.splice(index,1)
            this.setCart(cart)
          }
        }
      })
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
  },

  handleCheckAll(){
    let {checkAll,cart} = this.data
    checkAll=!checkAll
    cart.forEach(v=>v.checked=checkAll)
    this.setCart(cart)
  },

  handleCheck(e){
    let {cart} = this.data
    let {id}=e.currentTarget.dataset
    let index=cart.findIndex(v=>v.goods_id===id)
    cart[index].checked=!cart[index].checked
    this.setCart(cart)
  },

  setCart(cart){
    let checkAll=true
    let totalPrice=0
    let totalNum=0
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.goods_price*v.num
        totalNum+=v.num
      }else{
        checkAll=false
      }
    })
    checkAll=cart.length?checkAll:false
    this.setData({
      cart,
      checkAll,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },

  gotoPayment(){
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})