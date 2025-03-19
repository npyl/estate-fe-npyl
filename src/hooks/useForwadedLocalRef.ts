import {
    ForwardedRef,
    HTMLAttributes,
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

    useImperativeHandle(
        ref,
        () => {
            if (!localRef.current) return null as any;

            // IMPORTANT: attach props directly to the DOM element reference without creating a new object
            // (This is important because we do not want to lose the original element's ref)
            if (props) Object.assign(localRef.current, props);

            return localRef.current;
        },
        [props]
    );

    return localRef;
};

export default useForwardedLocalRef;
