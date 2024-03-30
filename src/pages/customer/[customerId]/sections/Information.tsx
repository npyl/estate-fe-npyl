import { Divider, Grid, List, Paper, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ListItem, ListManagerItem } from "src/components/List";
import { LeadSource } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { TypeLabels } from "src/pages/customers/components/TypeLabels";
import { LabelCreate } from "src/components/label";
import useGetCustomer from "src/hooks/customer/hook";

const InformationSection: React.FC = () => {
    const { t } = useTranslation();
    const enums = useGlobals();

    const { customer: data, customerId } = useGetCustomer();

    const leadSource = data?.leadSource?.key as LeadSource;
    const nationalitiesEnum = enums?.customer?.nationality || [];
    const leadSourceEnum = enums?.customer?.leadSource || [];

    let displayNationality = "-";
    if (nationalitiesEnum && data?.nationality !== undefined) {
        const foundNationality = nationalitiesEnum.find(
            ({ key, value }) => key === data?.nationality.key
        );

        displayNationality = foundNationality
            ? foundNationality.value
            : "Unknown";
    }
    let displayLeadSource = "-";
    if (leadSourceEnum && leadSource !== undefined) {
        const foundLeadSource = leadSourceEnum.find(
            ({ key, value }) => key === leadSource
        );
        displayLeadSource = foundLeadSource ? foundLeadSource.value : "Unknown";
    }

    if (!data) return null;

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
                <Typography variant="h6" flex={1}>
                    {t("Customer Information")}
                </Typography>

                <TypeLabels
                    seller={data?.seller}
                    lessor={data?.lessor}
                    leaser={data?.leaser}
                    buyer={data?.buyer}
                />
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("First Name")}
                            value={data?.firstName || "-"}
                        />
                        <ListItem
                            label={t("Last Name")}
                            value={data?.lastName || "-"}
                        />
                        <ListItem
                            label={t("email")}
                            value={data?.email || "-"}
                        />
                        <ListManagerItem
                            label={t("Managed By").toString()}
                            manager={data.managedBy}
                        />
                        <ListItem
                            label={t("Mobile Phone")}
                            value={data?.mobilePhone || "-"}
                        />
                        <ListItem
                            label={t("Home Phone")}
                            value={data?.homePhone || "-"}
                        />
                        <ListItem label={t("Fax")} value={data?.fax || "-"} />

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <ListItem label={t("Status")} />
                            <Rating
                                name="simple-controlled"
                                value={data?.status}
                                readOnly
                            />
                        </div>
                    </List>
                </Grid>

                <Grid item xs={6} padding={0}>
                    <List>
                        <ListItem
                            label={t("Nationality")}
                            value={displayNationality || "-"}
                        />

                        <ListItem
                            label={t("ID Number")}
                            value={data?.idNumber || "-"}
                        />
                        <ListItem
                            label={t("Date of Birth")}
                            value={
                                data?.dateOfBirth
                                    ? new Date(data?.dateOfBirth).toDateString()
                                    : "-"
                            }
                        />
                        <ListItem
                            label={t("Passport Number")}
                            value={data?.passportNumber || "-"}
                        />
                        <ListItem
                            label={t("Preferred Language")}
                            value={data?.preferredLanguage.value || "-"}
                        />
                        <ListItem
                            label={t("Lead Source")}
                            value={displayLeadSource}
                        />
                        {displayLeadSource === "Customer" && (
                            <ListItem
                                label={t("Suggested by")}
                                value={data?.suggestedBy || "-"}
                            />
                        )}

                        <LabelCreate
                            mt={1}
                            ml={3}
                            mr={1}
                            minHeight={"70px"}
                            variant="customer"
                            resourceId={customerId ? +customerId : -1}
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default InformationSection;
