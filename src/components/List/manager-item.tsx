import { Avatar, Box, Button, Fade, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { IUser } from "src/types/user";
import ListItem from "./item";
import { useProfileQuery } from "src/services/user";
import { ICustomer } from "src/types/customer";
import { useTranslation } from "react-i18next";

interface ListManagerItemProps {
    manager: IUser;
    label?: string | any;
}

const ListManagerItem: FC<ListManagerItemProps> = (props) => {
    const { t } = useTranslation();
    const { manager, label = t("Manager"), ...other } = props;
    const router = useRouter();
    const [showManager, setShowManager] = useState(true);
    const { data } = useProfileQuery();

    const performViewManager = () => {
        router.push(`/user/${manager.id}`);
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
                onClick={performViewManager}
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
                    <Fade in={showManager}>
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
                            {manager?.lastName}
                        </Typography>
                    </Fade>
                </Box>
            </Button>
        </ListItem>
    );
};

export default ListManagerItem;
