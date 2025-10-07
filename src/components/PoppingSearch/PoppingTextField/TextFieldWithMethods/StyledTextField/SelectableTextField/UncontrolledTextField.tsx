import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef, RefObject, useLayoutEffect } from "react";

// INFO: clear input's value since we are *actually* uncontrolled
const clearInput = (localRef: RefObject<HTMLInputElement>) => {
    const el = localRef.current;
    if (!el) return;
    el.value = "";
};

interface UncontrolledTextFieldProps
    extends Omit<TextFieldProps<"outlined">, "variant" | "inputRef"> {
    open: boolean;
}

const UncontrolledTextField = forwardRef<
    HTMLInputElement,
    UncontrolledTextFieldProps
>(
    (
        {
            value, // INFO: Make sure we prevent the textfield from being "controlled" (ignore `value`)
            ...props
        },
        ref
    ) => {
        const [localRef, { onRef }] = useForwardedLocalRef(ref);

        useLayoutEffect(() => {
            if (value) return;
            clearInput(localRef);
        }, [value]);

        return (
            <TextField
                inputRef={onRef} // INFO: on a MUI TextField only `inputRef` is relevant; `ref` comes from styled()'s default behaviour
                {...props}
            />
        );
    }
);

UncontrolledTextField.displayName = "UncontrolledTextField";

export type { UncontrolledTextFieldProps };
export default UncontrolledTextField;
