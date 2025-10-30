import { AutocompleteRenderGetTagProps } from "@mui/material";
import { RoleMini } from "@/types/roles";
import Role from "@/ui/Role";

const getTagClassname = (id: number) =>
    `PPRolesMultipleAutocomplete-TagRole${id}`;

const renderUserTags = (
    tagValue: RoleMini[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });
        return <Role r={option} {...tagProps} />;
    });

export { getTagClassname };
export default renderUserTags;
