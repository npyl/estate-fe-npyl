import { useRef } from "react";

//
//  hook that contains a ref but looks like a useState. Can be used to replace a useState almost without changes
//  WARN: if you want to leverage the perks of the ref,
//          use the last element (ref) instead of the first which is just the value (ref.current)
//

const useRefState = <T>(initialValue: T) => {
    const ref = useRef<T>(initialValue);
    return [
        ref.current,
        (v: T) => {
            ref.current = v;
        },
        // ...
        ref,
    ] as const;
};

export default useRefState;
