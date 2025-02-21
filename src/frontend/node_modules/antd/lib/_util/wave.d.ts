import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
export interface WaveProps {
    insertExtraNode?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
}
declare class Wave extends React.Component<WaveProps> {
    static contextType: React.Context<ConfigConsumerProps>;
    private instance?;
    private containerRef;
    private extraNode;
    private clickWaveTimeoutId;
    private animationStartId;
    private animationStart;
    private destroyed;
    private csp?;
    context: ConfigConsumerProps;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onClick: (node: HTMLElement, waveColor: string) => void;
    onTransitionStart: (e: AnimationEvent) => void;
    onTransitionEnd: (e: AnimationEvent) => void;
    getAttributeName(): string;
    bindAnimationEvent: (node?: HTMLElement) => {
        cancel: () => void;
    } | undefined;
    resetEffect(node: HTMLElement): void;
    renderWave: ({ csp }: ConfigConsumerProps) => string | number | boolean | Iterable<React.ReactNode> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined;
    render(): React.JSX.Element;
}
export default Wave;
