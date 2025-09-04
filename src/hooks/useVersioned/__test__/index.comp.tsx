import { FC, useCallback, useLayoutEffect, useState } from "react";
import useVersioned, { getVersioned, TVersioned } from "@/hooks/useVersioned";

import "@/_private/JSON";
import { useReadInjected, useWriteInjected } from "./useInjected";

type TValue = {
    an: string;
    for: string;
};

const storeKey = "a-simple-key";

const FALLBACK_VALUE: TValue = {
    an: "object",
    for: "reference",
};
const SPECIFIC_VALUE: TValue = {
    an: "object2",
    for: "reference2",
};

const VALUE_ID = "value-test-id";
const SET_VALUE_ID = "set-test-id";
const REMOVE_VALUE_ID = "remove-test-id";

const VERSION_STORED = 1;

/**
 * Store w/ injected value support
 */
const useStore = <T extends object>(
    _: string | null,
    fallbackValue: TVersioned<T>
) => {
    const injectedValue = useReadInjected<T>();
    const [value, setState] = useState(injectedValue ?? fallbackValue);
    const remove = useCallback(() => setState(fallbackValue), [fallbackValue]);
    return [value, setState, remove] as const;
};

interface TesterProps {
    injectedValue?: TVersioned<TValue>;
    version?: number;
}

const Tester: FC<TesterProps> = ({
    injectedValue,
    version = VERSION_STORED,
}) => {
    useWriteInjected(injectedValue);

    const [value, set, remove] = useVersioned(
        storeKey,
        FALLBACK_VALUE,
        version,
        useStore
    );
    const setValue = useCallback(() => set(SPECIFIC_VALUE), []);
    return (
        <div>
            <button data-testid={SET_VALUE_ID} onClick={setValue} />
            <button data-testid={REMOVE_VALUE_ID} onClick={remove} />
            <div data-testid={VALUE_ID}>{JSON.stringify(value)}</div>
        </div>
    );
};

export {
    VALUE_ID,
    SET_VALUE_ID,
    REMOVE_VALUE_ID,
    // ...
    FALLBACK_VALUE,
    SPECIFIC_VALUE,
    VERSION_STORED,
    // ...
    getVersioned,
};
export default Tester;
