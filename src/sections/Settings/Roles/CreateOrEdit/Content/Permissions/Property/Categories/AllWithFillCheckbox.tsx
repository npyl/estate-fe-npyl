import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import { useWatch } from "react-hook-form";
import { RoleReq } from "@/types/roles";
import { allName } from "./constants";

const AllWithFillCheckbox = () => {
    const { t } = useTranslation();

    const parentCategories = useWatch<RoleReq>({
        name: "propertyPermissions.parentCategories",
    }) as string[];
    const disabled = parentCategories.length === 0;

    return <RHFCheckbox disabled={disabled} label={t("All")} name={allName} />;
};

export default AllWithFillCheckbox;
