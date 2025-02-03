import { Typography, Fade } from "@mui/material";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "../item";
import { useGetProfileQuery } from "src/services/user";
import { ICustomer } from "src/types/customer";
import ListItemProps from "../types";
import { CustomAvatar, CustomButton } from "./styled";
import Iconify from "@/components/iconify";
import Link from "@/components/Link";

interface ListOwnerItemProps extends Omit<ListItemProps, "value" | "label"> {
    owner?: ICustomer;
    label?: string;
}

const ListOwnerItem: FC<ListOwnerItemProps> = ({ owner, label, ...other }) => {
    const { t } = useTranslation();

    const { data } = useGetProfileQuery();
    const [showOwner, setShowOwner] = useState(false);

    const handleTouchStart = useCallback(() => setShowOwner(true), []);
    const handleTouchEnd = useCallback(() => setShowOwner(false), []);

    if (!data) return null;

    return (
        <ListItem label={label || t("Owner")} {...other}>
            <Link href={`/customer/${owner?.id}`}>
                <CustomButton
                    variant="outlined"
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
            </Link>
        </ListItem>
    );
};

export default ListOwnerItem;
