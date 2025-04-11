import {
    ForwardedRef,
    HTMLAttributes,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";

/**
 * This hook makes allows us to use a local ref and forward it as the `ref` of forwardRef()
 *
 * @param ref a forwarded ref coming from forwardRef()
 * @returns local ref object
 */
const useForwardedLocalRef = <
    Base extends HTMLElement = HTMLElement,
    Api extends object | undefined = undefined
>(
    ref: ForwardedRef<HTMLAttributes<Base> & Api>,
    props?: Api
) => {
    const localRef = useRef<Base>(null);

    // Create a callback ref that updates both the forwarded ref and local ref
    const onRef = useCallback(
        (node: Base | null) => {
            // Update local ref
            if (localRef.current !== node) {
                localRef.current = node;
            }

            // Update forwarded ref if it's a function
            if (typeof ref === "function") {
                ref(node);
            }
            // Update forwarded ref if it's an object
            else if (ref) {
                ref.current = node;
            }
        },
        [ref]
    );

    return [localRef, { onRef }] as const;
};

export default useForwardedLocalRef;
