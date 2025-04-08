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

type IState = {
    dispatch: ReturnType<typeof usePopperEvents>[0];
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
    T extends keyof PopperEventDataMap = keyof PopperEventDataMap
> = (o: PopperEventDataMap[T]) => void;

interface MachineMethods {
    // Open an existing event (e.g. view / edit), open a create event popper
    OpenEvent: TMachineMethod<EVENTS.CLICK>;
    OpenEventCreate: TMachineMethod<EVENTS.CLICK_EVENT>;

    Drag: TMachineMethod<EVENTS.DRAG_END>;
    Resize: TMachineMethod<EVENTS.RESIZE_END>;

    // Close any popper
    Close: TMachineMethod<EVENTS.CLOSE>;
}

const NO_OP = () => {};

const getMACHINE = (methods: MachineMethods) => ({
    [STATES.IDLE]: {
        [EVENTS.CLICK]: methods.OpenEvent,
        [EVENTS.CLICK_EVENT]: methods.OpenEventCreate,
        [EVENTS.DRAG_END]: methods.Drag, // -
        [EVENTS.RESIZE_END]: methods.Resize, // -
        [EVENTS.CLOSE]: NO_OP,
    },
    [STATES.POPPER]: {
        [EVENTS.CLICK]: methods.Close,
        [EVENTS.CLICK_EVENT]: methods.Close,
        [EVENTS.DRAG_END]: methods.Drag, // -
        [EVENTS.RESIZE_END]: methods.Resize, // -
        [EVENTS.CLOSE]: methods.Close,
    },
    [STATES.POPPER_CREATE]: {
        [EVENTS.CLICK]: methods.Close,
        [EVENTS.CLICK_EVENT]: methods.Close,
        [EVENTS.DRAG_END]: methods.Drag, // -
        [EVENTS.RESIZE_END]: methods.Resize, // -
        [EVENTS.CLOSE]: methods.Close,
    },
});

const useMachine = (
    el: HTMLElement | null,
    saverRef: RefObject<SaverRef>,
    rendererRef: RefObject<RendererRef>
) => {
    const state = useRef<STATES>(STATES.IDLE);

    const MACHINE = useMemo(
        () =>
            getMACHINE({
                OpenEvent: ({ me: { currentTarget }, ce }) => {
                    rendererRef.current?.setEvent(currentTarget, ce);
                    state.current = STATES.POPPER;
                },
                OpenEventCreate: ({ me: { currentTarget }, startDate }) => {
                    notifyCells(startDate, "");
                    rendererRef.current?.setStartDate(currentTarget, startDate);
                    state.current = STATES.POPPER_CREATE;
                },

                Drag: ({}) => {
                    switch (state.current) {
                        case STATES.POPPER:
                            break;
                        case STATES.POPPER_CREATE:
                            break;
                    }
                },

                Resize: ({ ce, h }) => {
                    switch (state.current) {
                        case STATES.POPPER:
                            saverRef.current?.resize(ce, h);
                            break;
                        case STATES.POPPER_CREATE:
                            break;
                    }
                },

                Close: () => {
                    switch (state.current) {
                        case STATES.POPPER_CREATE:
                            // INFO: remove all "create"-events
                            notifyCells("", "");
                            break;
                        default:
                            rendererRef.current?.closePopper();
                            state.current = STATES.IDLE;
                    }
                },
            }),
        []
    );

    const handleEvent: TPopperEventCb = useCallback(({ detail }) => {
        const { event, other } = detail || {};
        if (event === undefined) return;

        // INFO: support no data only for EVENTS.CLOSE
        if (!other && event !== EVENTS.CLOSE) return;

        const cb = MACHINE[state.current][event!];

        // TODO: Fix this
        cb(other as never);
    }, []);

    const [dispatch, useListener] = usePopperEvents(handleEvent, el);

    useListener();

    return { state, dispatch };
};

// ---------------------------------------------------------------------------------

const PopperProvider: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const saverRef = useRef<SaverRef>(null);
    const rendererRef = useRef<RendererRef>(null);

    const { dispatch } = useMachine(ref.current, saverRef, rendererRef);

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
