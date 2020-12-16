import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

import { RootState, CameraState } from "@/types/store";
import { Vector3D } from '@/types/misc';

export const CameraModule: Module<CameraState, RootState> = {
    namespaced: true as boolean,
    state: {
        Camera: null,
    } as CameraState,
    getters: {
        getCameraInstance: function(state: CameraState){
            return state.Camera;
        },
        getCameraPosition: function(state: CameraState){
            return state.Camera!.position;
        },
    } as GetterTree<CameraState, RootState>,
    mutations: {
        updateProjectionMatrix: function(state: CameraState) {
            state.Camera!.updateProjectionMatrix();
        },
        updateCameraAspectRatio: function(state: CameraState, aspectRatio: number){
            state.Camera!.aspect = aspectRatio
        },
        setCamera: function(state: CameraState, camera: THREE.PerspectiveCamera){
            state.Camera = camera;
        },
        setCameraPosition: function(state: CameraState, coordinates: Vector3D){
            state.Camera!.position.set(...coordinates);
        },
    } as MutationTree<CameraState>,
    actions: {
        setCamera: function(store, camera: THREE.PerspectiveCamera){
            store.commit("setCamera", camera);
        }
    } as ActionTree<CameraState, RootState>
};