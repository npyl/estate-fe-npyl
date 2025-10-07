import { ChangeEvent, forwardRef, useCallback } from "react";
import AdornmentLeft from "./AdornmentLeft";
import AdornmentRight from "./AdornmentRight";
import StyledTextField, { StyledTextFieldProps } from "./StyledTextField";

interface TextFieldWithMethodsProps
    extends Omit<StyledTextFieldProps, "onClick" | "onChange"> {
    onClear: VoidFunction;
    onChange: (s: string) => void;

    onOpen: VoidFunction;
    onClose: VoidFunction;
}

const TextFieldWithMethods = forwardRef<
    HTMLInputElement,
    TextFieldWithMethodsProps
>(
    (
        { onClear, onChange: _onChange, onOpen, onClose, InputProps, ...props },
        ref
    ) => {
        const onChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => _onChange?.(e.target.value),
            [_onChange]
        );

        return (
            <StyledTextField
                ref={ref}
                InputProps={{
                    ...InputProps,
                    startAdornment: <AdornmentLeft />,
                    endAdornment: props.open ? (
                        <AdornmentRight onClear={onClear} onClose={onClose} />
                    ) : null,
                }}
                onClick={onOpen}
                onChange={onChange}
                {...props}
            />
        );
    }
);

TextFieldWithMethods.displayName = "TextFieldWithMethods";

export type { TextFieldWithMethodsProps };
export default TextFieldWithMethods;
