import { AutocompleteRenderGetTagProps } from "@mui/material";
import ChipLink from "@/components/ChipLink";
import { IUserMini } from "@/types/user";

const getTagClassname = (id: number) =>
    `PPManagerMultipleAutocomplete-TagUser${id}`;

const renderUserTags = (
    tagValue: IUserMini[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const {
            key,
            className: _className,
            ...tagProps
        } = getTagProps({ index });

        const label = `${option?.firstName || ""} ${option?.lastName || ""}`;

        const className = `${_className} ${getTagClassname(option.id)}`;

        return (
            <ChipLink
                key={key}
                href={`/user/${option.id}`}
                label={label}
                className={className}
                {...tagProps}
            />
        );
    });

export { getTagClassname };
export default renderUserTags;
