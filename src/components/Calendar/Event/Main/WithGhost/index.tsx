import { ComponentType, forwardRef } from "react";
import useGhost from "./useGhost";
import {
    TCalendarEvent,
    TOnEventDragEnd,
    TOnEventResizeEnd,
} from "@/components/Calendar/types";

type OmitList = "onGhostAdd" | "onGhostRemove";

type Responder = {
    onGhostAdd: VoidFunction;
    onGhostRemove: VoidFunction;
    onEventDragEnd?: TOnEventDragEnd;
    onEventResizeEnd?: TOnEventResizeEnd;
    event: TCalendarEvent;
};

type WrappableComponent<T extends Responder> = ComponentType<T>;
type WithGhostProps<T extends Responder> = Omit<T, OmitList>;

const WithGhost = <T extends Responder>(Component: WrappableComponent<T>) => {
    const WrappedComponent = forwardRef<HTMLDivElement, WithGhostProps<T>>(
        (
            {
                onEventDragEnd: _onEventDragEnd,
                onEventResizeEnd: _onEventResizeEnd,
                ...props
            }: any,
            ref
        ) => {
            const {
                onGhostAdd,
                onGhostRemove,
                onEventDragEnd,
                onEventResizeEnd,
            } = useGhost(props.event.id, _onEventDragEnd, _onEventResizeEnd);

            // Type assertion to tell TypeScript that we're reconstructing T correctly
            const componentProps = {
                ref,
                onGhostAdd,
                onGhostRemove,
                onEventDragEnd,
                onEventResizeEnd,
                ...props,
            } as unknown as T & { ref: React.Ref<HTMLDivElement> };

            return <Component {...componentProps} />;
        }
    );

    WrappedComponent.displayName = `WithGhost(${Component.displayName || Component.name})`;

    return WrappedComponent;
};

export default WithGhost;
