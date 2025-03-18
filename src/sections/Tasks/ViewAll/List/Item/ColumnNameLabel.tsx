import { alpha, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const getBgColor = (theme: Theme) => alpha(theme.palette.info.main, 0.1);

interface ColumnLabelProps {
    name: string;
}

const ColumnLabel: FC<ColumnLabelProps> = ({ name }) => {
    const { t } = useTranslation();
    return (
        <Typography
            color="info.main"
            bgcolor={getBgColor}
            variant="body2"
            borderRadius="5px"
            px={1}
            display={{
                xs: "none",
                md: "block",
            }}
        >
            {t(name)}
        </Typography>
    );
};

export default ColumnLabel;
