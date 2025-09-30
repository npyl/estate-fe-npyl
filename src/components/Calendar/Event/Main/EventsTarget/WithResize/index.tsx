import { ComponentType, forwardRef } from "react";
import VerticalResize from "./VerticalResize";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { DraggableProps, ResizableProps } from "../types";

type AnyContainer = ComponentType<DraggableProps>;

const WithResize = (Container: AnyContainer) => {
    const Wrapped = forwardRef<HTMLDivElement, ResizableProps>(
        (
            {
                onEventResizeStart,
                onEventResizeEnd,
                onEventDragEnd,
                // ...
                children,
                ...props
            },
            ref
        ) => {
            const [elementRef, { onRef }] =
                useForwardedLocalRef<HTMLDivElement>(ref);

            return (
                <Container ref={onRef} {...props}>
                    {children}

                    {onEventResizeEnd ? (
                        <VerticalResize
                            event={props.event}
                            targetRef={elementRef}
                            // ...
                            onResizeEarlyStart={props.onGhostAdd}
                            onResizeStart={onEventResizeStart}
                            onResizeEnd={onEventResizeEnd}
                            // ...
                            onPositionUpdate={props.onPositionUpdate}
                        />
                    ) : null}
                </Container>
            );
        }
    );

    Wrapped.displayName = "WithResize(View)";

    return Wrapped;
};

export type { ResizableProps };
export default WithResize;
