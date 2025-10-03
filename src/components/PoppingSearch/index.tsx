import { ChangeEvent, forwardRef, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import StyledTextField, { StyledSearchProps } from "./StyledTextField";
import AdornmentLeft from "./AdornmentLeft";
import AdornmentRight from "./AdornmentRight";
import Container from "./Container";
import useWaitForStop from "@/hooks/useWaitForStop";

// ------------------------------------------------------------------------------------------

interface TextFieldWithMethodsProps
    extends Omit<StyledSearchProps, "onClick" | "onChange"> {
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

// ------------------------------------------------------------------------------------------

interface PoppingTextFieldProps
    extends Omit<TextFieldWithMethodsProps, "open" | "onOpen" | "onClose"> {}

const PoppingTextField = forwardRef<HTMLInputElement, PoppingTextFieldProps>(
    ({ label: _label, ...props }, ref) => {
        const [isOpen, openSearch, closeSearch] = useDialog();

        const label = isOpen ? _label : "";

        return (
            <Container onClickAway={closeSearch}>
                <TextFieldWithMethods
                    ref={ref}
                    open={isOpen}
                    label={label}
                    onOpen={openSearch}
                    onClose={closeSearch}
                    {...props}
                />
            </Container>
        );
    }
);

PoppingTextField.displayName = "PoppingTextField";

// ------------------------------------------------------------------------------------------

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
