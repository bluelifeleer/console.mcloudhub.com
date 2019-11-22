import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus:{
      
    }
  },
  mutations: {
    setMenus(state,data){
      state.menus['parent'] = data.parent
      if(data.child){
        state.menus['child'] = data.child
      }
    }
  },
  actions: {

  }
})
