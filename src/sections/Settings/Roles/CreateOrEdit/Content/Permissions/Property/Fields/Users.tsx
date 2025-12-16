import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import RHFManagerMultipleAutocomplete from "@/ui/Autocompletes/RHFManagerMultiple";
import Field from "./Field";

const allName = "propertyPermissions.allUsers";

const WithAllPicker = WithAll(RHFManagerMultipleAutocomplete, allName);

const Users = () => {
    const { t } = useTranslation();
    return (
        <Field label={t("Users")}>
            <RHFCheckbox label={t("All_Musculine")} name={allName} />
            <WithAllPicker name="propertyPermissions.users" />
        </Field>
    );
};

export default Users;
