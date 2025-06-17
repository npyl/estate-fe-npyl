import { Divider, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    List,
    ListBooleanItem,
    ListItem,
    ListManagerItem,
    ListRatingItem,
} from "@/components/List";
import ListLanguageItem from "@/components/List/Items/language";
import ViewPanel from "@/components/Panel/View";
import { TypeLabels } from "@/components/TypeLabels";
import useGetCustomer from "@/hooks/customer";
import LabelCreate from "@/sections/LabelCreate";
import LeadSourceListItem from "./LeadSourceListItem";
import { LeadSource } from "@/types/global";
import { PreferredLanguageType } from "@/types/enums";
import AvatarPicker from "./AvatarPicker";

const Information = () => {
    const { t } = useTranslation();

    const { customer: data, customerId } = useGetCustomer();
    const isB2B = Boolean(data?.b2b);
    const label = isB2B ? "B2B Customer Information" : "Customer Information";

    const leadSource = data?.leadSource?.key as LeadSource;
    const preferredLanguage = (data?.preferredLanguage?.key ||
        "ENGLISH") as PreferredLanguageType;

    return (
        <ViewPanel
            label={t(label)}
            endNode={
                <TypeLabels
                    seller={data?.seller}
                    lessor={data?.lessor}
                    leaser={data?.leaser}
                    buyer={data?.buyer}
                />
            }
        >
            <Stack p={3} justifyContent="center" alignItems="center">
                <AvatarPicker c={data} />
            </Stack>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("First Name")}
                            value={data?.firstName || ""}
                        />
                        <ListItem
                            label={t("Email")}
                            value={data?.email || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Last Name")}
                            value={data?.lastName || ""}
                        />

                        <ListItem label={t("ΑΦΜ")} value={data?.afm || ""} />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Mobile Phone")}
                            value={data?.mobilePhone || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Home Phone")}
                            value={data?.homePhone || ""}
                        />
                        <ListItem label={t("Fax")} value={data?.fax || ""} />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListLanguageItem
                            label={t("Preferred Language")}
                            value={preferredLanguage}
                        />

                        {leadSource === "CUSTOMER" ? (
                            <ListItem
                                label={t("Suggested by")}
                                value={data?.suggestedBy || "-"}
                            />
                        ) : null}

                        <LeadSourceListItem leadSource={leadSource} />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {!isB2B ? (
                        <>
                            <ListItem
                                label={t("Date of Birth")}
                                value={
                                    data?.dateOfBirth
                                        ? new Date(
                                              data?.dateOfBirth
                                          ).toDateString()
                                        : "-"
                                }
                            />
                            <ListItem
                                label={t("ID Number")}
                                value={data?.idNumber || "-"}
                            />

                            <ListItem
                                label={t("Passport Number")}
                                value={data?.passportNumber || "-"}
                            />
                        </>
                    ) : null}
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListManagerItem
                            label={t<string>("Managed By")}
                            managerId={data?.managedBy?.id!}
                        />
                        <ListRatingItem
                            label={t("Status")}
                            status={data?.status!}
                        />
                        <ListBooleanItem
                            label={t("Stay Updated")}
                            status={data?.enableEmails || false}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6} p={1}>
                    <LabelCreate
                        minHeight="70px"
                        variant="customer"
                        resourceId={customerId ? +customerId : -1}
                    />
                </Grid>
            </Grid>
        </ViewPanel>
    );
};

export default Information;
