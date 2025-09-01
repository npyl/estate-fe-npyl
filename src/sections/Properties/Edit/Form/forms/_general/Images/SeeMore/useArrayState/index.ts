import { useCallback, useState } from "react";

//
//  Easily define array states with reset method
//  This is particularly useful when reseting with [].
//  Remember two same empty arrays ([]) can have different references => appear different
//

const useArrayState = <T extends any[]>(initialValue: T) => {
    const [INITIAL_ARRAY] = useState<T>(initialValue);
    const [state, setState] = useState<T>(initialValue);
    const resetState = useCallback(() => setState(INITIAL_ARRAY), []);
    return [state, setState, resetState] as const;
};

export default useArrayState;
