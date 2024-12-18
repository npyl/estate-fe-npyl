import { ICustomerMini } from "@/types/customer";
import { AutocompleteRenderGetTagProps, Chip } from "@mui/material";

const renderUserTags = (
    tagValue: ICustomerMini[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });
        return <Chip key={key} label={option?.firstName} {...tagProps} />;
    });

export default renderUserTags;
