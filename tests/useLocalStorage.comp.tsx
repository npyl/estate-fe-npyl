import { useCallback } from "react";
import useLocalStorage from "../src/hooks/useLocalStorage";
import React from "react";

const VALUE_ID = "value";

const SET_DIRECT_ID = "set-direct";
const SET_CALLBACK_ID = "set-callback";
const SET_MULTIPLE_ID = "set-multiple";

const ITEM_REMOVE_ID = "item-remove-id";

const itemName = "test-item";

const Tester = () => {
    const [item, setItem, removeItem] = useLocalStorage<string>(
        itemName,
        "initial"
    );

    const direct = useCallback(() => setItem("direct update"), []);
    const callback = useCallback(
        () => setItem((prev) => `${prev} with callback`),
        []
    );
    const multiple = useCallback(() => {
        setItem("test");
        setItem((prev) => `${prev} then second`);
    }, []);

    const remove = useCallback(() => {
        removeItem();
    }, []);

    return (
        <div>
            <div data-testid={VALUE_ID}>{item}</div>
            <button data-testid={SET_DIRECT_ID} onClick={direct} />
            <button data-testid={SET_CALLBACK_ID} onClick={callback} />
            <button data-testid={SET_MULTIPLE_ID} onClick={multiple} />
            {/* ... */}
            <button data-testid={ITEM_REMOVE_ID} onClick={remove} />
        </div>
    );
};

export {
    itemName,
    // ...
    VALUE_ID,
    SET_DIRECT_ID,
    SET_CALLBACK_ID,
    SET_MULTIPLE_ID,
    // ..
    ITEM_REMOVE_ID,
};
export default Tester;
