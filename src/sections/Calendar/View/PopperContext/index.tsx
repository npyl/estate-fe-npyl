import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useRef,
} from "react";
import Renderer, { RendererRef } from "./Renderer";
import { TCalendarEvent } from "@/components/Calendar/types";

type IState = {
    setEvent: (el: HTMLDivElement, v: TCalendarEvent) => void;
    setStartDate: (el: HTMLDivElement, v: string) => void;
};

const PopperContext = createContext<IState | undefined>(undefined);

export const usePopperContext = () => {
    const context = useContext(PopperContext);
    if (context === undefined) {
        throw new Error(
            "PopperContext value is undefined. Make sure you use the PopperContext before using the context."
        );
    }
    return context;
};

const PopperProvider: FC<PropsWithChildren> = ({ children }) => {
    const rendererRef = useRef<RendererRef>(null);

    const setEvent = useCallback(
        (el: HTMLDivElement, v: TCalendarEvent) =>
            rendererRef.current?.setEvent(el, v),
        []
    );
    const setStartDate = useCallback(
        (el: HTMLDivElement, v: string) =>
            rendererRef.current?.setStartDate(el, v),
        []
    );

    return (
        <PopperContext.Provider
            value={{
                setEvent,
                setStartDate,
            }}
        >
            {children}
            <Renderer ref={rendererRef} />
        </PopperContext.Provider>
    );
};

export default PopperProvider;
