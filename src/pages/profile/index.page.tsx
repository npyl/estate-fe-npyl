import {
    Avatar,
    Box,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useProfileQuery } from "src/services/user";
import { IUser } from "src/types/user";
import { useTabsContext } from "src/contexts/tabs";
import { List, ListItem } from "src/components/List";
import { ViewLocation } from "src/components/Location/View";
import { UserCircle } from "src/icons/user-circle";

interface ViewUserProps {
    user?: IUser;
}

const RenderUser = ({ user }: { user?: IUser }) => {
    const firstName = user?.firstName;
    const lastName = user?.lastName;

    return (firstName && lastName) || firstName || lastName ? (
        <Avatar sx={{ height: 60, width: 60 }}>
            {firstName![0]}
            {lastName![0]}
        </Avatar>
    ) : (
        <Avatar>
            <UserCircle />
        </Avatar>
    );
};
const RenderUsername = ({ username }: { username?: string }) => {
    return username ? (
        <Box
            sx={{
                px: 3,
                py: 1.5,
                display: "flex",
                justifyContent: "left",
            }}
        >
            <Typography variant="h6">{username}</Typography>
        </Box>
    ) : (
        <></>
    );
};

const ViewUser = ({ user }: ViewUserProps) => {
    const { t } = useTranslation();

    // profilePhoto: string;
    // username: string;
    // password: string;

    // properties: IProperties[];
    // propertyFilters: IPropertyFilter[];

    // isAdmin: boolean;

    // joinedIn: string;

    // registrationDate: string;

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("User Profile")}</Typography>
            </Box>
            <Divider />
            <Box
                p={3}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                height={"100%"}
            >
                <RenderUser user={user} />
                <RenderUsername username={user?.username} />
            </Box>
            <Divider />
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("First Name")}
                            value={user?.firstName || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Email")}
                            value={user?.email || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Last Name")}
                            value={user?.lastName || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Mobile Phone")}
                            value={user?.mobilePhone || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Home Phone")}
                            value={user?.homePhone || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Business Phone")}
                            value={user?.businessPhone || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Office Phone")}
                            value={user?.officePhone || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Call Center Number")}
                            value={user?.callCenterNumber || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Region")}
                            value={user?.region || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("City")}
                            value={user?.city || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("ZipCode")}
                            value={user?.zipCode || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Address")}
                            value={user?.address || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("AFM")}
                            value={user?.afm || ""}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("DOY")}
                            value={user?.doy || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("GEMH")}
                            value={user?.gemh || ""}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

const Profile: NextPage = () => {
    const { data: profile } = useProfileQuery();
    const { pushTab } = useTabsContext();

    useEffect(() => {
        if (profile) {
            pushTab({
                path: `/profile`,
                id: `${profile.id}`,
                label: `Profile`,
            });
        }
    }, [profile]);

    return (
        <Grid container spacing={1} mt={1}>
            <Grid item xs={3.5} />
            <Grid item xs={5} order={"row"}>
                <ViewUser user={profile} />
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
};

Profile.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Profile;
