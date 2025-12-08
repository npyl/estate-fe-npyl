import { useTranslation } from "react-i18next";
import RHFParentCategoryMultiplePicker from "@/ui/Pickers/RHF/ParentCategoryMultiple";
import WithAll from "../WithAll";
import { allName } from "./constants";
import AllCheckbox from "./AllCheckbox";
import Field from "../Field";

const Picker = WithAll(RHFParentCategoryMultiplePicker, allName);

const ParentCategories = () => {
    const { t } = useTranslation();
    return (
        <Field label={t("Parent Categories")}>
            <AllCheckbox />
            <Picker name="propertyPermissions.parentCategories" />
        </Field>
    );
};

export default ParentCategories;
