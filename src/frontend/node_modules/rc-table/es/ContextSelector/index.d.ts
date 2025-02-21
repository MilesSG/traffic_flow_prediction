import * as React from 'react';
export declare type Selector<T, O = T> = (value: T) => O;
export declare type Trigger<T> = (value: T) => void;
export declare type Listeners<T> = Set<Trigger<T>>;
export interface Context<T> {
    getValue: () => T;
    listeners: Listeners<T>;
}
export interface ContextSelectorProviderProps<T> {
    value: T;
    children?: React.ReactNode;
}
export interface ReturnCreateContext<T> {
    Context: React.Context<Context<T>>;
    Provider: React.ComponentType<ContextSelectorProviderProps<T>>;
}
export declare function createContext<T>(): ReturnCreateContext<T>;
export declare function useContextSelector<T, O>(holder: ReturnCreateContext<T>, selector: Selector<T, O>): O;
