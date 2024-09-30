import {
    Avatar,
    Box,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";
import { Label } from "@/components/Label";
import { useSecurityContext } from "src/contexts/security";
import { UserCircle } from "@/assets/icons/user-circle";
import { IUser } from "src/types/user";
import ListLanguageItem from "../List/Items/language";
import SoftButton from "@/components/SoftButton";
import { UserForm } from "./Form";
import { SpaceBetween } from "../styled";

interface ViewUserProps {
    user?: IUser;
}

const RenderUser = ({ user }: ViewUserProps) => {
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
    ) : null;
};
const RenderIsAdmin = ({ isAdmin }: { isAdmin?: boolean }) => {
    const { t } = useTranslation();
    return isAdmin ? <Label color="warning" opaque name={t("Admin")} /> : null;
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
                <RenderUser user={user} />
                <RenderUsername username={user?.username} />
                <RenderIsAdmin isAdmin={user?.isAdmin} />
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
