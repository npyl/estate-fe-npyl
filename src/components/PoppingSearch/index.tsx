import { forwardRef, useCallback } from "react";
import useWaitForStop from "@/hooks/useWaitForStop";
import PoppingTextField, { PoppingTextFieldProps } from "./PoppingTextField";

const STANDARD_DELAY = 300;

const noOp = (s: string) => s;

interface PoppingSearchProps extends PoppingTextFieldProps {
    delay?: number;
}

const PoppingSearch = forwardRef<HTMLInputElement, PoppingSearchProps>(
    ({ delay = STANDARD_DELAY, onChange: _onChange, ...props }, ref) => {
        const wrappedOnChange = useCallback(
            (s: string) => () => _onChange(s),
            [_onChange]
        );

        const onChange = useWaitForStop(noOp, wrappedOnChange, STANDARD_DELAY);

        return <PoppingTextField ref={ref} onChange={onChange} {...props} />;
    }
);

PoppingSearch.displayName = "PoppingSearch";

export default PoppingSearch;
