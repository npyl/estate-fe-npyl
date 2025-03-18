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
        () =>
            ({
                ...localRef.current!,
                ...props,
            } as unknown as HTMLAttributes<Base> & Api),
        [props]
    );

    return localRef;
};

export default useForwardedLocalRef;
