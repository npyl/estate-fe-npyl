import { FC, ReactNode, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ButtonGroup, { ButtonGroupProps } from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import useDialog from "@/hooks/useDialog";
import { Popover, PopoverProps } from "@mui/material";

interface OptionButtonProps extends ButtonGroupProps {
    options: ReactNode;
    popoverProps?: Omit<PopoverProps, "open">;
}

const OptionButton: FC<OptionButtonProps> = ({
    children,
    options,
    popoverProps,
    ...props
}) => {
    const [isOpen, openPopper, closePopper] = useDialog();
    const anchorRef = useRef(null);

    return (
        <>
            <ButtonGroup {...props}>
                {children}

                <Button ref={anchorRef} size="small" onClick={openPopper}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            {isOpen ? (
                <Popover
                    open
                    anchorEl={anchorRef.current}
                    disablePortal
                    onClose={closePopper}
                    {...popoverProps}
                >
                    {options}
                </Popover>
            ) : null}
        </>
    );
};

export default OptionButton;
