import { Avatar, Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
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

    const { data } = useProfileQuery({});
    if (!data) return null;

    const performViewManager = () => {
        router.push(`/customer/${manager.id}`);
    };

    return (
        <ListItem label={label} {...other}>
            <Button
                sx={{
                    flex: 1,
                    float: "right",
                    height: "20px",
                    borderRadius: 0,
                    padding: 1,
                    width: "100px",
                    borderColor: "#D3D3D3",
                    "&:active": {
                        borderColor: "black",
                    },
                }}
                variant="outlined"
                onClick={performViewManager}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    bgcolor="white"
                    borderRadius={0}
                    width="100%"
                    sx={{
                        height: "15px",
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "white",
                            color: "grey.900",
                            width: 18,
                            height: 18,
                        }}
                    ></Avatar>

                    <Typography
                        variant="subtitle2"
                        sx={{
                            overflow: "hidden",
                            color: "#1f2124",
                            fontSize: "0.8rem",
                        }}
                    >
                        {manager?.lastName}
                    </Typography>
                </Box>
            </Button>
        </ListItem>
    );
};

export default ListManagerItem;
