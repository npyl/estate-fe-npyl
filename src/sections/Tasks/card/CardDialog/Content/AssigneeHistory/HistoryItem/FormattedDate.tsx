import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface FormattedDateProps {
    date: string;
}

const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
    const { i18n } = useTranslation();

    const dateObj = new Date(date);

    const loc = i18n.language === "en" ? "en-US" : "el-GR";
    const formattedDate = dateObj.toLocaleDateString(loc, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const formattedTime = dateObj.toLocaleTimeString(loc, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <Typography
            variant="body2"
            fontWeight="600"
            color="primary.main"
            noWrap
        >
            {formattedDate} - {formattedTime}
        </Typography>
    );
};

export default FormattedDate;
