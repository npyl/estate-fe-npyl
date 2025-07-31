/* eslint-disable react/jsx-key */
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Placeholder as LabelPlaceholder } from "@/components/Label";
import LabelCreate from "@/sections/LabelCreate";
import { LeadSource } from "@/types/global";
import { RHFSelect, RHFOnlyNumbers } from "@/components/hook-form";
import RHFTextField from "@/components/hook-form/dynamic/RHFTextField";
import { TranslationType } from "@/types/translation";
import { KeyValue } from "@/types/KeyValue";
import RHFDatePicker from "@/components/hook-form/RHFDatePicker";
import Select from "@/components/hook-form/Select";
import StayUpdated from "./StayUpdated";
import RHFManagerAutocomplete from "@/ui/Autocompletes/RHFManager";
import Rating from "./Rating";
import { FIRSTNAME_ID, LASTNAME_ID } from "../constants";

const WITH = (C: any, onOff: boolean) => (onOff ? [C] : []);

const getFIELDS = (
    t: TranslationType,
    isB2B: boolean,
    nationalitiesEnum: KeyValue<string>[],
    leadSourceEnum: KeyValue<string>[],
    leadSource?: LeadSource,
    customerId?: string
) => [
    <RHFTextField
        data-testid={FIRSTNAME_ID}
        fullWidth
        name="firstName"
        label={t("First Name") + " *"}
    />,
    ...WITH(
        <RHFTextField
            data-testid={LASTNAME_ID}
            fullWidth
            name="lastName"
            label={t("Last Name") + " *"}
        />,
        !isB2B
    ),
    <RHFTextField fullWidth name="email" label={t("Email")} />,
    <RHFOnlyNumbers
        fullWidth
        separateThousands={false}
        name="afm"
        label={t("VAT")}
    />,
    <RHFManagerAutocomplete name="managedBy" />,

    <RHFTextField fullWidth name="mobilePhone" label={t("Mobile Phone")} />,
    <RHFTextField fullWidth name="homePhone" label={t("Home Phone")} />,
    <RHFTextField fullWidth name="fax" label={t("Fax")} />,
    <Select
        isEnum
        name="nationality"
        label={t("Nationality")}
        options={nationalitiesEnum}
    />,

    ...WITH(
        <RHFTextField fullWidth name="idNumber" label={t("ID Number")} />,
        !isB2B
    ),
    ...WITH(<RHFDatePicker disableFuture name="dateOfBirth" />, !isB2B),
    ...WITH(
        <RHFTextField
            fullWidth
            name="passportNumber"
            label={t("Passport number")}
        />,
        !isB2B
    ),

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

    <StayUpdated />,

    customerId ? (
        <LabelCreate variant="customer" resourceId={+customerId} />
    ) : (
        <LabelPlaceholder />
    ),
    <Rating />,
];

export default getFIELDS;
