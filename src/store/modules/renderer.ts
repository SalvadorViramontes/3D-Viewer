import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

import { RootState, RendererState } from "@/types/store";
import { RendererSize } from "@/types/misc";

export const RendererModule: Module<RendererState, RootState> = {
    namespaced: true as boolean,
    state: {
        Renderer: null,
    } as RendererState,
    getters: {
        getRendererInstance: function(state: RendererState){
            return state.Renderer;
        }
    } as GetterTree<RendererState, RootState>,
    mutations: {
        setRenderer: function(state: RendererState, renderer: THREE.WebGLRenderer){
            state.Renderer = renderer;
        },
        setSize: function(state: RendererState, size: RendererSize){
            state.Renderer!.setSize(size.Width, size.Height);
        },
        setPixelRatio: function(state: RendererState, ratio: number){
            state.Renderer!.setPixelRatio(ratio);
        }
    } as MutationTree<RendererState>,
    actions: {
        render: function(store){
            const renderer = store.getters["getRendererInstance"] as THREE.WebGLRenderer;
            const camera = store.rootGetters["CameraModule/getCameraInstance"] as THREE.PerspectiveCamera;
            const scene = store.rootGetters["SceneModule/getSceneInstance"] as THREE.Scene;
            renderer.render(scene, camera);
        }
    } as ActionTree<RendererState, RootState>
};