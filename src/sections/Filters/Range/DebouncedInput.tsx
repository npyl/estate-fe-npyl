import { FC, useCallback, useEffect, useState } from "react";
import OnlyNumbersInput, {
    OnlyNumbersInputProps,
} from "@/components/OnlyNumbers";
import { useDebouncedCallback } from "use-debounce";

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
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(_value ? _value.toString() : "");
    }, [_value]);

    const debouncedChange = useDebouncedCallback((v: string) => {
        setter(v);
    }, 300);

    const handleChange = useCallback((v: string) => {
        let newValue = v;

        if (!newValue) {
            debouncedChange("");
            setValue("");
        } else {
            debouncedChange(newValue);
            setValue(newValue);
        }
    }, []);

    return (
        <OnlyNumbersInput value={value} onChange={handleChange} {...props} />
    );
};

export default DebouncedInput;
