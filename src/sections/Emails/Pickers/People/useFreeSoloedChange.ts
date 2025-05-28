import { useCallback } from "react";

const isEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const useFreeSoloedChange = (
    peopleFreeSoloed: string[],
    _onFreeSoloed: (v: string[]) => void
) => {
    const onFreeSoloed = useCallback(
        (v: string) => {
            if (!v || !isEmail(v)) return;
            const values = [...peopleFreeSoloed, v];
            _onFreeSoloed(values);
        },
        [peopleFreeSoloed, _onFreeSoloed]
    );

    return onFreeSoloed;
};

export default useFreeSoloedChange;
