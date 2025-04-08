import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from "react";
import Renderer, { RendererRef } from "./Renderer";
import usePopperEvents, {
    EVENTS,
    STATES,
    TPopperEventCb,
} from "./usePopperEvents";

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

// Open an existing event (e.g. view / edit), open a create event popper
const OpenEvent = () => {};
const OpenEventCreate = () => {};

// Drag & Resize (w/o save)
const Drag = () => {};
const Resize = () => {};

// Drag & Resize (w/ save)
const DragSave = () => {};
const ResizeSave = () => {};

// Close any popper
const Close = () => {};

const getMACHINE = () => ({
    [STATES.IDLE]: {
        [EVENTS.CLICK]: OpenEvent,
        [EVENTS.CLICK_EVENT]: OpenEventCreate,
        [EVENTS.DRAG_END]: DragSave,
        [EVENTS.RESIZE_END]: ResizeSave,
    },
    [STATES.POPPER]: {
        [EVENTS.CLICK]: Close,
        [EVENTS.CLICK_EVENT]: Close,
        [EVENTS.DRAG_END]: DragSave,
        [EVENTS.RESIZE_END]: ResizeSave,
    },
    [STATES.POPPER_CREATE]: {
        [EVENTS.CLICK]: Close,
        [EVENTS.CLICK_EVENT]: Close,
        [EVENTS.DRAG_END]: Drag,
        [EVENTS.RESIZE_END]: Resize,
    },
});

const useMachine = (el: HTMLElement | null) => {
    const state = useRef<STATES>(STATES.IDLE);
    const MACHINE = useMemo(() => getMACHINE(), []);

    const handleEvent: TPopperEventCb = useCallback(({ detail }) => {
        const { event, other } = detail || {};
        if (event === undefined) return;

        console.log(`[${event}]:`, other);

        const cb = MACHINE[state.current][event!];

        // cb(me, ...other);
    }, []);

    const [dispatch, useListener] = usePopperEvents(handleEvent, el);

    useListener();

    return dispatch;
};

// ---------------------------------------------------------------------------------

const PopperProvider: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<RendererRef>(null);

    const dispatch = useMachine(ref.current);

    return (
        <PopperContext.Provider value={{ dispatch }}>
            <div ref={ref}>
                {children}
                <Renderer ref={rendererRef} />
            </div>
        </PopperContext.Provider>
    );
};

export { EVENTS };
export default PopperProvider;
