import { Fade, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { IUser } from "src/types/user";
import ListItem from "../item";
import { useProfileQuery } from "src/services/user";
import { useTranslation } from "react-i18next";
import ListItemProps from "../types";
import { CustomAvatar, CustomButton } from "./styled";

// -----------------------------------------------------------

interface ListManagerItemProps extends Omit<ListItemProps, "value" | "label"> {
    manager?: IUser;
    label?: string;
}

const ListManagerItem: FC<ListManagerItemProps> = ({
    manager,
    label,
    ...props
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { data } = useProfileQuery();

    const handleClick = useCallback(
        () => manager?.id && router.push(`/user/${manager?.id}`),
        []
    );

    if (!data) return null;

    return (
        <ListItem label={label || t("Manager")} {...props}>
            <CustomButton variant="outlined" onClick={handleClick}>
                <CustomAvatar />

                <Typography
                    noWrap
                    variant="subtitle2"
                    component="div"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {manager?.lastName || "-"}
                </Typography>
            </CustomButton>
        </ListItem>
    );
};

export default ListManagerItem;
