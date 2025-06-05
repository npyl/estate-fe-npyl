import { ICustomerMini } from "@/types/customer";
import { AutocompleteRenderGetTagProps } from "@mui/material";
import ChipLink, { ChipLinkProps } from "@/components/ChipLink";
import PlaceholderAvatar from "@/ui/Autocompletes/Customer/PlaceholderAvatar";
import { isIUser, IUser } from "@/types/user";
import { FC, forwardRef } from "react";
import Avatar from "@/components/Avatar";

// -----------------------------------------------------------------------

const getTagClassname = (id: number) => `PPPeopleAutocomplete-Tag-${id}`;

interface TagProps extends Omit<ChipLinkProps, "href"> {
    option: ICustomerMini | IUser;
}

const Tag = forwardRef<HTMLAnchorElement, TagProps>(
    ({ className: _className, option, ...props }, ref) => {
        const isUser = isIUser(option);

        const label = `${option?.firstName || ""} ${option?.lastName || ""}`;

        const className = `${_className} ${getTagClassname(option.id)}`;

        const href = isUser ? `/user/${option.id}` : `/customer/${option.id}`;

        const avatar = isUser ? (
            <Avatar
                firstName={option?.firstName}
                lastName={option?.lastName}
                src={(option as IUser)?.avatar}
            />
        ) : (
            <PlaceholderAvatar />
        );

        return (
            <ChipLink
                ref={ref}
                href={href}
                label={label}
                avatar={avatar}
                className={className}
                {...props}
            />
        );
    }
);

Tag.displayName = "Tag";

// -----------------------------------------------------------------------

const getTag =
    (getTagProps: AutocompleteRenderGetTagProps) =>
    (option: ICustomerMini | IUser, index: number) => {
        const {
            key,
            className: _className,
            ...tagProps
        } = getTagProps({ index });

        return <Tag key={key} option={option} {...tagProps} />;
    };

// -----------------------------------------------------------------------

const renderUserTags = (
    tagValue: ICustomerMini[],
    getTagProps: AutocompleteRenderGetTagProps
) => tagValue.map(getTag(getTagProps));

// -----------------------------------------------------------------------

export { getTagClassname };
export default renderUserTags;
