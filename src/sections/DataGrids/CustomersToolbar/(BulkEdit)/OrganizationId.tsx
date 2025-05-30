import { useTranslation } from "react-i18next";
import useValueChange from "../../BulkEditDrawer/useValueChange";
import OrganizationAutocomplete from "@/ui/Autocompletes/Organization";
import DefaultOrEdit from "../../BulkEditDrawer/DefaultOrEdit";

const OrganizationId = () => {
    const { t } = useTranslation();

    const [value, _onChange] = useValueChange("organizationId");
    const onChange = (id: number) => _onChange(id);

    return (
        <DefaultOrEdit label={t("Organization")} name="organizationId">
            <OrganizationAutocomplete value={value} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export default OrganizationId;
