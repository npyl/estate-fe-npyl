import { FC } from "react";
import { SxProps, Theme, Typography, TypographyProps } from "@mui/material";
import { isAllDay } from "../../util";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";

const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString("el-GR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

const DurationSx: SxProps<Theme> = {
    width: "fit-content",
    borderRadius: "15px",
    color: "text.secondary",
    paddingLeft: (theme) => theme.spacing(1),
    paddingRight: (theme) => theme.spacing(1),
};

const getText = (start: string, end: string, t: TranslationType) => {
    if (isAllDay(start, end)) return t("All day");
    return `${formatTime(start)} - ${formatTime(end)}`;
};

interface DurationProps extends TypographyProps {
    start: string;
    end: string;
}

const Duration: FC<DurationProps> = ({ start, end, sx, ...props }) => {
    const { t } = useTranslation();

    const text = getText(start, end, t);

    return (
        <Typography sx={{ ...DurationSx, ...sx }} {...props}>
            {text}
        </Typography>
    );
};

export default Duration;
