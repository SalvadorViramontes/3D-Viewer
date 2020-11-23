import { Module, GetterTree, MutationTree, ActionTree } from "vuex";

import { RootState, ModuleState } from "../../types/store";

export const QuizModule: Module<ModuleState, RootState> = {
    namespaced: true as boolean,
    state: {
        property: null
    } as ModuleState,
    getters: {
        getProperty: function(state: ModuleState){
            return state.property;
        }
    } as GetterTree<ModuleState, RootState>,
    mutations: {
        setProperty: function(state: ModuleState, object: any) {
            state.property = object;
        }
    } as MutationTree<ModuleState>,
    actions: {
        // pollQuestions: function(store){
        //     const userOptions: UserOptions = store.rootGetters['OptionsModule/getSelectedOptions'];

        //     fetch(myUrl, {
        //         method: 'get'
        //     }).then((response => {
        //         return response.json();
        //     })).then((jsonData => {
        //         store.commit('setQuestions', jsonData.results);
        //     }))
        // }
    } as ActionTree<ModuleState, RootState>
};