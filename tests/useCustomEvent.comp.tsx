import { FC, RefObject, useCallback, useRef, useState } from "react";
import useCustomEvent, { TCb } from "../src/hooks/useCustomEvent";
import React from "react";

// ----------------------------------------------------------------

const DISPATCH_BTN0_ID = "dispatch-btn0-id";
const DISPATCH_BTN1_ID = "dispatch-btn1-id";
const VALUE0_ID = "value0-id";
const VALUE1_ID = "value1-id";

const INITIAL = "initial";
const FINAL = "hello";

// ----------------------------------------------------------------

interface TestEventData {
    s: string;
}

interface Params {
    onEvent?: TCb<TestEventData>;
    targetRef?: RefObject<HTMLDivElement | null>;
}
const useEvent = ({
    onEvent = (d) => {},
    targetRef = React.createRef(),
}: Params) => useCustomEvent<TestEventData>("TestEvent", onEvent, targetRef);

/**
 * Listens for global event (on body)
 */
const Listener0 = () => {
    const [str, setStr] = useState(INITIAL);
    const onEvent = useCallback(
        ({ detail }: CustomEventInit<TestEventData>) => setStr(detail?.s || ""),
        []
    );

    const [_, useListener] = useEvent({ onEvent });
    useListener();

    return <div data-testid={VALUE0_ID}>{str}</div>;
};

/**
 * Listens for event on targeted element (targetRef)
 */
interface Listener1Props {
    targetRef: RefObject<HTMLDivElement | null>;
}

const Listener1: FC<Listener1Props> = ({ targetRef }) => {
    const [str, setStr] = useState(INITIAL);
    const onEvent = useCallback(
        ({ detail }: CustomEventInit<TestEventData>) => setStr(detail?.s || ""),
        []
    );

    const [_, useListener] = useEvent({ targetRef, onEvent });
    useListener();

    return <div data-testid={VALUE1_ID}>{str}</div>;
};

// ----------------------------------------------------------------

const Tester = () => {
    const [useDispatcher0] = useEvent({});
    const d0 = useDispatcher0();

    const targetRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setOpen] = useState(false);
    const onRef = useCallback((el: HTMLDivElement | null) => {
        if (!el) return;
        targetRef.current = el;
        setOpen(true);
    }, []);
    const [useDispatcher1] = useEvent({ targetRef });
    const d1 = useDispatcher1();

    const onClick0 = useCallback(() => d0.dispatch({ s: FINAL }), []);
    const onClick1 = useCallback(() => d1.dispatch({ s: FINAL }), []);

    return (
        <div>
            <button data-testid={DISPATCH_BTN0_ID} onClick={onClick0} />
            <button data-testid={DISPATCH_BTN1_ID} onClick={onClick1} />

            <Listener0 />

            <div ref={onRef}>
                {isOpen ? <Listener1 targetRef={targetRef} /> : null}
            </div>
        </div>
    );
};

export {
    DISPATCH_BTN0_ID,
    DISPATCH_BTN1_ID,
    VALUE0_ID,
    VALUE1_ID,
    INITIAL,
    FINAL,
};
export default Tester;
