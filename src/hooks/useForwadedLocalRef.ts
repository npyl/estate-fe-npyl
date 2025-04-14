import { ForwardedRef, useCallback, useRef } from "react";

/**
 * This hook allows us to use a local ref and forward it as the `ref` of forwardRef()
 * It works with both function and object refs
 *
 * @param ref a forwarded ref coming from forwardRef()
 * @returns tuple of [localRef, { ref callback }] to be used in your component
 */
const useForwardedLocalRef = <Base extends HTMLElement = HTMLElement>(
    ref: ForwardedRef<Base>
) => {
    const localRef = useRef<Base | null>(null);

    // Create a callback ref that updates both the forwarded ref and local ref
    const onRef = useCallback(
        (node: Base | null) => {
            // Update local ref
            localRef.current = node;

            if (typeof ref === "function") {
                ref(node);
            } else if (ref && "current" in ref) {
                ref.current = node;
            }
        },
        [ref]
    );

    return [localRef, { onRef }] as const;
};

export default useForwardedLocalRef;
