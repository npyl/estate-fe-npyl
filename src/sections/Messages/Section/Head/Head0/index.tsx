import Typography from "@mui/material/Typography";
import { HEAD_HEIGHT } from "../../constants";
import { useTranslation } from "react-i18next";
import { getBorderColor2 } from "@/theme/borderColor";
import { SpaceBetween } from "@/components/styled";
import Control from "./Control";

const Head0 = () => {
    const { t } = useTranslation();
    return (
        <SpaceBetween
            minHeight={HEAD_HEIGHT}
            height={HEAD_HEIGHT}
            maxHeight={HEAD_HEIGHT}
            width={1}
            alignItems="center"
            pl={5}
            pr={1}
            borderBottom="1px solid"
            borderColor={getBorderColor2}
        >
            <Typography variant="h6">{t("Messages")}</Typography>
            <Control />
        </SpaceBetween>
    );
};

export default Head0;
