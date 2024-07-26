import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";

import { useTranslation } from "react-i18next";

import { LoadingButton } from "@mui/lab";
import { useCallback, useEffect, useMemo } from "react";
import { demandMapper } from "src/mappers/demand";
import { ICustomer, ICustomerPOST } from "src/types/customer";

// Sections
import AddressDetails from "./AddressDetails";
import CustomerInformation from "./CustomerInformation";
import NotesSection from "./NotesSection";

// Forms
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "src/components/hook-form";
import * as Yup from "yup";
import dayjs from "dayjs";

interface ICustomerLocationYup {
    street: string;
    number: string;
    city: string;
}

// required fields
interface ICustomerYup
    extends Partial<Omit<ICustomerPOST, "location" | "managedBy">> {
    firstName: string;
    lastName: string;
    managedBy?: string | number;
    location?: ICustomerLocationYup;
}

interface FormProps {
    customer?: ICustomer;
    isLoading: boolean;
    isError: boolean;
    onSave: (body: ICustomerPOST) => void;
    onCancel: () => void;
}

const LoginSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Email must be a valid email address").optional(),
});

const getDefaultValues = (customer?: ICustomer): ICustomerYup => ({
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    email: customer?.email || "",
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
    const defaultValues = useMemo(() => getDefaultValues(customer), [customer]);

    const methods = useForm<ICustomerYup>({
        resolver: yupResolver(LoginSchema),
        values: defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { errors },
    } = methods;

    const haveError = useMemo(() => Object.keys(errors).length > 0, [errors]);

    // Scroll to top on error
    useEffect(() => {
        if (haveError) window.scrollTo(0, 0);
    }, [haveError]);

    return { methods, handleSubmit, reset };
};

const Form = ({
    customer,
    isLoading,
    isError,
    onSave,
    onCancel,
}: FormProps) => {
    const { t } = useTranslation();

    const { methods, handleSubmit, reset } = useCustomerForm(customer);

    const onSubmit = handleSubmit((data: ICustomerYup) => {
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
            reset();
        }
    });

    const handleClear = useCallback(() => reset(), []);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container paddingTop={1} paddingRight={1} spacing={1}>
                <Grid item xs={12} lg={6}>
                    <CustomerInformation />
                </Grid>
                <Grid item xs={12} lg={6}>
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
                    onClick={onSubmit}
                >
                    {t("Save")}
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
};

export default Form;
