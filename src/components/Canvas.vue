<template>
    <div ref="canvas" id="canvas"></div>
</template>

<style lang="scss">
    #canvas {
        position: absolute;
        width: 100vw;
        height: calc(100vh - 3rem);
        left: 0;
        top: 3rem;
    }
</style>

<script lang="ts">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { Vue, Component } from "vue-property-decorator";
    import { RendererSize } from '@/types/misc';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

    @Component
    export default class Canvas extends Vue {
        private container: Element | null = null;
        private controls: OrbitControls | null = null;

        //#region Getters
        get currentObjectId(){
            return this.$store.getters["ObjectsModule/getSelectedObjectId"];
        }
        
        get camera(){
            return this.$store.getters["CameraModule/getCameraInstance"];
        }

        get renderer(){
            return this.$store.getters["RendererModule/getRendererInstance"];
        }

        get scene(){
            return this.$store.getters["SceneModule/getSceneInstance"];
        }

        get loader(){
            return this.$store.getters["LoaderModule/getLoaderInstance"];
        }
        //#endregion

        constructor(){
            super();
            this.$store.commit("SceneModule/setScene", new THREE.Scene());

            const ambientLight = new THREE.AmbientLight(0xffffff,1);
            this.$store.commit("SceneModule/addObjectToScene", ambientLight);

            this.$store.commit("RendererModule/setRenderer", new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            }));
            
            this.$store.commit("LoaderModule/setLoader", new GLTFLoader());
        }

        mounted(){
            this.container = this.$refs.canvas as Element;
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight - 3*(parseFloat(getComputedStyle(document.documentElement).fontSize));

            const cameraOptions = [
                50, //fieldOfView
                canvasWidth / canvasHeight, //aspect
                0.01, //nearLimit
                1000, //farLimit
            ]

            this.$store.commit("CameraModule/setCamera", new THREE.PerspectiveCamera(...cameraOptions));
            this.$store.commit("CameraModule/setCameraPosition", [0, 0, 10]);

            const rendererSize: RendererSize = {
                Width: canvasWidth,
                Height: canvasHeight
            }
            this.$store.commit("RendererModule/setSize", rendererSize);
            this.$store.commit("RendererModule/setPixelRatio", window.devicePixelRatio);
            this.container.appendChild(this.renderer.domElement);

            const urlModel = process.env.VUE_APP_MODEL_ROUTE;
            this.$store.dispatch("LoaderModule/loadModelFromUrl", urlModel);

            window.addEventListener('resize', ()=>{
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight - 3*(parseFloat(getComputedStyle(document.documentElement).fontSize));
                this.$store.commit("CameraModule/updateCameraAspectRatio", canvasWidth / canvasHeight);
                this.$store.commit("CameraModule/updateProjectionMatrix");
                const rendererSize: RendererSize = {
                    Width: canvasWidth,
                    Height: canvasHeight
                };
                this.$store.commit("RendererModule/setSize", rendererSize);
            });

            this.controls = new OrbitControls( this.camera, this.renderer.domElement );
            this.controls.minDistance = 1;
            this.controls.maxDistance = 50;
            this.controls.enablePan = true;

            // controls.mouseButtons = {
            //     LEFT: THREE.MOUSE.ROTATE,
            //     MIDDLE: THREE.MOUSE.DOLLY,
            //     RIGHT: THREE.MOUSE.PAN
            // }

            this.controls.addEventListener( 'change', () => {
                this.$store.dispatch("RendererModule/render");
            });
        }
    }
</script>