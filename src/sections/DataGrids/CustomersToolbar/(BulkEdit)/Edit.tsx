import { useTranslation } from "react-i18next";
import DefaultOrEdit from "@/sections/DataGrids/BulkEditDrawer/DefaultOrEdit";
import ManagerAutocomplete from "@/ui/Autocompletes/Manager";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";

const EditManager = () => {
    const { t } = useTranslation();
    const [value, onChange] = useValueChange("managerId");
    return (
        <DefaultOrEdit label={t("Manager")} name="managerId">
            <ManagerAutocomplete value={value} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export default EditManager;
