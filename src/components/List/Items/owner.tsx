import { Typography, Fade, SxProps, Theme, Tooltip } from "@mui/material";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "../item";
import ListItemProps from "../types";
import { CustomAvatar, CustomButton } from "./styled";
import Iconify from "@/components/iconify";
import Link from "@/components/Link";
import { useGetCustomerByIdQuery } from "@/services/customers";

const LinkSx: SxProps<Theme> = {
    ml: 0.5,
    ".FadeInContent": {
        display: "none",
    },
    ".UserIcon": {
        display: "block",
    },

    "&:hover": {
        ".FadeInContent": {
            display: "block",
        },
        ".UserIcon": {
            display: "none",
        },
    },
};

interface ListOwnerItemProps extends Omit<ListItemProps, "value" | "label"> {
    ownerId: number;
    label?: string;
}

const ListOwnerItem: FC<ListOwnerItemProps> = ({
    ownerId = -1,
    label,
    ...other
}) => {
    const { t } = useTranslation();

    const { data } = useGetCustomerByIdQuery(ownerId, { skip: ownerId === -1 });
    const { firstName, lastName } = data || {};
    const fullname =
        firstName || lastName ? `${firstName || ""} ${lastName || ""}` : "-";

    return (
        <ListItem label={label || t("Owner")} {...other}>
            <Tooltip title={fullname} placement="top">
                <CustomButton
                    variant="outlined"
                    LinkComponent={Link}
                    href={`/customer/${ownerId}`}
                    sx={LinkSx}
                >
                    <CustomAvatar />

                    <Fade in className="FadeInContent">
                        <Typography
                            noWrap
                            variant="subtitle2"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                        >
                            {fullname}
                        </Typography>
                    </Fade>

                    <Iconify icon="eva:eye-off-fill" className="UserIcon" />
                </CustomButton>
            </Tooltip>
        </ListItem>
    );
};

export default ListOwnerItem;
