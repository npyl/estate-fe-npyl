import { useCallback, useState } from "react";
import useCallbackSetter from "../../src/hooks/useCallbackSetter";

// ----------------------------------------------------------------------------

const VALUE_LEVEL2_ID = "value-level2";
const TEST_LEVEL2_ID = "level2-test-id";
const UPDATE_LEVEL2_ID = "update-level2-id";

const Leveled = () => {
    const [level0, _setLevel0] = useState({
        field0: {
            field0_1: [1, 2, 3],
        },
    });
    const setLevel0 = useCallbackSetter(level0, _setLevel0);

    const field0_1 = level0.field0.field0_1;
    const _setField0_1 = useCallback(
        (field0_1: number[]) =>
            setLevel0((old) => ({
                ...old,
                field0: { ...old.field0, field0_1 },
            })),
        []
    );
    const setField0_1 = useCallbackSetter(field0_1, _setField0_1);

    const onUpdate = useCallback(() => {
        setLevel0((old) => ({
            ...old,
            field0: {
                ...old.field0,
                field0_1: [1, 2, 3, 4],
            },
        }));
    }, []);

    const onClick = useCallback(() => {
        setField0_1((old) => [...old, 5]);
    }, []);

    return (
        <div>
            <div data-testid={VALUE_LEVEL2_ID}>{JSON.stringify(field0_1)}</div>
            <button data-testid={UPDATE_LEVEL2_ID} onClick={onUpdate} />
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

            <Leveled />
        </div>
    );
};

export {
    VALUE_ID,
    SET_DIRECT_ID,
    SET_CALLBACK_ID,
    SET_MULTIPLE_ID,

    // ...
    VALUE_LEVEL2_ID,
    UPDATE_LEVEL2_ID,
    TEST_LEVEL2_ID,
};
export default Tester;
