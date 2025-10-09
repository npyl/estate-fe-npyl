import { useWatch } from "react-hook-form";
import ColorBox, { ColorBoxProps } from "../Box";
import { SxProps, Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { TCalendarColor } from "@/components/Calendar/types";
import { CalendarEventReq } from "@/types/calendar";

const getBoxSx = (isSelected: boolean): SxProps<Theme> => ({
    border: "2px solid",
    borderColor: isSelected ? "info.main" : "transparent",
    cursor: "pointer",
    "&:hover": {
        borderColor: "info.main",
    },
});

interface Props extends Omit<ColorBoxProps, "onClick"> {
    c: TCalendarColor;
    onClick: (colorId: string) => void;
}

const RHFColorBox: FC<Props> = ({ c: { id, color }, onClick, ...props }) => {
    const colorId = useWatch<CalendarEventReq>({ name: "colorId" });
    const isSelected = id === colorId;
    const handleClick = useCallback(() => onClick(id), [id, onClick]);
    return (
        <ColorBox
            sx={getBoxSx(isSelected)}
            bgcolor={color}
            onClick={handleClick}
            {...props}
        />
    );
};

export default RHFColorBox;
