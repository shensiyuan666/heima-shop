Component({
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  data: {
     
  },
  methods: {
      handleTab(e){
        const {id}=e.target.dataset
        this.triggerEvent("tabItemChange",{id})
      }
  }
})
