<template>
    <b-form :id="typeLower + 'form'">
        <b-row class="my-1" v-for="(item, index) in coordNames" v-bind:key="typeLower + item">
            <b-col sm="3">
                <label :for="typeLower + 'Coord' + item"> {{item}} :</label>
            </b-col>
            <b-col sm="9">
                <b-form-input 
                    :name="typeLower + 'Coord' + item" 
                    :id="typeLower + 'Coord' + item"
                    v-model="coords[index]"
                    type="number"
                    :step="formStep"
                    :form="typeLower + 'form'">
                </b-form-input>
            </b-col>
        </b-row>
    </b-form>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import { DOFUpdate, TypeForm, Vector3D } from '@/types/misc';

    @Component
    export default class Form3D extends Vue {
        public coordNames = ["X", "Y", "Z"];
        public coords: Vector3D;

        @Prop()
        public formType!: TypeForm;

        @Watch('coords')
        updateCoords(): void{
            const update: DOFUpdate = {
                Coordinates: this.coords,
                Type: this.formType
            };
            console.log(update);
            this.$store.dispatch('ObjectsModule/updateCurrentObjectDOF', update);
        }

        get formStep() {
            switch(this.formType as string){
                case 'Traslation':
                    return 0.01;
                case 'Rotation':
                    return 1;
                case 'Scale':
                    return 0.01;
                default:
                    return 0.1;
            }
        }

        get typeLower(): string {
            const formaType = this.formType as string;
            return formaType.toLowerCase();
        }

        constructor(){
            super();
            this.coords = (this.formType as string === 'Scale') ? [1, 1, 1] : [0, 0, 0];
        }

        coordName(coord: string): string{
            return "coord" + coord;
        }
    }
</script>