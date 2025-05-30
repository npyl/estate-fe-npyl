import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";
import { useSecurityContext } from "src/contexts/security";
import { IUser } from "src/types/user";
import ListLanguageItem from "@/components/List/Items/language";
import SoftButton from "@/components/SoftButton";
const UserForm = dynamic(() => import("./Form"));
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
import AdminLabel from "./AdminLabel";
import AvatarPicker from "./AvatarPicker";

interface ViewUserProps {
    user?: IUser;
}

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
    ) : null;
};

const ViewUser = ({ user }: ViewUserProps) => {
    const { t } = useTranslation();
    const { setSelectedUser } = useSecurityContext();

    const [formOpen, setFormOpen] = useState(false);
    const handleFormOpen = () => setFormOpen(true);
    const handleFormClose = () => setFormOpen(false);

    useEffect(() => {
        setSelectedUser(user!.id);
    }, []);

    return (
        <Paper elevation={10}>
            <SpaceBetween
                sx={{
                    px: 2,
                    py: 1.5,
                }}
            >
                <Typography variant="h6" flex={1} mt={1}>
                    {t("User Profile")}
                </Typography>

                <SoftButton onClick={handleFormOpen}>{t("Edit")}</SoftButton>
            </SpaceBetween>
            <Divider />
            <Stack p={3} justifyContent="center" alignItems="center">
                <AvatarPicker user={user} />
                <RenderUsername username={user?.username} />
                {user?.isAdmin ? <AdminLabel /> : null}
            </Stack>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("First Name")}
                            value={user?.firstName || ""}
                        />
                        <ListItem
                            label={t("Email")}
                            value={user?.email || ""}
                        />
                        <ListItem
                            label={t("Google Workspace Email")}
                            value={user?.workspaceEmail || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Last Name")}
                            value={user?.lastName || ""}
                        />
                        <ListLanguageItem
                            label={t("Preferred Language")}
                            value={user?.preferredLanguage?.key || "ENGLISH"}
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Mobile Phone")}
                            value={user?.mobilePhone || ""}
                        />
                        <ListItem
                            label={t("Home Phone")}
                            value={user?.homePhone || ""}
                        />
                        <ListItem
                            label={t("Business Phone")}
                            value={user?.businessPhone || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Office Phone")}
                            value={user?.officePhone || ""}
                        />
                        <ListItem
                            label={t("Call Center Number")}
                            value={user?.callCenterNumber || ""}
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Region")}
                            value={user?.region || ""}
                        />
                        <ListItem label={t("City")} value={user?.city || ""} />
                        <ListItem
                            label={t("Zip code")}
                            value={user?.zipCode || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Address")}
                            value={user?.address || ""}
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem label={t("ΑΦΜ")} value={user?.afm || ""} />
                        <ListItem label={t("ΔΟΥ")} value={user?.doy || ""} />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem label={t("ΓΕΜΥ")} value={user?.gemh || ""} />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Joined In")}
                            value={
                                user?.joinedIn
                                    ? new Date(user?.joinedIn).toDateString()
                                    : ""
                            }
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Registration Date")}
                            value={
                                user?.registrationDate
                                    ? new Date(
                                          user?.registrationDate
                                      ).toDateString()
                                    : ""
                            }
                        />
                    </List>
                </Grid>
            </Grid>

            {formOpen && <UserForm open={formOpen} onClose={handleFormClose} />}
        </Paper>
    );
};

export default ViewUser;
