import { forwardRef } from "react";
import useDialog from "@/hooks/useDialog";
import Container from "./Container";
import TextFieldWithMethods, {
    TextFieldWithMethodsProps,
} from "./TextFieldWithMethods";

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

export type { PoppingTextFieldProps };
export default PoppingTextField;
