import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

// --------------------------------------------------------------------------------

const OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

interface LocalizedProps extends TypographyProps {
    prefix: string;
    date: string;
}

const Localized: FC<LocalizedProps> = ({ prefix, date, ...props }) => {
    const { t, i18n } = useTranslation();
    const loc = i18n.language === "en" ? "en-US" : "el-GR";
    return (
        <Typography variant="body2" color="text.secondary" {...props}>
            {t(prefix)} {new Date(date).toLocaleDateString(loc, OPTIONS)}
        </Typography>
    );
};

// --------------------------------------------------------------------------------

interface MiscInfoProps {
    createdAt?: string;
    updatedAt?: string;
}

const MiscInfo: FC<MiscInfoProps> = ({ createdAt, updatedAt }) => (
    <Stack spacing={1}>
        {createdAt ? <Localized prefix="Created" date={createdAt} /> : null}
        {updatedAt ? <Localized prefix="Updated" date={updatedAt} /> : null}
    </Stack>
);

export default MiscInfo;
