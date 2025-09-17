import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const formatDate = (timestamp: string, language: string) => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };

    const locale = language === "el" ? "el-GR" : "en-GB";
    const formattedDate = date.toLocaleDateString(locale, options);

    return formattedDate.replace(",", " -");
};

interface Props {
    updatedAt: string;
}

const UpdatedAt: FC<Props> = ({ updatedAt }) => {
    const { t, i18n } = useTranslation();
    return (
        <Tooltip title={t("Last Updated Date")} placement="top">
            <Typography variant="body2">
                {formatDate(updatedAt ?? "N/A", i18n.language)}
            </Typography>
        </Tooltip>
    );
};

export default UpdatedAt;
