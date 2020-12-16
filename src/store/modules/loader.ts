import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RootState, LoaderState } from "@/types/store";

export const LoaderModule: Module<LoaderState, RootState> = {
    namespaced: true as boolean,
    state: {
        Loader: null,
    } as LoaderState,
    getters: {
        getLoaderInstance: function(state: LoaderState){
            return state.Loader;
        }
    } as GetterTree<LoaderState, RootState>,
    mutations: {
        setLoader: function(state: LoaderState, loader: GLTFLoader){
            state.Loader = loader;
        },
    } as MutationTree<LoaderState>,
    actions: {
        loadModelFromUrl: function(store, modelUrl: string){
            store.getters.getLoaderInstance.load(modelUrl, (gltf: GLTF) =>{
                store.commit("SceneModule/addObjectToScene", gltf.scene, {root: true});
                store.dispatch("ObjectsModule/addObject", gltf.scene.children[0], {root: true});
                store.dispatch("RendererModule/render", null, {root: true});
            });
        }
    } as ActionTree<LoaderState, RootState>
};