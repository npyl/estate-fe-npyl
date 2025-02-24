import { alpha, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

interface ColumnLabelProps {
    name: string;
    color?: string; // Optional custom color
}

//TODO: Add different color format for each column
const getBgColor = (theme: Theme, color?: string) =>
    alpha(color || theme.palette.info.main, 0.1);

const ColumnLabel = ({ name, color }: ColumnLabelProps) => {
    const { t } = useTranslation();
    return (
        <Typography
            color={color || "info.main"}
            bgcolor={(theme) => getBgColor(theme, color)}
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
