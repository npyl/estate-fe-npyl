import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const AdminLabel: FC<TypographyProps> = (props) => {
    const { t } = useTranslation();
    return (
        <Typography
            width="fit-content"
            ml={2}
            variant="body2"
            bgcolor="#AF52DE"
            color="white"
            borderRadius="40px"
            px={1}
            {...props}
        >
            {t("Admin")}
        </Typography>
    );
};

export default AdminLabel;
