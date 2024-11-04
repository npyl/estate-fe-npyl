import { FC, ReactNode, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ButtonGroup, { ButtonGroupProps } from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import useDialog from "@/hooks/useDialog";
import { Popover } from "@mui/material";

interface OptionButtonProps extends ButtonGroupProps {
    options: ReactNode;
}

const OptionButton: FC<OptionButtonProps> = ({ children, options }) => {
    const [isOpen, openPopper, closePopper] = useDialog();
    const anchorRef = useRef(null);

    return (
        <>
            <ButtonGroup variant="contained" ref={anchorRef}>
                {children}

                <Button size="small" onClick={openPopper}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            {isOpen ? (
                <Popover
                    open
                    anchorEl={anchorRef.current}
                    disablePortal
                    onClick={closePopper}
                    onClose={closePopper}
                >
                    {options}
                </Popover>
            ) : null}
        </>
    );
};

export default OptionButton;
