import CloseIcon from "@mui/icons-material/Close";
import getBorderColor from "@/theme/borderColor";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";
import { FC } from "react";

const ClearButtonSx: SxProps<Theme> = {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "1px solid",
    borderColor: getBorderColor,
    "& svg": {
        fontSize: "1.1rem",
        transform: "scale(0.8)",
    },
};

interface Props {
    onClick: VoidFunction;
}

const ClearButton: FC<Props> = ({ onClick }) => (
    <IconButton onClick={onClick} sx={ClearButtonSx}>
        <CloseIcon />
    </IconButton>
);

export default ClearButton;
