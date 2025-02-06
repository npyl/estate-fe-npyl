import { useFormContext, useWatch } from "react-hook-form";
import ColorBox, { ColorBoxProps } from "../Box";
import { SxProps, Theme } from "@mui/material";
import { FC, useCallback } from "react";
import { TCalendarColor } from "@/components/Calendar/types";

const getBoxSx = (isSelected: boolean): SxProps<Theme> => ({
    border: "2px solid",
    borderColor: isSelected ? "info.main" : "transparent",
    cursor: "pointer",
    "&:hover": {
        borderColor: "info.main",
    },
});

interface Props extends ColorBoxProps {
    c: TCalendarColor;
}

const RHFColorBox: FC<Props> = ({ c: { id, color }, ...props }) => {
    const colorId = useWatch({ name: "colorId" });
    const isSelected = id === colorId;

    const { setValue } = useFormContext();
    const handleClick = useCallback(
        () => setValue("colorId", id, { shouldDirty: true }),
        []
    );

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
