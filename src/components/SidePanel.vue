<template>
    <div id="mySidepanel" class="accordion sidepanel shadow" role="tablist">
        <div id="togglebtn" class="shadow" @click="toggleNav()">&#8250;</div>
        <h4 class="title">Menú de Opciones</h4>
        <b-card no-body>
            <b-tabs card pills>
                <b-tab active>
                    <template #title>
                        <i class="fas fa-globe-americas"></i>
                    </template>
                    <b-card-text>
                         <h5 class="mt-0">Opciones Globales</h5>
                    </b-card-text>
                </b-tab>
                <b-tab>
                    <template #title>
                        <i class="fas fa-cube"></i>
                    </template>
                    <b-card-text>
                        <h5 class="mt-0">Transformaciones Simples</h5>
                        <b-card no-body>
                            <b-tabs card pills>
                                <b-tab active>
                                    <template #title>
                                        <i class="fas fa-arrows-alt"></i>
                                    </template>
                                    <b-card-text>
                                        <h5 class="mt-0">Traslación</h5>
                                        <Form3D formType="'Traslation'"/>
                                    </b-card-text>
                                </b-tab>
                                <b-tab>
                                    <template #title>
                                        <i class="fas fa-sync"></i>
                                    </template>
                                    <b-card-text>
                                        <h5 class="mt-0">Rotación</h5>
                                        <Form3D formType="'Rotation'"/>
                                    </b-card-text>
                                </b-tab>
                                <b-tab>
                                    <template #title>
                                        <i class="fas fa-expand-arrows-alt"></i>
                                    </template>
                                    <b-card-text>
                                        <h5 class="mt-0">Escala</h5>
                                        <Form3D formType="'Scale'"/>
                                    </b-card-text>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-card-text>
                </b-tab>
                <b-tab>
                    <template #title>
                        <i class="fas fa-palette"></i>
                    </template>
                    <b-card-text>
                        <h5 class="mt-0">Colores</h5>
                    </b-card-text>
                </b-tab>
            </b-tabs>
        </b-card>

    </div>
</template>

<style lang="scss">
    $panelColor: rgb(175, 182, 158);

    .title{
        padding-left: 1.5rem;
        padding-bottom: 0.5rem;
        font-weight: bolder;
    }

    .btn-block{
        width: calc(100% - 1rem) !important;
    }

    .sidepanel {
        height: 100%; 
        width: 0; 
        position: fixed; 
        z-index: 1; 
        top: 3rem;
        left: 0;
        background-color: $panelColor;
        overflow-x: hidden; 
        padding-top: 20px; 
        transition-duration: 0.5s;
        transition-delay: 0s;
        transition-timing-function: linear;

        a {
            text-decoration: none;
            font-size: 25px;
            color: #818181;
            display: block;
            transition: 0.3s;

            &:hover {
                color: #f1f1f1;
            }
        }
    }

    #togglebtn {
        position: fixed; 
        z-index: 2; 
        top: 3rem;
        
        display: inline-block;
        vertical-align: middle;

        left: 0px;
        font-size: 36px;
        width: initial;
        padding: 0rem 0.6rem 0.4rem 0.8rem;
        text-align: center;
        transition-duration: 0.5s;
        transition-delay: 0s;
        transition-timing-function: linear;

        cursor: pointer;
        background-color: darken($panelColor, 30%);
        color: white;
        border: none;

        &:hover {
            background-color: darken($panelColor, 15%);
        }
    }
</style>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import Form3D from './Form3D.vue';

    @Component({
        components: {
            Form3D,
        }
    })
    export default class SidePanel extends Vue {
        private sideStatusOpen = false;

        constructor(){
            super();
        }

        toggleNav() {
            const sidePanelElement = document.getElementById("mySidepanel") as HTMLElement;
            const buttonElement = document.getElementById("togglebtn") as HTMLElement;

            if (!this.sideStatusOpen)
            {
                buttonElement.style.left = "250px";
                sidePanelElement.style.width = "250px";
                buttonElement.innerHTML = "&#8249;";
            }
            else
            {
                buttonElement.style.left = "0px";
                sidePanelElement.style.width = "0px";
                buttonElement.innerHTML = "&#8250;";
            }
            this.sideStatusOpen = !this.sideStatusOpen;
        }
    }
</script>