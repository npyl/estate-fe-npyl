import { IconButton } from "@mui/material";
import useDialog from "@/hooks/useDialog";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { FC, useRef } from "react";
import Popover, { PopoverProps } from "./Popover";

interface MoreButtonProps extends Omit<PopoverProps, "anchorEl" | "onClose"> {}

const MoreButton: FC<MoreButtonProps> = (props) => {
    const anchorRef = useRef(null);

    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <IconButton ref={anchorRef} size="small" onClick={openPopover}>
                <MoreVertOutlinedIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    {...props}
                />
            ) : null}
        </>
    );
};

export default MoreButton;
