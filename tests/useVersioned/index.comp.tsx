import { FC, useCallback, useState } from "react";
import useVersioned, {
    getVersioned,
    TVersioned,
} from "../../src/hooks/useVersioned";

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
const useStore =
    <T extends object>(injectedValue?: any) =>
    (_: string | null, fallbackValue: T) => {
        const versionedFallback = getVersioned(VERSION_STORED, fallbackValue);

        const [value, setState] = useState(injectedValue ?? versionedFallback);
        const remove = useCallback(
            () => setState(versionedFallback),
            [versionedFallback]
        );
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
    const [value, set, remove] = useVersioned(
        storeKey,
        FALLBACK_VALUE,
        version,
        useStore(injectedValue)
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
