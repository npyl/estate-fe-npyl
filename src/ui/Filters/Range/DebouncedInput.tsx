import { FC, useCallback, useState } from "react";
import OnlyNumbersInput, {
    OnlyNumbersInputProps,
} from "@/components/OnlyNumbers";
import useWaitForStop from "@/hooks/useWaitForStop";

interface DebouncedInputProps
    extends Omit<OnlyNumbersInputProps, "value" | "onChange"> {
    value?: number;
    setter: any;
}

const DebouncedInput: FC<DebouncedInputProps> = ({
    value: _value,
    setter,
    ...props
}) => {
    const [value, setValue] = useState(_value?.toString() ?? "");

    const onLocalChange = useCallback((v: string) => {
        setValue(v ?? "");
        return v;
    }, []);

    const onStop = useCallback((v: string) => () => setter(v ?? ""), [setter]);

    const onChange = useWaitForStop(onLocalChange, onStop, 300);

    return <OnlyNumbersInput value={value} onChange={onChange} {...props} />;
};

export default DebouncedInput;
