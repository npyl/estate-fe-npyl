import { Avatar, Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import { IUser } from "src/types/user";
import ListItem from "./item";
import { useProfileQuery } from "src/services/user";
import { ICustomer } from "src/types/customer";

interface ListOwnerItemProps {
    owner: ICustomer;
    label?: string | any;
}

const ListOwnerItem: FC<ListOwnerItemProps> = (props) => {
    const { owner, label = "Owner", ...other } = props;

    const router = useRouter();

    const { data } = useProfileQuery({});
    if (!data) return null;

    const performViewOwner = () => {
        // view Owner
        router.push(`/customer/${owner.id}`);
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
                onClick={performViewOwner}
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
                            marginLeft: "auto", // Centers the Typography inside the flex container
                            marginRight: "auto", // Centers the Typography inside the flex container
                        }}
                    >
                        {owner?.lastName}
                    </Typography>
                </Box>
            </Button>
        </ListItem>
    );
};

export default ListOwnerItem;
