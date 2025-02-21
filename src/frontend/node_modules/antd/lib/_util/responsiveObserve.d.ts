export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Record<Breakpoint, string>;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>;
export declare const responsiveArray: Breakpoint[];
export declare const responsiveMap: BreakpointMap;
type SubscribeFunc = (screens: ScreenMap) => void;
declare const responsiveObserve: {
    matchHandlers: {
        [prop: string]: {
            mql: MediaQueryList;
            listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
        };
    };
    dispatch(pointMap: ScreenMap): boolean;
    subscribe(func: SubscribeFunc): number;
    unsubscribe(token: number): void;
    unregister(): void;
    register(): void;
};
export default responsiveObserve;
