import { useCallback, useState } from "react";
import useCallbackSetter from "../src/hooks/useCookie/useCallbackSetter";
import React from "react";

const VALUE_ID = "value";
const SET_DIRECT_ID = "set-direct";
const SET_CALLBACK_ID = "set-callback";
const SET_MULTIPLE_ID = "set-multiple";

const Tester = () => {
    const [displayValue, setDisplayValue] = useState<string>("initial");
    const setter = useCallbackSetter(displayValue, setDisplayValue);

    const direct = useCallback(() => setter("direct update"), []);
    const callback = useCallback(
        () => setter((prev) => `${prev} with callback`),
        []
    );
    const multiple = useCallback(() => {
        setter("test");
        setter((prev) => `${prev} then second`);
    }, []);

    return (
        <div>
            <div data-testid={VALUE_ID}>{displayValue}</div>
            <button data-testid={SET_DIRECT_ID} onClick={direct} />
            <button data-testid={SET_CALLBACK_ID} onClick={callback} />
            <button data-testid={SET_MULTIPLE_ID} onClick={multiple} />
        </div>
    );
};

export { VALUE_ID, SET_DIRECT_ID, SET_CALLBACK_ID, SET_MULTIPLE_ID };
export default Tester;
