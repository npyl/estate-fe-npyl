import { FC, useCallback, useState } from "react";
import useCallbackSetter from "../src/hooks/useCallbackSetter";
import React from "react";

// ----------------------------------------------------------------------------

const VALUE_LEVEL2_ID = "value-level2";
const TEST_LEVEL2_ID = "level2-test-id";

interface LeveledProps {
    displayValue: string;
}

const getLevel2 = (s: string) => `${s}_level2`;

const Leveled: FC<LeveledProps> = ({ displayValue }) => {
    const [level2, _setLevel2] = useState(getLevel2(displayValue));
    const setLevel2 = useCallbackSetter(level2, _setLevel2);

    const onClick = useCallback(
        () => setLevel2((old) => `${old}_123`),
        [setLevel2]
    );

    return (
        <div>
            <div data-testid={VALUE_LEVEL2_ID}>{level2}</div>
            <button data-testid={TEST_LEVEL2_ID} onClick={onClick} />
        </div>
    );
};

// ----------------------------------------------------------------------------

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

            <Leveled displayValue={displayValue} />
        </div>
    );
};

export {
    VALUE_ID,
    SET_DIRECT_ID,
    SET_CALLBACK_ID,
    SET_MULTIPLE_ID,

    // ...
    getLevel2,
    VALUE_LEVEL2_ID,
    TEST_LEVEL2_ID,
};
export default Tester;
