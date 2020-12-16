import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, GetterTree } from 'vuex'
import { RootState } from '../types/store'
import { CoordinatesModule } from './modules/coordinates';
import { ObjectsModule } from './modules/objects';
import { CameraModule } from './modules/camera';
import { SceneModule } from './modules/scene';
import { LoaderModule } from './modules/loader';
import { RendererModule } from './modules/renderer';

Vue.use(Vuex)

const storeOption: StoreOptions<RootState> = {
  state: {
    currentRoute: null
  } as RootState,
  modules: {
    CoordinatesModule,
    ObjectsModule,
    CameraModule,
    SceneModule,
    LoaderModule,
    RendererModule,
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