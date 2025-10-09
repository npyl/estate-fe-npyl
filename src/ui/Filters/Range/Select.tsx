import useDialog from "@/hooks/useDialog";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popover, { PopoverProps } from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FC, RefObject, useRef } from "react";

//
//  INFO: Why use this custom select instead of MUI's?
//
//  Since we wrap our MenuItems with a container (see Select's <Content />), MUI's select looses the ability to match `value` with a `MenuItem`
//  This polutes jest's console with warnings; plus its wrong anyway!
//

const StyledTextField = styled(TextField)({
    "& .MuiInputBase-input": {
        cursor: "pointer",
    },
});

const StyledPopover = styled(Popover)(({ theme }) => ({
    ".MuiPaper-root": {
        padding: theme.spacing(1),
    },
}));

// INFO: provide a fallback for when inputRef.current is falsy (e.g. during jest with `open` set to true)
const useSafeAnchor = (
    inputRef: RefObject<HTMLInputElement>
): Partial<PopoverProps> =>
    inputRef.current
        ? {
              anchorEl: inputRef.current,
          }
        : {
              anchorReference: "anchorPosition",
              anchorPosition: { top: 0, left: 0 }, // Arbitrary position for tests
          };

interface SelectProps
    extends Omit<
        TextFieldProps<"outlined">,
        "variant" | "onClick" | "InputProps"
    > {
    open?: boolean;
}

const Select: FC<SelectProps> = ({ open = false, children, ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog(open);

    const safeAnchor = useSafeAnchor(inputRef);

    return (
        <>
            <StyledTextField
                ref={inputRef}
                contentEditable={false}
                variant="outlined"
                onClick={openPopover}
                InputProps={{
                    readOnly: true,
                    endAdornment: <ArrowDropDownIcon />,
                }}
                InputLabelProps={{ shrink: Boolean(isOpen || props.value) }}
                {...props}
            />

            <StyledPopover
                open={isOpen}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                {...safeAnchor}
                onClose={closePopover}
            >
                {children}
            </StyledPopover>
        </>
    );
};

export default Select;
