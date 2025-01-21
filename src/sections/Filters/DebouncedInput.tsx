import { FC, useCallback, useEffect, useState } from "react";
import { RootState, useDispatch, useSelector } from "src/store";
import OnlyNumbersInput, {
    OnlyNumbersInputProps,
} from "@/components/OnlyNumbers";
import { useDebouncedCallback } from "use-debounce";

interface DebouncedInputProps
    extends Omit<OnlyNumbersInputProps, "value" | "onChange"> {
    selector: (s: RootState) => number | undefined;
    setter: any;
}

const DebouncedInput: FC<DebouncedInputProps> = ({
    defaultValue,
    selector,
    setter,
    ...props
}) => {
    const dispatch = useDispatch();

    const actualValue = useSelector(selector);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(actualValue ? actualValue.toString() : "");
    }, [actualValue]);

    const debouncedChange = useDebouncedCallback((v: string) => {
        dispatch(setter(v));
    }, 300);

    const handleChange = useCallback((v: string) => {
        let newValue = v;
        if (newValue === "") {
            debouncedChange("");
            setValue("");
        } else {
            debouncedChange(newValue);
            setValue(newValue);
        }
    }, []);

    return (
        <OnlyNumbersInput
            // max="10000000"
            value={value}
            onChange={handleChange}
            {...props}
        />
    );
};

export default DebouncedInput;
