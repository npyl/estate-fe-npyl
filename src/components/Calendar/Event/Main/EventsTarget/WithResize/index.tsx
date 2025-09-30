import { ComponentType, forwardRef } from "react";
import VerticalResize from "./VerticalResize";
import { EventContainerProps } from "../../Container";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { EventsTargetProps } from "..";

type PropsWithResize = EventsTargetProps;
type AnyContainer = ComponentType<EventContainerProps>;

const WithResize = (Container: AnyContainer) => {
    const Wrapped = forwardRef<HTMLDivElement, PropsWithResize>(
        (
            {
                event,
                // ...
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
                            event={event}
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

export default WithResize;
