import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import RHFParentCategoryPicker from "@/sections/_ParentCategoryPicker/RHFParentCategoryPicker";

const LITERALS = ["_Deals_Choose"];

const Step0 = () => {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h6">{t(LITERALS[0])}</Typography>
            <RHFParentCategoryPicker name="parentCategories" />
        </>
    );
};

export default Step0;
