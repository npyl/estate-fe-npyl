import { ChangeEvent, forwardRef, useCallback } from "react";
import AdornmentLeft from "./AdornmentLeft";
import AdornmentRight from "./AdornmentRight";
import StyledTextField, { StyledTextFieldProps } from "./StyledTextField";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";

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
        {
            onClear,
            onChange: _onChange,
            onOpen: _onOpen,
            onClose,
            InputProps,
            ...props
        },
        ref
    ) => {
        // Open & Focus
        const [localRef, { onRef }] = useForwardedLocalRef(ref);
        const onOpen = useCallback(() => {
            _onOpen();
            localRef.current?.focus();
        }, []);

        // Simplify onChange
        const onChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => _onChange?.(e.target.value),
            [_onChange]
        );

        return (
            <StyledTextField
                ref={onRef}
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
