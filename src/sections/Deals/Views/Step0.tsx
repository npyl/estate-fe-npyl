import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const LITERALS = ["_Deals_Choose"];

const Step0 = () => {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h6">{t(LITERALS[0])}</Typography>
        </>
    );
};

export default Step0;
