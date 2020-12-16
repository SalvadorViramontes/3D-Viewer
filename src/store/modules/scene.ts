import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

import { RootState, SceneState } from "@/types/store";

export const SceneModule: Module<SceneState, RootState> = {
    namespaced: true as boolean,
    state: {
        Scene: null,
    } as SceneState,
    getters: {
        getSceneInstance: function(state: SceneState){
            return state.Scene;
        }
    } as GetterTree<SceneState, RootState>,
    mutations: {
        setScene: function(state: SceneState, scene: THREE.Scene){
            state.Scene = scene;
        },
        addObjectToScene: function(state: SceneState, object: any){
            state.Scene!.add(object);
        }
    } as MutationTree<SceneState>,
    actions: {
    } as ActionTree<SceneState, RootState>
};