import useDialog from "@/hooks/useDialog";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FC, useRef } from "react";

const StyledTextField = styled(TextField)({
    ".MuiBaseInput-root": {
        cursor: "pointer",
    },
});

const StyledPopover = styled(Popover)(({ theme }) => ({
    ".MuiPaper-root": {
        padding: theme.spacing(1),
    },
}));

interface SelectProps
    extends Omit<TextFieldProps<"outlined">, "variant" | "onClick"> {
    open?: boolean;
}

const Select: FC<SelectProps> = ({ open = false, children, ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog(open);

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
                anchorEl={inputRef.current}
                onClose={closePopover}
            >
                {children}
            </StyledPopover>
        </>
    );
};

export default Select;
