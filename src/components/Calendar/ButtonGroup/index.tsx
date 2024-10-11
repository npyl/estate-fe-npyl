import IconButton from "@mui/material/IconButton";
import { FC, useRef } from "react";
import { ViewButtonGroupProps } from "@/components/BaseCalendar/types";
import MenuIcon from "@mui/icons-material/Menu";
import useDialog from "@/hooks/useDialog";
import { IconButtonSx } from "../styles";
import dynamic from "next/dynamic";
const Popover = dynamic(() => import("./Popover"));

const CalendarButtonGroup: FC<ViewButtonGroupProps> = ({
    view,
    onViewChange,
}) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openGroup, closeGroup] = useDialog();

    return (
        <>
            <IconButton ref={anchorRef} sx={IconButtonSx} onClick={openGroup}>
                <MenuIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover
                    anchorEl={anchorRef.current}
                    view={view}
                    onViewChange={onViewChange}
                    onClose={closeGroup}
                />
            ) : null}
        </>
    );
};

export default CalendarButtonGroup;
