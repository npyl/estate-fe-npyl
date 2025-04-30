import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import RHFParentCategoryPicker from "@/sections/_Pickers/ParentCategory/RHF";
import RHFFloorPicker from "@/sections/_Pickers/Floor/RHF";

const LITERALS = ["_Deals_Choose", "_Deals_Floors"];

const Step0 = () => {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h6">{t(LITERALS[0])}</Typography>
            <RHFParentCategoryPicker name="parentCategories" />

            <Typography variant="h6">{t(LITERALS[1])}</Typography>
            <RHFFloorPicker minName="minFloor" maxName="maxFloor" />
        </>
    );
};

export default Step0;
