import { Typography, Fade } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "../item";
import { useProfileQuery } from "src/services/user";
import { ICustomer } from "src/types/customer";
import ListItemProps from "../types";
import { CustomAvatar, CustomButton } from "./styled";
import Iconify from "@/components/iconify";

interface ListOwnerItemProps extends Omit<ListItemProps, "value" | "label"> {
    owner?: ICustomer;
    label?: string;
}

const ListOwnerItem: FC<ListOwnerItemProps> = ({ owner, label, ...other }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { data } = useProfileQuery();
    const [showOwner, setShowOwner] = useState(false);

    const handleClick = useCallback(
        () => owner?.id && router.push(`/customer/${owner?.id}`),
        []
    );

    const handleTouchStart = useCallback(() => setShowOwner(true), []);
    const handleTouchEnd = useCallback(() => setShowOwner(false), []);

    if (!data) return null;

    return (
        <ListItem label={label || t("Owner")} {...other}>
            <CustomButton
                variant="outlined"
                onClick={handleClick}
                onMouseOver={handleTouchStart}
                onMouseLeave={handleTouchEnd}
            >
                <CustomAvatar />

                {showOwner ? (
                    <Fade in={showOwner}>
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
                            {owner?.lastName || "-"}
                        </Typography>
                    </Fade>
                ) : (
                    <Iconify icon="eva:eye-off-fill" />
                )}
            </CustomButton>
        </ListItem>
    );
};

export default ListOwnerItem;
