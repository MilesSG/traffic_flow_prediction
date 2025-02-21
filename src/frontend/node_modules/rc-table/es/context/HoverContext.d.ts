export interface HoverContextProps {
    startRow: number;
    endRow: number;
    onHover: (start: number, end: number) => void;
}
declare const HoverContext: import("../ContextSelector").ReturnCreateContext<HoverContextProps>;
export default HoverContext;
