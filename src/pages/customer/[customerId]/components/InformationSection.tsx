import { Divider, Grid, List, Paper, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";

import * as React from "react";
import { useTranslation } from "react-i18next";

import { ListItem, ListManagerItem } from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { useGetCustomerByIdQuery } from "src/services/customers";

import { useRouter } from "next/router";
import { LeadSource } from "src/types/global";

import { Label, LabelColor } from "src/components/label";
import { useMemo } from "react";

interface TypeProps {
    seller: boolean;
    lessor: boolean;
    leaser: boolean;
    buyer: boolean;
}

const TypeLabels = ({ seller, lessor, leaser, buyer }: TypeProps) => {
    const { t } = useTranslation();

    const map = useMemo(
        () => ({
            ["Seller"]: {
                value: seller,
                color: "success",
            },
            ["Lessor"]: {
                value: lessor,
                color: "error",
            },
            ["Leaser"]: {
                value: leaser,
                color: "warning",
            },
            ["Buyer"]: {
                value: buyer,
                color: "info",
            },
        }),
        [seller, lessor, leaser, buyer]
    );

    return (
        <>
            {Object.entries(map).map(([type, { value, color }]) =>
                value ? (
                    <Label
                        key={type}
                        variant="soft"
                        opaque
                        color={color as LabelColor}
                    >
                        {t(type)}
                    </Label>
                ) : null
            )}
        </>
    );
};

const InformationSection: React.FC = (props) => {
    const router = useRouter();
    const { customerId } = router.query;
    const { t } = useTranslation();
    const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
    const leadSource = data?.leadSource as LeadSource;

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
                            value={data?.firstName}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Last Name")}
                            value={data?.lastName}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("email")}
                            value={data?.email}
                            align="horizontal"
                        />
                        <ListManagerItem
                            label={t("Managed By")}
                            manager={data?.managedBy}
                        />
                        <ListItem
                            label={t("Mobile Phone")}
                            value={data?.mobilePhone}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Home Phone")}
                            value={data?.homePhone}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Fax")}
                            value={data?.fax}
                            align="horizontal"
                        />

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
                            value={data?.nationality}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("ID Number")}
                            value={data?.idNumber}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Date of Birth")}
                            value={data?.dateOfBirth}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Passport Number")}
                            value={data?.passportNumber}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Preferred Language")}
                            value={data?.preferredLanguage}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Lead Source")}
                            value={leadSource}
                            align="horizontal"
                        />
                        {leadSource === "Customer" && (
                            <ListItem
                                label={t("Suggested by")}
                                value={data?.suggestedBy}
                                align="horizontal"
                            />
                        )}
                        <ListLabelsItem
                            label={t("Labels")}
                            labels={data?.labels}
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default InformationSection;
