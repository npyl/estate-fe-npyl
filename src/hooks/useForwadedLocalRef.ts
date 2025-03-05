import { ForwardedRef, useImperativeHandle, useRef } from "react";

/**
 * This hook makes allows us to use a local ref and forward it as the `ref` of forwardRef()
 *
 * @param ref a forwarded ref coming from forwardRef()
 * @param initialValue initial value for local ref object (e.g. usually null)
 * @returns local ref object
 */
const useForwardedLocalRef = <T extends any>(
    ref: ForwardedRef<T>,
    initialValue: T | null = null
) => {
    const localRef = useRef<T>(initialValue);

    useImperativeHandle(ref, () => localRef.current!);

    return localRef;
};

export default useForwardedLocalRef;
