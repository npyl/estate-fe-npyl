import { ICustomerMini } from "@/types/customer";
import { AutocompleteRenderGetTagProps, Avatar } from "@mui/material";
import ChipLink from "../ChipLink";

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
                avatar={
                    <Avatar
                        sx={{
                            width: 30,
                            height: 30,
                            bgcolor: "primary.main",
                            color: "white !important",
                        }}
                    ></Avatar>
                }
                {...tagProps}
            />
        );
    });

export default renderUserTags;
