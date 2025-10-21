import { useLayoutEffect } from "react";
import { TVersioned } from "@/hooks/useVersioned";
import JSONParseSafe from "@/utils/JSONParseSafe";

// INFO: store injectedValue to localStorage to allow somehow to pass to the external hook!

const INJECTED_VALUE_KEY = "injected-value-key";

const useReadInjected = <T extends object>() => {
    const item = localStorage.getItem(INJECTED_VALUE_KEY);
    return JSONParseSafe<TVersioned<T>>(item);
};

const useWriteInjected = <T extends object>(injectedValue?: TVersioned<T>) => {
    useLayoutEffect(() => {
        if (!injectedValue) return;
        localStorage.setItem(INJECTED_VALUE_KEY, JSON.stringify(injectedValue));
    }, [injectedValue]);
};

export { useReadInjected, useWriteInjected };
