import { FC, useRef } from "react";
import { Props } from "../types";
import { Button, SxProps, Theme } from "@mui/material";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const Popover = dynamic(() => import("./Popover"));

const ButtonSx: SxProps<Theme> = {
    borderColor: "divider",
    color: "text.secondary",
};

const YearSelect: FC<Props> = ({ date, onDateChange }) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                sx={ButtonSx}
                onClick={openPopover}
            >
                {date.toLocaleDateString("en-US", {
                    year: "numeric",
                })}
            </Button>

            {isOpen && anchorRef.current ? (
                <Popover
                    anchorEl={anchorRef.current}
                    date={date}
                    onDateChange={onDateChange}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default YearSelect;
