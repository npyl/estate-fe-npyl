import { InputBase, InputBaseProps, SxProps, Theme } from "@mui/material";
import { FC } from "react";

// ---------------------------------------------------------------------------

const DescriptionSx: SxProps<Theme> = {
    px: 1,
    height: "100%",
    bgcolor: (theme) =>
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[700],
    borderRadius: "5px",
};

// ---------------------------------------------------------------------------

const Description: FC<InputBaseProps> = (props) => (
    <InputBase sx={DescriptionSx} multiline rows={5} {...props} />
);

export default Description;
