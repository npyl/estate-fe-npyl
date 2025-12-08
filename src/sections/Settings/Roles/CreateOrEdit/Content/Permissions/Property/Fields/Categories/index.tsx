import { useTranslation } from "react-i18next";
import WithAll from "../WithAll";
import RHFCategoryMultiplePicker from "@/ui/Pickers/RHF/CategoryMultiple";
import AllWithFillCheckbox from "./AllWithFillCheckbox";
import { allName } from "./constants";
import Field from "../Field";

const Picker = WithAll(RHFCategoryMultiplePicker, allName);

const Categories = () => {
    const { t } = useTranslation();
    return (
        <Field label={t("Categories")}>
            <AllWithFillCheckbox />
            <Picker
                name="propertyPermissions.categories"
                parentCategoriesName="propertyPermissions.parentCategories"
            />
        </Field>
    );
};

export default Categories;
