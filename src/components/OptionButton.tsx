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
            <ButtonGroup>
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
                    anchorOrigin={{
                        horizontal: "center",
                        vertical: "bottom",
                    }}
                    onClose={closePopper}
                >
                    {options}
                </Popover>
            ) : null}
        </>
    );
};

export default OptionButton;
