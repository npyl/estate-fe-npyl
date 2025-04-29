import { useCallback } from "react";
import useLocalStorage from "../src/hooks/useLocalStorage";
import useCallbackSetter from "../src/hooks/useCallbackSetter";
import React from "react";

const itemName = "item-key";

type TLeveled = {
    field0: {
        field0_1: number[];
    };
};

const VALUE_LEVEL2_ID = "value-level2";
const TEST_LEVEL2_ID = "level2-test-id";
const UPDATE_LEVEL2_ID = "update-level2-id";

const Leveled = () => {
    const [level0, setLevel0] = useLocalStorage<TLeveled>(itemName, {
        field0: {
            field0_1: [1, 2, 3],
        },
    });

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

export { itemName, VALUE_LEVEL2_ID, TEST_LEVEL2_ID, UPDATE_LEVEL2_ID };
export default Leveled;
