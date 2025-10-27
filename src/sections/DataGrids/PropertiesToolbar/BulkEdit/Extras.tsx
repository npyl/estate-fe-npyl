import { useTranslation } from "react-i18next";
import DefaultOrEdit from "../../BulkEditDrawer/DefaultOrEdit";
import ExtrasPicker from "@/ui/Pickers/Extras";
import useValueChange from "../../BulkEditDrawer/useValueChange";

const EditExtras = () => {
    const { t } = useTranslation();

    const [value, onChange] = useValueChange("extras");

    return (
        <DefaultOrEdit label={t("Extras")} name="extras">
            <ExtrasPicker fullWidth value={value} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export default EditExtras;
