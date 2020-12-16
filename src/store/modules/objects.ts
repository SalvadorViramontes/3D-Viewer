import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

import { RootState, ObjectState } from "@/types/store";
import { DOFUpdate, Vector3D } from '@/types/misc';
import { NullableNumber } from '@/types/nullables';

export const ObjectsModule: Module<ObjectState, RootState> = {
    namespaced: true as boolean,
    state: {
        SelectedObjectId: null,
        SelectedObjectIndex: null,
        Objects: []
    } as ObjectState,
    getters: {
        getSelectedObjectIndex: function(state: ObjectState){
            if(state.Objects.length > 0)
            {
                const mappedArray = state.Objects.map(item => item.id);
                const index = mappedArray.indexOf(state.SelectedObjectId as number);
                if(index !== -1) return index;
            }
            return null;
        },
        getSelectedObjectId: function(state: ObjectState){
            return state.SelectedObjectId;
        },
        getObjectIdArray: function(state: ObjectState){
            return state.Objects.map(item => item.id);
        },
        getObjectIdByIndex: function(state: ObjectState, index: number){
            if(index >= 0 && index < state.Objects.length)
                return state.Objects[index].id;
            else return null;
        },
        getTotalObjects: function(state: ObjectState){
            return state.Objects.length;
        }
    } as GetterTree<ObjectState, RootState>,
    mutations: {
        pushObject: function(state: ObjectState, object: THREE.Object3D) {
            state.Objects.push(object);
            state.SelectedObjectId = object.id;
        },
        spliceObject: function(state: ObjectState, index: NullableNumber){
            if(state.Objects.length > 0 && index !== null && index >= 0 && index < state.Objects.length) 
                state.Objects.splice(index, 1);
        },
        setCurrentObjectId: function(state: ObjectState, id: NullableNumber){
            if(state.Objects.length > 0){
                let objectId: NullableNumber;
                const mappedArray = state.Objects.map(obj => obj.id);
                if(id !== null){
                    const index = mappedArray.indexOf(id);
                    if(index >= 0) objectId = index;
                    else objectId = null;
                }
                else objectId = null;
                state.SelectedObjectId = objectId;
            }
        },
        setCurrentObjectIndex: function(state: ObjectState, index: NullableNumber){
            if(state.Objects.length > 0)
            {
                let objectIndex: NullableNumber;
                if(index !== null && index >= 0 && index < state.Objects.length)
                    objectIndex = index;
                else
                    objectIndex = null;
                state.SelectedObjectIndex = objectIndex;
            }
        },
        setTraslationToCurrentObject: function(state: ObjectState, coordinates: Vector3D){
            if(state.SelectedObjectIndex !== null) 
                state.Objects[state.SelectedObjectIndex].position.set(...coordinates);
        },
        setRotationToCurrentObject: function(state: ObjectState, coordinates: Vector3D){
            if(state.SelectedObjectIndex !== null){
                const radians = coordinates.map(item => item*(Math.PI/180));
                state.Objects[state.SelectedObjectIndex].rotation.set(radians[0], radians[1], radians[2]);
            }
        },
        setScaleToCurrentObject: function(state: ObjectState, coordinates: Vector3D){
            if(state.SelectedObjectIndex !== null)
                state.Objects[state.SelectedObjectIndex].scale.set(...coordinates);
        },
    } as MutationTree<ObjectState>,
    actions: {
        setCurrentObject: function(store, id: number){
            if(store.getters.getTotalObjects > 0)
            {
                const mappedArray = store.getters.getObjectIdArray;
                const objectIndex = mappedArray.indexOf(id);
                if(objectIndex !== -1)
                {
                    store.commit("setCurrentObjectId", id);
                    store.commit("setCurrentObjectIndex", objectIndex);
                    store.commit('CoordinatesModule/setCurrentObjectIndex', objectIndex , {root:true});
                }
            }
        },
        deleteObject: function(store, id: number){
            if(store.getters.getTotalObjects > 0)
            {
                const mappedArray = store.getters.getObjectIdArray;
                const objectIndex = mappedArray.indexOf(id);
                if(objectIndex !== -1)
                {
                    let newObjectIndex: NullableNumber;
                    let newObjectId: NullableNumber;
                
                    store.commit("spliceObject", objectIndex);
                    store.commit("CoordinatesModule/spliceCoordinates", objectIndex, {root: true})

                    const totalObjects = store.getters.getTotalObjects;
                    if(totalObjects > 0)
                    {
                        if(objectIndex >= totalObjects) newObjectIndex = objectIndex - 1;
                        else newObjectIndex = objectIndex;
                        newObjectId = store.getters.getObjectIdByIndex(newObjectIndex);
                    }
                    else
                    {
                        newObjectIndex = null;
                        newObjectId = store.getters.getObjectIdByIndex(newObjectIndex);
                    }
                    store.commit("setCurrentObjectIndex", newObjectIndex);
                    store.commit("setCurrentObjectId", newObjectId);
                    store.commit("CoordinatesModule/setCurrentObjectIndex", newObjectIndex, {root: true});
                }
            }
        },
        addObject: function(store, object: THREE.Object3D){
            store.commit("pushObject", object);

            const totalObjects = store.getters.getTotalObjects;
            store.commit("setCurrentObjectIndex", totalObjects - 1);
            store.commit("setCurrentObjectId", object.id);

            store.dispatch('CoordinatesModule/addNewObjectCoords', object, {root:true});
        },
        updateCurrentObjectDOF: function(store, updateObject: DOFUpdate){
            store.commit(`set${updateObject.Type}ToCurrentObject`, updateObject.Coordinates);
            store.dispatch(`CoordinatesModule/currentObject${updateObject.Type}`, updateObject.Coordinates, {root: true});
            store.dispatch("RendererModule/render", null, {root: true});
        }
    } as ActionTree<ObjectState, RootState>
};