import { Grid, List } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    ListBooleanItem,
    ListItem,
    ListManagerItem,
    ListRatingItem,
} from "src/components/List";
import { TypeLabels } from "@/components/TypeLabels";
import LabelCreate from "@/sections/LabelCreate";
import useGetCustomer from "@/hooks/customer";
import ViewPanel from "@/components/Panel/View";
import NationalityListItem from "./NationalityListItem";
import LeadSourceListItem from "./LeadSourceListItem";
import { LeadSource } from "@/types/global";

const Information = () => {
    const { t } = useTranslation();

    const { customer: data, customerId } = useGetCustomer();
    const isB2B = Boolean(data?.b2b);
    const label = isB2B ? "B2B Customer Information" : "Customer Information";

    const leadSource = data?.leadSource?.key as LeadSource;

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
                        <ListItem label={t("VAT")} value={data?.afm || "-"} />
                        <ListManagerItem
                            label={t("Managed By").toString()}
                            managerId={data?.managedBy?.id!}
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
                            status={data?.status!}
                        />
                    </List>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <List>
                        <NationalityListItem />

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

                        {leadSource === "CUSTOMER" ? (
                            <ListItem
                                label={t("Suggested by")}
                                value={data?.suggestedBy || "-"}
                            />
                        ) : null}

                        <LeadSourceListItem leadSource={leadSource} />

                        <ListBooleanItem
                            label={t("Stay Updated")}
                            status={data?.enableEmails || false}
                        />

                        <LabelCreate
                            mt={1}
                            ml={3}
                            mr={1}
                            minHeight="70px"
                            variant="customer"
                            resourceId={customerId ? +customerId : -1}
                        />
                    </List>
                </Grid>
            </Grid>
        </ViewPanel>
    );
};

export default Information;
