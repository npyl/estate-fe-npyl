import { ForwardedRef, useCallback, useRef } from "react";

/**
 * This hook allows us to use a local ref and forward it as the `ref` of forwardRef()
 * It works with both function and object refs
 *
 * @param ref a forwarded ref coming from forwardRef()
 * @returns tuple of [localRef, { onRef }] to be used in your component
 */
const useForwardedLocalRef = <
    Base extends object = object,
    More extends any = any,
>(
    ref: ForwardedRef<Base>,
    more?: More
) => {
    const localRef = useRef<Base | null>(null);

    // Create a callback ref that updates both the forwarded ref and local ref
    const onRef = useCallback(
        (node: Base | null) => {
            // Update local ref
            localRef.current = node;

            // IMPORTANT: attach props directly to the DOM element reference without creating a new object
            // (This is important because we do not want to lose the original element's ref)
            if (localRef.current && more) Object.assign(localRef.current, more);

            if (typeof ref === "function") {
                ref(node);
            } else if (ref && "current" in ref) {
                ref.current = node;
            }
        },
        [ref, more]
    );

    return [localRef, { onRef }] as const;
};

export default useForwardedLocalRef;
