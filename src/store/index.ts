import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types/store'

Vue.use(Vuex)

const storeOption: StoreOptions<RootState> = {
  state: {
    currentRoute: null
  } as RootState,
  modules: {
  },
  getters:{
    getCurrentRoute: function(state: RootState){
      return state.currentRoute;
    }
  } as GetterTree<RootState, any>,
  mutations: {
    setCurrentRoute: function(state: RootState, newRoute: string) {
        state.currentRoute = newRoute;
    }
  } as MutationTree<RootState>
}

export default new Vuex.Store (storeOption)