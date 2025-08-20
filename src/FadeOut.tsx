import React, { PropsWithChildren, useEffect, useState } from "react";

interface Props {
    delay?: number;
    transitionDuration?: number;
    wrapperTag?: React.ElementType;
    childTag?: React.ElementType;
    className?: string;
    childClassName?: string;
    visible?: boolean; // when false, start fading out
    onComplete?: () => void;
}

export  function FadeOut(props: PropsWithChildren<Props>) {
    const childrenCount = React.Children.count(props.children);
    const [maxIsVisible, setMaxIsVisible] = useState(() => childrenCount);

    const transitionDuration =
        typeof props.transitionDuration === "number" ? props.transitionDuration : 400;
    const delay = typeof props.delay === "number" ? props.delay : 50;
    const WrapperTag = props.wrapperTag || "div";
    const ChildTag = props.childTag || "div";
    const visible = typeof props.visible === "undefined" ? true : props.visible;

    useEffect(() => {
        // If visible, ensure all children are shown immediately (no stagger-in; this is FadeOut).
        if (visible) {
            if (maxIsVisible !== childrenCount) {
                setMaxIsVisible(childrenCount);
            }
            return;
        }

        // If already fully hidden, wait for the transition to end then fire onComplete.
        if (maxIsVisible === 0) {
            const t = setTimeout(() => {
                props.onComplete?.();
            }, transitionDuration);
            return () => clearTimeout(t);
        }

        // Otherwise, stagger-hide one child at a time.
        const t = setTimeout(() => {
            setMaxIsVisible(v => Math.max(0, v - 1));
        }, delay);
        return () => clearTimeout(t);
    }, [
        visible,
        childrenCount,
        delay,
        maxIsVisible,
        transitionDuration,
        props.onComplete,
    ]);

    return (
        <WrapperTag className={props.className}>
            {React.Children.map(props.children, (child, i) => (
                <ChildTag
                    key={(child as any)?.key ?? i}
                    className={props.childClassName}
                    style={{
                        transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                        transform: i < maxIsVisible ? "translateY(0)" : "translateY(20px)",
                        opacity: i < maxIsVisible ? 1 : 0,
                    }}
                >
                    {child}
                </ChildTag>
            ))}
        </WrapperTag>
    );
}
