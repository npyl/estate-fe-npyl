/* eslint-disable react/jsx-key */
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
} from "@mui/material";
import { Placeholder as LabelPlaceholder } from "@/components/Label";
import LabelCreate from "@/sections/LabelCreate";
import { LeadSource } from "@/types/global";
import {
    RHFSelect,
    RHFTextField,
    RHFOnlyNumbers,
    RHFRating,
} from "@/components/hook-form";
import { TranslationType } from "@/types/translation";
import { IUser } from "@/types/user";
import { KeyValue } from "@/types/KeyValue";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import Select from "@/components/hook-form/Select";
import { useTranslation } from "react-i18next";
import StayUpdated from "./StayUpdated";
import RHFManagerAutocomplete from "@/ui/Autocompletes/RHFManager";
import Firm from "./Firm";

const Rating = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                height: "100%",
                px: 3,
                py: 1.5,
                display: "flex",
                justifyContent: "center",
            }}
            flexDirection={"column"}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6">{t("Status")}</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 1.5,
                }}
            >
                <RHFRating name="status" />
            </Box>
        </Box>
    );
};

const getFIELDS = (
    t: TranslationType,
    nationalitiesEnum: KeyValue<string>[],
    leadSourceEnum: KeyValue<string>[],
    leadSource?: LeadSource,
    customerId?: string
) => [
    <RHFTextField fullWidth name="firstName" label={t("First Name") + " *"} />,
    <RHFTextField fullWidth name="lastName" label={t("Last Name") + " *"} />,
    <RHFTextField fullWidth name="email" label={t("Email")} />,
    <RHFOnlyNumbers
        fullWidth
        separateThousands={false}
        name="afm"
        label={t("VAT")}
    />,
    <RHFManagerAutocomplete name="managedBy" />,

    <Firm />,

    <RHFTextField fullWidth name="mobilePhone" label={t("Mobile Phone")} />,
    <RHFTextField fullWidth name="homePhone" label={t("Home Phone")} />,
    <RHFTextField fullWidth name="fax" label={t("Fax")} />,
    <Select
        isEnum
        name="nationality"
        label={t("Nationality")}
        options={nationalitiesEnum}
    />,
    <RHFTextField fullWidth name="idNumber" label={t("ID Number")} />,
    <RHFDatePicker disableFuture name="dateOfBirth" />,
    <RHFTextField
        fullWidth
        name="passportNumber"
        label={t("Passport number")}
    />,
    <FormControl fullWidth variant="outlined">
        <InputLabel>{t("Preferred Language")}</InputLabel>
        <RHFSelect
            isEnum
            fullWidth
            name="preferredLanguage"
            label={t("Preferred Language")}
        >
            <MenuItem value="">{t("Not selected")}</MenuItem>
            <MenuItem value="ENGLISH">{t("English")}</MenuItem>
            <MenuItem value="GREEK">{t("Greek")}</MenuItem>
        </RHFSelect>
    </FormControl>,
    <Select
        isEnum
        name="leadSource"
        label={t("Lead Source")}
        options={leadSourceEnum}
    />,
    leadSource === "CUSTOMER" ? (
        <RHFTextField fullWidth name="suggestedBy" label={t("Suggested by")} />
    ) : null,
    <Rating />,
    customerId ? (
        <LabelCreate variant="customer" resourceId={+customerId} />
    ) : (
        <LabelPlaceholder />
    ),

    <StayUpdated />,
];

export default getFIELDS;
