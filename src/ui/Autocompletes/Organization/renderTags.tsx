import { IOrganization } from "@/types/organization";
import { AutocompleteRenderGetTagProps, Chip } from "@mui/material";

const renderUserTags = (
    tagValue: IOrganization[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });
        return <Chip key={key} label={option?.name || ""} {...tagProps} />;
    });

export default renderUserTags;
