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

    // Drag & Resize (w/o save)
    Drag: TMachineMethod<EVENTS.DRAG_END>;
    Resize: TMachineMethod<EVENTS.RESIZE_END>;

    // Drag & Resize (w/ save)
    DragSave: TMachineMethod<EVENTS.DRAG_END>;
    ResizeSave: TMachineMethod<EVENTS.RESIZE_END>;

    // Close any popper
    Close: TMachineMethod<EVENTS.CLOSE>;
    CloseCreate: TMachineMethod<EVENTS.CLOSE_CREATE>;
}

const NO_OP = () => {};

const getMACHINE = (methods: MachineMethods) => ({
    [STATES.IDLE]: {
        [EVENTS.CLICK]: methods.OpenEvent,
        [EVENTS.CLICK_EVENT]: methods.OpenEventCreate,
        [EVENTS.DRAG_END]: methods.DragSave, // -
        [EVENTS.RESIZE_END]: methods.ResizeSave, // -
        [EVENTS.CLOSE]: NO_OP,
        [EVENTS.CLOSE_CREATE]: NO_OP,
    },
    [STATES.POPPER]: {
        [EVENTS.CLICK]: methods.Close, // -
        [EVENTS.CLICK_EVENT]: methods.Close, // -
        [EVENTS.DRAG_END]: methods.DragSave, // -
        [EVENTS.RESIZE_END]: methods.ResizeSave, // -
        [EVENTS.CLOSE]: methods.Close, // -
        [EVENTS.CLOSE_CREATE]: NO_OP,
    },
    [STATES.POPPER_CREATE]: {
        [EVENTS.CLICK]: methods.CloseCreate, // -
        [EVENTS.CLICK_EVENT]: methods.CloseCreate, // -
        [EVENTS.DRAG_END]: methods.Drag, // -
        [EVENTS.RESIZE_END]: methods.Resize, // -
        [EVENTS.CLOSE]: NO_OP,
        [EVENTS.CLOSE_CREATE]: methods.CloseCreate,
    },
});

const useMachine = (
    el: HTMLElement | null,
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

                Drag: () => {},
                Resize: () => {},

                DragSave: () => {},
                ResizeSave: () => {},

                Close: () => {
                    rendererRef.current?.closePopper();
                    state.current = STATES.IDLE;
                },
                CloseCreate: () => {
                    // INFO: remove all "create"-events
                    notifyCells("", "");
                    rendererRef.current?.closePopper();
                    state.current = STATES.IDLE;
                },
            }),
        []
    );

    const handleEvent: TPopperEventCb = useCallback(({ detail }) => {
        const { event, other } = detail || {};
        if (event === undefined) return;

        // INFO: support no data only for EVENTS.CLOSE or EVENTS.CLOSE_CREATE
        if (!other && event !== EVENTS.CLOSE && event !== EVENTS.CLOSE_CREATE)
            return;

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
    const rendererRef = useRef<RendererRef>(null);

    const { state, dispatch } = useMachine(ref.current, rendererRef);

    const onClose = useCallback(() => {
        const event =
            state.current === STATES.POPPER
                ? EVENTS.CLOSE
                : EVENTS.CLOSE_CREATE;

        dispatch({
            event,
            other: undefined,
        });
    }, [dispatch]);

    return (
        <PopperContext.Provider value={{ dispatch }}>
            <div ref={ref}>
                {children}
                <Renderer ref={rendererRef} onClose={onClose} />
            </div>
        </PopperContext.Provider>
    );
};

export { EVENTS };
export default PopperProvider;
