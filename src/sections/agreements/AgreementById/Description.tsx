import { List, ListBooleanItem, ListDateItem } from "@/components/List";
import ListItem from "@/components/List/item";
import { IAgreement } from "@/types/agreements";
import Grid from "@mui/material/Grid";
import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, Paper } from "./styled";

interface Props {
    a: IAgreement;
}

const Description: React.FC<Props> = ({ a }) => {
    const {
        title,
        code, // CA_XXX
        variant,
        language,
        draft,
        keys,
        signed,

        startingDate,
        expirationDate,
        availableAfter,
    } = a || {};

    const { t } = useTranslation();

    return (
        <Grid container component={Paper} p={1}>
            <Grid item component={List} xs={6}>
                <ListItem label={t("Title")} value={title || "-"} />
                <ListItem label={t("Type")} value={variant?.value || "_"} />
            </Grid>
            <Grid item xs={6} component={List}>
                <ListItem label={t("Code")} value={code || "-"} />
                <ListItem
                    label={t("Language")}
                    value={language?.value || "_"}
                />
            </Grid>
            <Divider />
            <Grid item component={List} xs={6}>
                <ListBooleanItem label={t("_draft_")} status={draft} />
                <ListBooleanItem label={t("_signed_")} status={signed} />
            </Grid>
            <Grid item component={List} xs={6}>
                <ListBooleanItem label={t("_keys_")} status={keys} />
            </Grid>
            <Divider />
            <Grid item xs={6} component={List}>
                <ListDateItem label={t("Starting Date")} value={startingDate} />
                <ListDateItem
                    label={t("Available After")}
                    value={availableAfter}
                />
            </Grid>
            <Grid item xs={6} component={List}>
                <ListDateItem
                    label={t("Expiration Date")}
                    value={expirationDate}
                />
            </Grid>
        </Grid>
    );
};

export default Description;
