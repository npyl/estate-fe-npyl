import {
    createContext,
    FC,
    PropsWithChildren,
    RefObject,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from "react";
import Renderer, { RendererRef } from "./Renderer";
import usePopperEvents, {
    EVENTS,
    PopperEventDataMap,
    STATES,
    TPopperEventCb,
} from "./usePopperEvents";
import { notifyCells } from "./notifyCells";
import Saver, { SaverRef } from "./Saver";
import getEndDateForDuration from "./getEndDateForDuration";
import {
    lockAllEvents,
    lockAllEventsExcept,
    unlockAllEvents,
} from "@/components/Calendar/Event/util";

type IState = {
    dispatch: ReturnType<ReturnType<typeof usePopperEvents>[0]>["dispatch"];
};

const PopperContext = createContext<IState | undefined>(undefined);

// ---------------------------------------------------------------------------------

export const usePopperContext = () => {
    const context = useContext(PopperContext);
    if (context === undefined) {
        throw new Error(
            "PopperContext value is undefined. Make sure you use the PopperContext before using the context."
        );
    }
    return context;
};

// ---------------------------------------------------------------------------------

type TMachineMethod<
    T extends keyof PopperEventDataMap = keyof PopperEventDataMap,
> = (o: PopperEventDataMap[T]) => void;

interface MachineMethods {
    // Open an existing event (e.g. view / edit), open a create event popper
    OpenEvent: TMachineMethod<EVENTS.CLICK>;
    OpenEventCreate: TMachineMethod<EVENTS.CLICK_EVENT>;

    DragStart: TMachineMethod<EVENTS.DRAG_START>;
    DragEnd: TMachineMethod<EVENTS.DRAG_END>;

    ResizeStart: TMachineMethod<EVENTS.RESIZE_START>;
    ResizeEnd: TMachineMethod<EVENTS.RESIZE_END>;

    // Close any popper
    Close: TMachineMethod<EVENTS.CLOSE>;
}

const NO_OP = () => {};

const getMACHINE = (methods: MachineMethods) => ({
    [STATES.IDLE]: {
        [EVENTS.CLICK]: methods.OpenEvent,
        [EVENTS.CLICK_EVENT]: methods.OpenEventCreate,
        [EVENTS.DRAG_START]: methods.DragStart,
        [EVENTS.DRAG_END]: methods.DragEnd,
        [EVENTS.RESIZE_START]: methods.ResizeStart,
        [EVENTS.RESIZE_END]: methods.ResizeEnd,
        [EVENTS.CLOSE]: NO_OP,
    },
    [STATES.POPPER]: {
        [EVENTS.CLICK]: methods.Close,
        [EVENTS.CLICK_EVENT]: methods.Close,
        [EVENTS.DRAG_START]: methods.DragStart,
        [EVENTS.DRAG_END]: methods.DragEnd,
        [EVENTS.RESIZE_START]: methods.ResizeStart,
        [EVENTS.RESIZE_END]: methods.ResizeEnd,
        [EVENTS.CLOSE]: methods.Close,
    },
    [STATES.POPPER_CREATE]: {
        [EVENTS.CLICK]: methods.Close,
        [EVENTS.CLICK_EVENT]: methods.Close,
        [EVENTS.DRAG_START]: methods.DragStart,
        [EVENTS.DRAG_END]: methods.DragEnd,
        [EVENTS.RESIZE_START]: methods.ResizeStart,
        [EVENTS.RESIZE_END]: methods.ResizeEnd,
        [EVENTS.CLOSE]: methods.Close,
    },
});

const NO_DATA_EVENTS: EVENTS[] = [
    EVENTS.CLOSE,
    EVENTS.DRAG_START,
    EVENTS.RESIZE_START,
];

const useMachine = (
    ref: RefObject<HTMLElement | null>,
    saverRef: RefObject<SaverRef>,
    rendererRef: RefObject<RendererRef>
) => {
    const state = useRef<STATES>(STATES.IDLE);

    const MACHINE = useMemo(
        () =>
            getMACHINE({
                OpenEvent: ({ me: { currentTarget }, ce }) => {
                    lockAllEventsExcept(ce.id);
                    rendererRef.current?.setEvent(currentTarget, ce);
                    state.current = STATES.POPPER;
                },
                OpenEventCreate: ({ me: { currentTarget }, startDate }) => {
                    lockAllEvents();
                    notifyCells(startDate, "");
                    rendererRef.current?.setStartDate(currentTarget, startDate);
                    state.current = STATES.POPPER_CREATE;
                },

                DragStart: () => {
                    rendererRef.current?.hidePopper();
                },

                DragEnd: async ({ ce, startDate, endDate }) => {
                    switch (state.current) {
                        case STATES.IDLE:
                        case STATES.POPPER:
                            const ok = await saverRef.current?.drag(
                                ce,
                                startDate,
                                endDate
                            );
                            if (!ok) return;

                            break;
                        case STATES.POPPER_CREATE:
                            rendererRef.current?.updateDates(
                                startDate,
                                endDate
                            );
                            break;
                    }

                    // TODO: support create... (eg. id PPCalendarEventCreate)
                    // const el = document.getElementById(ce.id);
                    // if (!el) return;
                    // rendererRef.current?.updatePopperPosition(el);

                    rendererRef.current?.showPopper();
                },

                ResizeStart: () => {},

                ResizeEnd: ({ ce, h }) => {
                    switch (state.current) {
                        case STATES.IDLE:
                        case STATES.POPPER:
                            saverRef.current?.resize(ce, h);
                            break;
                        case STATES.POPPER_CREATE:
                            const { startDate } = ce;

                            const endDate = getEndDateForDuration(startDate, h);

                            rendererRef.current?.updateDates(
                                startDate,
                                endDate
                            );
                            break;
                    }
                },

                Close: () => {
                    switch (state.current) {
                        case STATES.POPPER_CREATE:
                            // INFO: remove all "create"-events
                            notifyCells("", "");
                            break;
                    }

                    rendererRef.current?.closePopper();
                    state.current = STATES.IDLE;

                    unlockAllEvents();
                },
            }),
        []
    );

    const handleEvent: TPopperEventCb = useCallback(({ detail }) => {
        const { event, other } = detail || {};
        if (event === undefined) return;

        // INFO: support no data only for specific events
        if (!other && !NO_DATA_EVENTS.includes(event)) return;

        const cb = MACHINE[state.current][event!];

        // TODO: Fix this
        cb(other as never);
    }, []);

    const [useDispatcher, useListener] = usePopperEvents(handleEvent, ref);

    const { dispatch } = useDispatcher();
    useListener();

    return { state, dispatch };
};

// ---------------------------------------------------------------------------------

const PopperProvider: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const saverRef = useRef<SaverRef>(null);
    const rendererRef = useRef<RendererRef>(null);

    const { dispatch } = useMachine(ref, saverRef, rendererRef);

    const onClose = useCallback(
        () =>
            dispatch({
                event: EVENTS.CLOSE,
                other: undefined,
            }),
        [dispatch]
    );

    return (
        <PopperContext.Provider value={{ dispatch }}>
            <Saver ref={saverRef} />
            <div ref={ref}>
                {children}
                <Renderer ref={rendererRef} onClose={onClose} />
            </div>
        </PopperContext.Provider>
    );
};

export { EVENTS };
export default PopperProvider;
