import { Avatar, Box, Button, Typography, Fade } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListItem from "./item";
import { useProfileQuery } from "src/services/user";
import { ICustomer } from "src/types/customer";

interface ListOwnerItemProps {
    owner: ICustomer;
    label?: string | any;
}

const ListOwnerItem: FC<ListOwnerItemProps> = (props) => {
    const { t } = useTranslation();
    const { owner, label = t("Owner"), ...other } = props;
    const router = useRouter();
    const { data } = useProfileQuery();
    const [showOwner, setShowOwner] = useState(false);

    const performViewOwner = () => {
        router.push(`/customer/${owner?.id}`);
    };

    const handleTouchStart = () => {
        setShowOwner(true);
    };

    const handleTouchEnd = () => {
        setShowOwner(false);
    };
    const fitContentStyles = {
        display: "inline-flex", // makes the container fit its content width
        alignItems: "center",
        justifyContent: "center", // horizontally aligns the button's content
        height: "auto", // adapts the height based on the content
        p: 0, // removes padding
        borderRadius: "12px",
        borderColor: "transparent",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        "&:active": {
            borderColor: "primary.main",
        },
    };
    if (!data) return null;
    return (
        <ListItem label={label} {...other}>
            <Button
                sx={fitContentStyles} // apply styles
                variant="outlined"
                onClick={performViewOwner}
                onMouseOver={handleTouchStart}
                onMouseLeave={handleTouchEnd}
            >
                <Box
                    sx={{
                        ...fitContentStyles, // apply the same styles here
                        justifyContent: "space-between",
                        bgcolor: "grey.300",
                        borderRadius: "inherit",
                        boxShadow: 1,
                        px: 1, // horizontal padding
                        boxSizing: "border-box",
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "primary.light",
                            color: "grey.900",
                            width: 20,
                            height: 20,
                            mr: 1, // adds some margin to the right of the avatar, you can adjust as needed
                        }}
                    ></Avatar>

                    {/* Use Fade for smooth transition */}
                    <Fade in={showOwner}>
                        <Typography
                            variant="subtitle2"
                            noWrap
                            component="div"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                // remove maxWidth restriction here to allow the text to expand naturally
                            }}
                        >
                            {owner?.lastName}
                        </Typography>
                    </Fade>
                </Box>
            </Button>
        </ListItem>
    );
};

export default ListOwnerItem;
