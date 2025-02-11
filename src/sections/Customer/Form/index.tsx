import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";

import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { FC, useCallback, useEffect, useMemo } from "react";
import { demandMapper } from "src/mappers/demand";
import { ICustomer, ICustomerPOST } from "src/types/customer";

// Sections
import AddressDetails from "./AddressDetails";
import CustomerInformation from "./CustomerInformation";
import NotesSection from "./NotesSection";

// Forms
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { TranslationType } from "@/types/translation";
import { ICustomerYup } from "./types";

interface FormProps {
    compact?: boolean;

    customer?: ICustomer;
    isLoading: boolean;
    isError: boolean;
    onSave: (body: ICustomerPOST) => void;
    onCancel: () => void;
}

const getLoginSchema = (t: TranslationType) =>
    Yup.object().shape({
        firstName: Yup.string().required(t<string>("First Name is required")),
        lastName: Yup.string().required(t<string>("Last Name is required")),
        email: Yup.string()
            .email(t<string>("Email must be a valid email address"))
            .optional(),
        afm: Yup.string()
            .test(
                "length",
                t<string>("VAT must be empty or exactly 9 digits"),
                (value) => !value || value.length === 9
            )
            .optional(),
    });

const getDefaultValues = (customer?: ICustomer): ICustomerYup => ({
    id: customer?.id,

    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
    afm: customer?.afm || "",
    managedBy: customer?.managedBy?.id || "",
    mobilePhone: customer?.mobilePhone || "",

    location: {
        street: customer?.location?.street || "",
        number: customer?.location?.number || "",
        city: customer?.location?.city || "",
    },

    status: customer?.status || 0,

    lessor: customer?.lessor || false,
    leaser: customer?.leaser || false,
    buyer: customer?.buyer || false,
    seller: customer?.seller || false,

    // prevent nulls:
    homePhone: customer?.homePhone || "",
    fax: customer?.fax || "",
    idNumber: customer?.idNumber || "",
    dateOfBirth: customer?.dateOfBirth,
    passportNumber: customer?.passportNumber || "",

    // WARN: BE crashes if these are: "" (therefore I have them required)
    nationality: customer?.nationality?.key || "",
    preferredLanguage: customer?.preferredLanguage?.key || "",
    leadSource: customer?.leadSource?.key || "",

    demands:
        customer?.demands && customer?.demands?.length > 0
            ? customer?.demands?.map(demandMapper)
            : [],

    // INFO: this field will only contain data on customer creation
    notes: [],
});

const useCustomerForm = (customer?: ICustomer) => {
    const { t } = useTranslation();

    const defaultValues = useMemo(() => getDefaultValues(customer), [customer]);

    const LoginSchema = useMemo(() => getLoginSchema(t), [t]);

    const methods = useForm<ICustomerYup>({
        resolver: yupResolver(LoginSchema),
        values: defaultValues,
    });

    const haveError = useMemo(
        () => Object.keys(methods.formState.errors).length > 0,
        [methods.formState.errors]
    );

    // Scroll to top on error
    useEffect(() => {
        if (haveError) window.scrollTo(0, 0);
    }, [haveError]);

    return { methods };
};

const COLUMN_GRID = (compact: boolean) =>
    compact
        ? {
              lg: 12,
          }
        : {};

const Form: FC<FormProps> = ({
    compact = false,

    customer,
    isLoading,
    isError,

    onSave,
    onCancel,
}) => {
    const { t } = useTranslation();

    const { methods } = useCustomerForm(customer);

    // INFO: this is a nested-form so make sure we do not use the type="submit" method because it triggers a submit event to the parent form aswell
    const handleSubmit = methods.handleSubmit((data: ICustomerYup) => {
        try {
            onSave({
                ...(data as ICustomerPOST),
                // TODO: see if this can be done cleaner (and change managedBy to just ?: number)
                managedBy: (data?.managedBy as number) || undefined,
                nationality: data?.nationality || undefined,
                preferredLanguage: data?.preferredLanguage || undefined,
                leadSource: data?.leadSource || undefined,
            });
        } catch (error) {
            console.error(error);
            methods.reset();
        }
    });

    const handleClear = useCallback(() => methods.reset(), []);

    return (
        <form>
            <FormProvider {...methods}>
                <Grid container paddingTop={1} paddingRight={1} spacing={1}>
                    <Grid item xs={12} lg={6} {...COLUMN_GRID(compact)}>
                        <CustomerInformation />
                    </Grid>
                    <Grid item xs={12} lg={6} {...COLUMN_GRID(compact)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AddressDetails />
                            </Grid>
                            <Grid item xs={12}>
                                <NotesSection isEditMode={!!customer} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Stack
                    my={2}
                    display="flex"
                    justifyContent="flex-end"
                    direction="row"
                    spacing={1}
                    sx={{
                        bgcolor: "background.neutral",
                        width: "100%",
                        p: 0.5,
                        alignSelf: "flex-end",
                        borderRadius: "10px",
                        position: "sticky",
                        zIndex: 1000,
                        bottom: 0,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={handleClear}
                    >
                        {t("Clear")}
                    </Button>

                    <LoadingButton
                        loading={isLoading && !isError}
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={handleSubmit}
                    >
                        {t("Save")}
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </form>
    );
};

export default Form;
