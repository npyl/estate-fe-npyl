import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import useDateLocale from "@/hooks/useDateLocale";

interface GeneratedAtProps {
    generatedAt: number;
}

const GeneratedAt: FC<GeneratedAtProps> = ({ generatedAt }) => {
    const { t } = useTranslation();
    const loc = useDateLocale();
    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle2">{t("Last generated:")}</Typography>
            <Typography variant="body2" color="text.secondary">
                {new Date(generatedAt).toLocaleDateString(loc)}
            </Typography>
        </Stack>
    );
};

export default GeneratedAt;
