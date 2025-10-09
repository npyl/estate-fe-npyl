import isFalsy from "@/utils/isFalsy";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface TitleProps {
    labelId?: number;
}

const Title: FC<TitleProps> = ({ labelId }) => {
    const { t } = useTranslation();
    const title = isFalsy(labelId) ? t("Create Label") : t("Edit Label");
    return <Typography variant="h5">{title}</Typography>;
};

export default Title;
