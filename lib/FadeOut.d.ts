import React, { PropsWithChildren } from "react";
interface Props {
    delay?: number;
    transitionDuration?: number;
    wrapperTag?: React.ElementType;
    childTag?: React.ElementType;
    className?: string;
    childClassName?: string;
    visible?: boolean;
    onComplete?: () => void;
}
export declare function FadeOut(props: PropsWithChildren<Props>): React.JSX.Element;
export {};
