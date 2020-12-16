import * as THREE from 'three';
import { NullableString, NullableNumber } from './nullables'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DOF } from './misc';

export interface RootState {
    currentRoute: NullableString;
}

export interface ObjectState {
    SelectedObjectId: NullableNumber,
    SelectedObjectIndex: NullableNumber,
    Objects: Array<THREE.Object3D>
}

export interface CoordState {
    SelectedIndex: NullableNumber;
    DOFArray: Array<DOF>
}

export interface CameraState {
    Camera: THREE.PerspectiveCamera | null;
}

export interface RendererState {
    Renderer: THREE.WebGLRenderer | null;
}

export interface SceneState {
    Scene: THREE.Scene | null;
}

export interface LoaderState {
    Loader: GLTFLoader | null;
}