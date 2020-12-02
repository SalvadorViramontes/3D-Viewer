<template>
    <b-form :id="typeLower + 'form'">
        <b-row class="my-1" v-for="(item, index) in coordNames" v-bind:key="typeLower + item">
            <b-col sm="3">
                <label :for="'coord' + item"> {{item}} :</label>
            </b-col>
            <b-col sm="9">
                <b-form-input 
                    :name="'coord' + item" 
                    :id="'coord' + item"
                    v-model="coords[index]"
                    type="number"
                    step="0.01"
                    :form="typeLower + 'form'">
                </b-form-input>
            </b-col>
        </b-row>
    </b-form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import { TypeForm } from '../types/forms';

    @Component
    export default class Form3D extends Vue {
        public coordNames = ["X", "Y", "Z"];
        public coords: Array<number> = [0, 0, 0];

        @Prop()
        public formType!: TypeForm;

        get typeLower(): string {
            const formaType = this.formType as string;
            return formaType.toLowerCase();
        }

        constructor(){
            super();
        }

        coordName(coord: string): string{
            return "coord" + coord;
        }
    }
</script>