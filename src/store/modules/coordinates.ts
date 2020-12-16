import { DOF, DOFUpdate, Vector3D } from '@/types/misc';
import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

import { RootState, CoordState } from "@/types/store";
import { NullableNumber } from '@/types/nullables';

export const CoordinatesModule: Module<CoordState, RootState> = {
    namespaced: true as boolean,
    state: {
        SelectedIndex: null,
        DOFArray: []
    } as CoordState,
    getters: {
        getTraslationFromCurrentObject: function(state: CoordState){
            if(state.SelectedIndex !== null) return state.DOFArray[state.SelectedIndex].Traslation;
            else return undefined;
        },
        getRotationFromCurrentObject: function(state: CoordState){
            if(state.SelectedIndex !== null) return state.DOFArray[state.SelectedIndex].Rotation;
            else return undefined;
        },
        getScaleFromCurrentObject: function(state: CoordState){
            if(state.SelectedIndex !== null) return state.DOFArray[state.SelectedIndex].Scale;
            else return undefined;
        }
    } as GetterTree<CoordState, RootState>,
    mutations: {
        pushCoordinates: function(state: CoordState, coordinates: DOF) {
            state.DOFArray.push(coordinates);
            state.SelectedIndex = state.DOFArray.length - 1;
        },
        spliceCoordinates: function(state: CoordState, index: NullableNumber){
            if(state.DOFArray.length > 0 && index !== null && index >= 0 && index < state.DOFArray.length)
                state.DOFArray.splice(index, 1)
        },
        setCurrentObjectIndex: function(state: CoordState, index: NullableNumber){
            if(state.DOFArray.length > 0)
            {
                let objectIndex: NullableNumber;
                if(index !== null && index >= 0 && index < state.DOFArray.length)
                    objectIndex = index;
                else
                    objectIndex = null;
                state.SelectedIndex = objectIndex;
            }
        },
        setTraslationFromCurrentObject: function(state: CoordState, coordinates: Vector3D){
            if(state.SelectedIndex !== null) state.DOFArray[state.SelectedIndex].Traslation = coordinates;
        },
        setRotationFromCurrentObject: function(state: CoordState, coordinates: Vector3D){
            if(state.SelectedIndex !== null) state.DOFArray[state.SelectedIndex].Rotation = coordinates;
        },
        setScaleFromCurrentObject: function(state: CoordState, coordinates: Vector3D){
            if(state.SelectedIndex !== null) state.DOFArray[state.SelectedIndex].Scale = coordinates;
        }
    } as MutationTree<CoordState>,
    actions: {
        addNewObjectCoords: function(store, object: THREE.Object3D){
            const newCoordinates: DOF = {
                Traslation: [object.position.x, object.position.y, object.position.z],
                Rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
                Scale: [object.scale.x, object.scale.y, object.scale.z],
            }
            store.commit("pushCoordinates", newCoordinates);
        },
        currentObjectTraslation: function(store, updateObject: DOFUpdate){
            store.commit("setTraslationFromCurrentObject", updateObject.Coordinates);
        },
        currentObjectRotation: function(store, updateObject: DOFUpdate){
            store.commit("setRotationFromCurrentObject", updateObject.Coordinates);
        },
        currentObjectScale: function(store, updateObject: DOFUpdate){
            store.commit("setScaleFromCurrentObject", updateObject.Coordinates);
        }
    } as ActionTree<CoordState, RootState>
};