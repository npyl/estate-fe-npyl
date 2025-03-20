import { ICustomerMini } from "@/types/customer";
import { AutocompleteRenderGetTagProps } from "@mui/material";
import ChipLink from "@/components/ChipLink";
import PlaceholderAvatar from "@/sections/_Autocompletes/Customer/PlaceholderAvatar";

const renderUserTags = (
    tagValue: ICustomerMini[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });

        const label = `${option?.firstName || ""} ${option?.lastName || ""}`;

        return (
            <ChipLink
                key={key}
                href={`/customer/${option.id}`}
                label={label}
                avatar={<PlaceholderAvatar />}
                {...tagProps}
            />
        );
    });

export default renderUserTags;
