import { Send as SendIcon } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAddNotificationMutation } from "src/services/notification";

import { useTranslation } from "react-i18next";
import { usePublishTab } from "src/components/Tabs/utils";
import {
    selectAll,
    selectCustomerEmail,
    selectCustomerMobile,
    selectCustomerName,
    selectMessage,
    selectPropertyCode,
    selectTourDate,
    selectTourTime,
    selectTourType,
    // setter
    setAttribute,
} from "src/slices/notification";

const NotificationCreatePage: NextPage = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    usePublishTab({
        title: "Create Notifications",
        path: "/notification/create",
    });

    const [addNotification] = useAddNotificationMutation();

    const body = useSelector(selectAll);
    const customerEmail = useSelector(selectCustomerEmail);
    const mobilePhone = useSelector(selectCustomerMobile);
    const customerName = useSelector(selectCustomerName);
    const message = useSelector(selectMessage);
    const propertyCode = useSelector(selectPropertyCode);
    const tourDate = useSelector(selectTourDate);
    const tourTime = useSelector(selectTourTime);
    const tourType = useSelector(selectTourType);

    const handleChange = (value: string, key: string) => {
        dispatch(setAttribute({ key, value }));
    };
    const handleSubmit = () => {
        addNotification(body);
    };

    return (
        <>
            <Paper
                elevation={10}
                sx={{
                    flex: 1,
                    mt: 1,
                }}
            >
                <Grid container>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                px: 3,
                                py: 1.5,
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="h6">
                                {t("Notification Information")}
                            </Typography>
                        </Box>
                        <Grid container spacing={1} p={1}>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Name")}
                                    value={customerName}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            "customerName"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Email")}
                                    value={customerEmail}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            "customerEmail"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Mobile Phone")}
                                    value={mobilePhone}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            "customerMobile"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Message")}
                                    value={message}
                                    onChange={(e) =>
                                        handleChange(e.target.value, "message")
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Property Code")}
                                    value={propertyCode}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            "propertyCode"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Tour Date")}
                                    value={tourDate}
                                    onChange={(e) =>
                                        handleChange(e.target.value, "tourDate")
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Tour Time")}
                                    value={tourTime}
                                    onChange={(e) =>
                                        handleChange(e.target.value, "tourTime")
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label={t("Tour Type")}
                                    value={tourType}
                                    onChange={(e) =>
                                        handleChange(e.target.value, "tourType")
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            padding={2}
                            container
                            alignItems="center"
                            justifyContent="flex-end"
                            spacing={1}
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    onClick={handleSubmit}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

NotificationCreatePage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default NotificationCreatePage;
