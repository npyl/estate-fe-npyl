import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { HEAD_HEIGHT } from "../constants";
import { useTranslation } from "react-i18next";
import { getBorderColor2 } from "@/theme/borderColor";
const Head0 = () => {
    const { t } = useTranslation();
    return (
        <Stack
            minHeight={HEAD_HEIGHT}
            height={HEAD_HEIGHT}
            maxHeight={HEAD_HEIGHT}
            width={1}
            justifyContent="center"
            pl={5}
            borderBottom="1px solid"
            borderColor={getBorderColor2}
        >
            <Typography variant="h6">{t("Messages")}</Typography>
        </Stack>
    );
};
export default Head0;
