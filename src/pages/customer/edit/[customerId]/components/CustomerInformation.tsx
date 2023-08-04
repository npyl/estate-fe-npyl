import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useAllGlobalsQuery } from "src/services/global";
import { useAllUsersQuery } from "src/services/user";

import { LabelCreate } from "src/components/label";

import {
    selectDateOfBirth,
    selectEmail,
    selectFax,
    selectFirstName,
    selectHomePhone,
    selectIdNumber,
    selectLastName,
    selectLeadSource,
    selectManagedBy,
    selectMobilePhone,
    selectNationality,
    selectPassportNumber,
    selectPreferredLanguage,
    selectStatus,
    selectSuggestedBy,
    setDateOfBirth,
    setEmail,
    setFax,
    // setters
    setManagedBy,
    setSuggestedBy,
    setFirstName,
    setHomePhone,
    setIdNumber,
    setLastName,
    setLeadSource,
    setMobilePhone,
    setNationality,
    setPassportNumber,
    setPreferredLanguage,
    setStatus,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import {
    useAssignLabelToCustomerWithIDMutation,
    useCreateLabelForCustomerWithIDMutation,
    useDeleteLabelForCustomerWithIdMutation,
    useGetLabelsQuery,
} from "src/services/labels";

import { ILabel } from "src/types/label";
import { LeadSource } from "src/types/global";

import CustomerTypeSelect from "./CustomerTypeSelect";
import { useTranslation } from "react-i18next";
import { useLazyGetCustomerLabelsQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CustomerInformation: React.FC<any> = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;

    const enums = useAllGlobalsQuery().data;
    const propertyEnums = enums?.property;
    const managers = useAllUsersQuery().data;

    const leadSourceEnum = enums?.customer?.leadSource;

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const managedBy = useSelector(selectManagedBy);
    const mobilePhone = useSelector(selectMobilePhone);
    const homePhone = useSelector(selectHomePhone);
    const fax = useSelector(selectFax);
    const nationality = useSelector(selectNationality);
    const idNumber = useSelector(selectIdNumber);
    const dateOfBirth = useSelector(selectDateOfBirth);
    const passportNumber = useSelector(selectPassportNumber);
    const preferredLanguage = useSelector(selectPreferredLanguage);
    const leadSource = useSelector(selectLeadSource) as LeadSource;
    const suggestedBy = useSelector(selectSuggestedBy);
    const status = useSelector(selectStatus);

    const { data: labels } = useGetLabelsQuery();
    const customerLabels = labels?.customerLabels;

    // labels
    const [getLabels, { data: assignedLabels }] =
        useLazyGetCustomerLabelsQuery();
    const [assignLabel] = useAssignLabelToCustomerWithIDMutation();
    const [createAndAssignLabel] = useCreateLabelForCustomerWithIDMutation();
    const [deleteLabel] = useDeleteLabelForCustomerWithIdMutation();

    useEffect(() => {
        if (!customerId) return;
        revalidate();
    }, [customerId]);

    const revalidate = () => {
        // TODO: improve this by revalidating automatically (invalidating a tag)
        getLabels(+customerId!);
    };

    const handleLabelClick = (label: ILabel) =>
        label.id &&
        assignLabel({ customerId: +customerId!, labelId: label.id }).then(() =>
            revalidate()
        );
    const handleLabelCreate = (label: ILabel) =>
        createAndAssignLabel({
            customerId: +customerId!,
            labelBody: label,
        }).then(() => revalidate());
    const handleLabelRemove = (index: number) =>
        assignedLabels &&
        assignedLabels[index] &&
        assignedLabels[index].id &&
        deleteLabel({
            customerId: +customerId!,
            labelId: assignedLabels[index].id!,
        }).then(() => revalidate());

    if (
        !enums ||
        !customerLabels ||
        !propertyEnums ||
        !leadSourceEnum ||
        !managers
    )
        return null;

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0.5,
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
                <Typography variant="h6">
                    {t("Customer Information")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("First Name")}
                            value={firstName}
                            onChange={(e) => {
                                dispatch(setFirstName(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Last Name")}
                            value={lastName}
                            onChange={(e) => {
                                dispatch(setLastName(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Email")}
                            value={email}
                            onChange={(e) => {
                                dispatch(setEmail(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Managed By")}</InputLabel>
                            <Select
                                value={managedBy}
                                label={t("Managed By")}
                                onChange={(e) => {
                                    dispatch(setManagedBy(e.target.value));
                                }}
                            >
                                {managers.map((manager, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={manager.id}
                                        >
                                            {manager.firstName +
                                                " " +
                                                manager.lastName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Mobile Phone")}
                            value={mobilePhone}
                            onChange={(value) => {
                                dispatch(setMobilePhone(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Home Phone")}
                            value={homePhone}
                            onChange={(value) => {
                                dispatch(setHomePhone(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Fax")}
                            value={fax}
                            onChange={(value) => {
                                dispatch(setFax(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Nationality")}
                            value={nationality}
                            onChange={(e) => {
                                dispatch(setNationality(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("ID Number")}
                            value={idNumber}
                            onChange={(e) => {
                                dispatch(setIdNumber(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Date of Birth")}
                            value={dateOfBirth}
                            onChange={(e) => {
                                dispatch(setDateOfBirth(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Passport Number")}
                            value={passportNumber}
                            onChange={(e) => {
                                dispatch(setPassportNumber(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Preferred Language")}
                            value={preferredLanguage}
                            onChange={(e) => {
                                dispatch(setPreferredLanguage(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Lead Source")}</InputLabel>
                            <Select
                                value={leadSource}
                                label={t("Lead Source")}
                                onChange={(e) => {
                                    dispatch(setLeadSource(e.target.value));
                                }}
                            >
                                {leadSourceEnum.map((leadSource, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={leadSource}
                                        >
                                            {leadSource}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {leadSource === "Customer" && (
                            <TextField
                                fullWidth
                                label={t("Suggested by")}
                                value={suggestedBy}
                                onChange={(e) => {
                                    dispatch(setSuggestedBy(e.target.value));
                                }}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6}>
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
                                <Typography variant="h6">
                                    {" "}
                                    {t("Status")}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    py: 1.5,
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={status}
                                    onChange={(_event, newValue) => {
                                        dispatch(setStatus(newValue));
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <LabelCreate
                            existingLabels={customerLabels}
                            assignedLabels={assignedLabels || []}
                            newLabels={[]}
                            onLabelClick={handleLabelClick}
                            onLabelCreate={handleLabelCreate}
                            onRemoveAssignedLabel={handleLabelRemove}
                            onRemoveNewLabel={() => {}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomerTypeSelect />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default CustomerInformation;
