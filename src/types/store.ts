import { NullableString, NullableNumber } from './nullables'

export interface RootState {
    currentRoute: NullableString;
}

export interface ModuleState {
    property: null;
}