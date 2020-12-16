export type TypeForm = 'Traslation' | 'Rotation' | 'Scale';

export type Vector3D = [number, number, number];

export interface PerspectiveCameraOptions {
    fieldOfView: number,
    aspect: number,
    nearLimit: number,
    farLimit: number
}

export interface DOF {
    Traslation: Vector3D,
    Rotation: Vector3D,
    Scale: Vector3D,
}

export interface DOFUpdate {
    Coordinates: Vector3D,
    Type: TypeForm
}

export interface RendererSize {
    Width: number,
    Height: number
}