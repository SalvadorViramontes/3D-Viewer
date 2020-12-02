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
    import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { Vue, Component } from "vue-property-decorator";
    //import dice from "../public/dice.gltf";

    @Component
    export default class Canvas extends Vue {
        private container: Element | null = null;
        private scene: THREE.Scene;
        private controls: OrbitControls | null = null;
        private camera: THREE.PerspectiveCamera | null = null;
        private renderer: THREE.WebGLRenderer;
        private loader: GLTFLoader;
        private objects: Array<THREE.Object3D>;

        constructor(){
            super();
            this.scene = new THREE.Scene();
            this.objects = [];

            const ambientLight = new THREE.AmbientLight(0xffffff,1);
            this.scene.add(ambientLight);

            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            
            this.loader = new GLTFLoader();
        }

        mounted(){
            this.container = this.$refs.canvas as Element;
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight - 3*(parseFloat(getComputedStyle(document.documentElement).fontSize));

            const fieldOfView = 50;
            const aspect = canvasWidth / canvasHeight;
            const nearLimit = 0.01;
            const farLimit = 1000;

            this.camera = new THREE.PerspectiveCamera(fieldOfView, aspect, nearLimit, farLimit);
            this.camera.position.set(0, 0, 10);

            this.renderer.setSize(canvasWidth, canvasHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.container.appendChild(this.renderer.domElement);

            const urlModel = process.env.VUE_APP_MODEL_ROUTE;
            this.loader.load(urlModel, (gltf: GLTF) =>{
                this.scene.add(gltf.scene);
                this.objects.push(gltf.scene.children[0]);
                this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera);
            })

            window.addEventListener('resize', ()=>{
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight - 3*(parseFloat(getComputedStyle(document.documentElement).fontSize));
                this.camera!.aspect = canvasWidth / canvasHeight;
                this.camera!.updateProjectionMatrix();
                this.renderer.setSize(canvasWidth, canvasHeight);
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
                this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera);
            });
        }
    }
</script>