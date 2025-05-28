import { ICustomerMini } from "@/types/customer";
import { AutocompleteRenderGetTagProps } from "@mui/material";
import ChipLink from "@/components/ChipLink";
import PlaceholderAvatar from "@/ui/Autocompletes/Customer/PlaceholderAvatar";
import { IUser } from "@/types/user";
import { FC } from "react";
import Avatar from "@/components/Avatar";

// -----------------------------------------------------------------------

const getTagClassname = (id: number) => `PPPeopleAutocomplete-Tag-${id}`;

interface TagProps {
    getTagProps: AutocompleteRenderGetTagProps;
    option: ICustomerMini | IUser;
    index: number;
}

const Tag: FC<TagProps> = ({ getTagProps, option, index }) => {
    const { key, className: _className, ...tagProps } = getTagProps({ index });

    const isUser = "preferredLanguage" in option;

    const label = `${option?.firstName || ""} ${option?.lastName || ""}`;

    const className = `${_className} ${getTagClassname(option.id)}`;

    const href = isUser ? `/user/${option.id}` : `/customer/${option.id}`;

    const avatar = isUser ? (
        <Avatar
            firstName={option?.firstName}
            lastName={option?.lastName}
            src={option?.avatar}
        />
    ) : (
        <PlaceholderAvatar />
    );

    return (
        <ChipLink
            key={key}
            href={href}
            label={label}
            avatar={avatar}
            className={className}
            {...tagProps}
        />
    );
};

// -----------------------------------------------------------------------

const getTag =
    (getTagProps: AutocompleteRenderGetTagProps) =>
    (option: ICustomerMini | IUser, index: number) => (
        <Tag option={option} getTagProps={getTagProps} index={index} />
    );

// -----------------------------------------------------------------------

const renderUserTags = (
    tagValue: ICustomerMini[],
    getTagProps: AutocompleteRenderGetTagProps
) => tagValue.map(getTag(getTagProps));

// -----------------------------------------------------------------------

export { getTagClassname };
export default renderUserTags;
