import { Role, RoleReq, RoleToRoleReq } from "@/types/roles";
import useParentCategories from "@/sections/Settings/Roles/CreateOrEdit/useParentCategories";

const useValues = (data?: Role): RoleReq => {
    const mapped = RoleToRoleReq(data);

    const skip = !mapped.propertyPermissions.allParentCategories;
    const parentCategories = useParentCategories(skip);

    return {
        ...mapped,
        color: mapped?.color || "#aee",
        propertyPermissions: {
            ...mapped.propertyPermissions,

            // INFO: if `allParentCategories` is true, allow `categories` to be enabled by filling with the
            ...(mapped.propertyPermissions.allParentCategories
                ? { parentCategories }
                : {}),
        },
    };
};

export default useValues;
