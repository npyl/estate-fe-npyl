import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import OnlyNumbersInput, {
    OnlyNumbersInputProps,
} from "@/components/OnlyNumbers";
import useWaitForStop from "@/hooks/useWaitForStop";

interface DebouncedInputRef {
    setValue: (s: string) => void;
    clear: VoidFunction;
}

interface DebouncedInputProps
    extends Omit<OnlyNumbersInputProps, "value" | "onChange"> {
    value?: number;
    setter: (s: string) => void;
}

const DebouncedInput = forwardRef<DebouncedInputRef, DebouncedInputProps>(
    ({ value: _value, setter, ...props }, ref) => {
        const [value, setValue] = useState(_value?.toString() ?? "");

        // ----------------------------------------------------------------------------------

        const onLocalChange = useCallback((v: string) => {
            setValue(v ?? "");
            return v;
        }, []);

        const onStop = useCallback(
            (v: string) => () => setter(v ?? ""),
            [setter]
        );

        const onChange = useWaitForStop(onLocalChange, onStop, 300);

        // ----------------------------------------------------------------------------------

        const clear = useCallback(() => setValue(""), []);
        useImperativeHandle(ref, () => ({ setValue, clear }), []);

        return (
            <OnlyNumbersInput value={value} onChange={onChange} {...props} />
        );
    }
);

DebouncedInput.displayName = "DebouncedInput";

export type { DebouncedInputRef };
export default DebouncedInput;
