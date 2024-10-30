import { FC } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface DateInfoProps extends Omit<TypographyProps, "children"> {
    date: string;
}

const DateInfo: FC<DateInfoProps> = ({ date, ...props }) => {
    const { i18n } = useTranslation();

    const locale = i18n.language === "en" ? "en-US" : "el-GR";

    return (
        <Typography
            color="text.secondary"
            fontSize="11px"
            textAlign="center"
            {...props}
        >
            {new Date(date).toLocaleDateString(locale, {
                weekday: "short",
                day: "numeric",
            })}
        </Typography>
    );
};

export default DateInfo;
