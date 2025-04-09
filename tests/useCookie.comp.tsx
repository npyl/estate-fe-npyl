import { useCallback } from "react";
import useCookie from "../src/hooks/useCookie";
import React from "react";

const VALUE_ID = "value";

const SET_DIRECT_ID = "set-direct";
const SET_CALLBACK_ID = "set-callback";
const SET_MULTIPLE_ID = "set-multiple";

const COOKIE_REMOVE_ID = "cookie-remove-id";

const cookieName = "test-cookie";

const Tester = () => {
    const [cookie, setCookie, removeCookie] = useCookie<string>(
        cookieName,
        "initial"
    );

    const direct = useCallback(() => setCookie("direct update"), []);
    const callback = useCallback(
        () => setCookie((prev) => `${prev} with callback`),
        []
    );
    const multiple = useCallback(() => {
        setCookie("test");
        setCookie((prev) => `${prev} then second`);
    }, []);

    const remove = useCallback(() => {
        removeCookie();
    }, []);

    return (
        <div>
            <div data-testid={VALUE_ID}>{cookie}</div>
            <button data-testid={SET_DIRECT_ID} onClick={direct} />
            <button data-testid={SET_CALLBACK_ID} onClick={callback} />
            <button data-testid={SET_MULTIPLE_ID} onClick={multiple} />
            {/* ... */}
            <button data-testid={COOKIE_REMOVE_ID} onClick={remove} />
        </div>
    );
};

export {
    VALUE_ID,
    SET_DIRECT_ID,
    SET_CALLBACK_ID,
    SET_MULTIPLE_ID,
    // ..
    COOKIE_REMOVE_ID,
};
export default Tester;
