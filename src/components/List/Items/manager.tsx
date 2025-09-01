import { Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import ListItem from "../item";
import { useTranslation } from "react-i18next";
import ListItemProps from "../types";
import { CustomAvatar, CustomButton } from "./styled";
import { useGetUserQuery } from "@/services/user";
import Link from "@/components/Link";

// -----------------------------------------------------------

interface ListManagerItemProps extends Omit<ListItemProps, "value" | "label"> {
    managerId: number;
    label?: string;
}

const ListManagerItem: FC<ListManagerItemProps> = ({
    managerId = -1,
    label,
    ...props
}) => {
    const { t } = useTranslation();

    const { data } = useGetUserQuery(managerId, { skip: managerId === -1 });
    const { firstName, lastName } = data ?? {};
    const fullname =
        firstName || lastName ? `${firstName || ""} ${lastName || ""}` : "-";

    return (
        <ListItem label={label || t("Manager")} {...props}>
            <Tooltip title={fullname} placement="top">
                <CustomButton
                    variant="outlined"
                    LinkComponent={Link}
                    href={`/user/${managerId}`}
                >
                    <CustomAvatar />
                    <Typography
                        noWrap
                        variant="subtitle2"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {fullname}
                    </Typography>
                </CustomButton>
            </Tooltip>
        </ListItem>
    );
};

export default ListManagerItem;
