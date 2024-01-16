import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddressDetails from "./AddressDetails";
import CustomerInformation from "./CustomerInformation";
import NotesSection from "./NotesSection";
import DemandSection from "./Demand";

// Forms
import FormProvider from "src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ICustomerPOST } from "src/types/customer";
import { useCallback } from "react";
import { LoadingButton } from "@mui/lab";

interface ICustomerLocationYup {
    street: string;
    number: string;
    city: string;
}

// required fields
interface ICustomerYup extends Partial<Omit<ICustomerPOST, "location">> {
    firstName: string;
    lastName: string;
    email: string;
    managedBy: number;
    mobilePhone: string;
    location: ICustomerLocationYup;

    nationality: string;
    preferredLanguage: string;
    leadSource: string;
}

interface FormProps {
    isLoading: boolean;
    isError: boolean;
    onSave: (body: ICustomerPOST) => void;
    onCancel: () => void;
}

const LoginSchema = Yup.object().shape({
    // Customer Information
    firstName: Yup.string().required("Enter First Name"),
    lastName: Yup.string().required("Enter Last Name"),
    email: Yup.string()
        .required("Email is required")
        .email("Email must be a valid email address"),
    managedBy: Yup.number().positive("Please select a manager").required(),
    mobilePhone: Yup.string().required("Please enter Mobile Phone"),

    // TODO: see if we can get these to be optional
    nationality: Yup.string().required(),
    preferredLanguage: Yup.string().required(),
    leadSource: Yup.string().required(),

    // Address
    location: Yup.object().shape({
        street: Yup.string().required("Street is required"),
        number: Yup.string().required("Number is required"),
        city: Yup.string().required("City is required"),
    }),
});

const defaultValues: ICustomerYup = {
    firstName: "",
    lastName: "",
    email: "",
    managedBy: -1,
    mobilePhone: "",
    location: {
        street: "",
        number: "",
        city: "",
    },

    status: 0,

    lessor: false,
    leaser: false,
    buyer: false,
    seller: false,

    // prevent nulls:
    homePhone: "",
    fax: "",
    idNumber: "",
    dateOfBirth: "",
    passportNumber: "",

    // WARN: BE crashes if these are: ""
    nationality: "",
    preferredLanguage: "",
    leadSource: "",

    demands: [],
};

const Form = ({ isLoading, isError, onSave, onCancel }: FormProps) => {
    const { t } = useTranslation();

    const methods = useForm<ICustomerYup>({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        // formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit((data) => {
        try {
            onSave(data as ICustomerPOST);
            console.log("here!: ", data);
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const handleClear = useCallback(() => reset(), []);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container paddingTop={1} paddingRight={1} spacing={1}>
                <Grid item xs={6} display="flex" flexDirection="column" gap={1}>
                    <CustomerInformation />
                    <AddressDetails />
                    <NotesSection />
                </Grid>
                <Grid item xs={6}>
                    <DemandSection />
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
                    type="submit"
                >
                    {t("Save")}
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
};

export default Form;
