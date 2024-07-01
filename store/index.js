import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
	  brigeId:'',
	  brigeName:''
  },
  modules: {
    user
	
  },
  getters
})

export default store
