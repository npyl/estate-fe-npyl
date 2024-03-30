import { Avatar, Button, Fade, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { IUser } from "src/types/user";
import ListItem from "../item";
import { useProfileQuery } from "src/services/user";
import { useTranslation } from "react-i18next";

// -----------------------------------------------------------

const CustomButton = styled(Button)(({ theme }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",

    // INFO: appears better to my eyes.
    marginRight: theme.spacing(-1),

    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0.1),
    paddingRight: theme.spacing(0.5),

    borderRadius: "12px",
    borderColor: "transparent",

    color: theme.palette.text.primary,

    backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[700]
            : theme.palette.neutral?.[100],

    gap: theme.spacing(1),

    "&:active": {
        borderColor: theme.palette.primary.main,
    },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.grey?.[900],
    width: 20,
    height: 20,
}));

// -----------------------------------------------------------

interface ListManagerItemProps {
    manager: IUser;
    label?: string | any;
}

const ListManagerItem: FC<ListManagerItemProps> = ({ manager, label }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const [showManager, setShowManager] = useState(true);
    const { data } = useProfileQuery();

    const handleClick = useCallback(
        () => router.push(`/user/${manager.id}`),
        []
    );

    if (!data) return null;

    return (
        <ListItem label={label || t("Manager")}>
            <CustomButton variant="outlined" onClick={handleClick}>
                <CustomAvatar />

                {/* Use Fade for smooth transition */}
                <Fade in={showManager}>
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
                        {manager?.lastName}
                    </Typography>
                </Fade>
            </CustomButton>
        </ListItem>
    );
};

export default ListManagerItem;
