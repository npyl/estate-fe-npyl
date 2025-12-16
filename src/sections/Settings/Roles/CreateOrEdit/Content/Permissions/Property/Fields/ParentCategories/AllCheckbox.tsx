import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useParentCategories from "@/sections/Settings/Roles/CreateOrEdit/useParentCategories";
import { useCallback } from "react";
import { RoleReq } from "@/types/roles";
import { RHFCheckbox } from "@/components/hook-form";
import { allName } from "./constants";

const AllCheckbox = () => {
    const { t } = useTranslation();

    const { setValue } = useFormContext<RoleReq>();
    const parentCategories = useParentCategories();
    const onChange = useCallback(
        (_: any, b: boolean) => {
            // Enable all categories
            if (b)
                setValue(
                    "propertyPermissions.parentCategories",
                    parentCategories
                );

            // Clear
            if (!b) setValue("propertyPermissions.parentCategories", []);
        },
        [parentCategories]
    );

    return (
        <RHFCheckbox
            label={t("All_Feminine")}
            name={allName}
            onChange={onChange}
        />
    );
};

export default AllCheckbox;
