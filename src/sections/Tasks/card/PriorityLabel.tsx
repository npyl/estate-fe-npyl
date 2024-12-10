import { SxProps, Theme } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { getTaskBgcolor, getTaskColor } from "@/sections/Tasks/styled";

const getLabel = (p: number) => (p === 0 ? "low" : p === 1 ? "medium" : "high");

const getSx = (p: number): SxProps<Theme> => ({
    backgroundColor: getTaskBgcolor(p),
    color: getTaskColor(p),
    borderRadius: "16px",
    px: 1,
    whiteSpace: "nowrap",
    width: "fit-content",
    height: "fit-content",
});

interface PriorityLabelProps extends TypographyProps {
    priority: number;
}

const PriorityLabel: FC<PriorityLabelProps> = ({ priority, ...props }) => {
    const { t } = useTranslation();
    return (
        <Typography sx={getSx(priority)} {...props}>
            {t(getLabel(priority))}
        </Typography>
    );
};

export default PriorityLabel;
