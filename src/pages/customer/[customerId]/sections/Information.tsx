import { Divider, Grid, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ListItem, ListManagerItem, ListRatingItem } from "src/components/List";
import { LeadSource } from "src/types/global";
import { useGlobals } from "src/hooks/useGlobals";
import { TypeLabels } from "@/components/TypeLabels";
import { LabelCreate } from "@/components/Label";
import useGetCustomer from "@/hooks/customer";
import { SpaceBetween } from "@/components/styled";

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
            <SpaceBetween
                sx={{
                    px: 3,
                    py: 1.5,
                }}
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={0.5}
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
            </SpaceBetween>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
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

                        <ListRatingItem
                            label={t("Status")}
                            status={data?.status}
                        />
                    </List>
                </Grid>

                <Grid item xs={12} sm={6}>
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
