import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Residential, Commercial, Land, Other } from "./forms";
import { UploadFileProvider } from "src/contexts/uploadFile";
import { useCallback, useMemo } from "react";
import PreventButton from "src/components/Button/Prevent";
import { IProperties, IPropertiesPOST } from "src/types/properties";

// Form
import FormProvider from "src/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";

interface IFormProps {
    property?: IProperties;
    isLoading: boolean;
    isError: boolean;
    onClear: () => void;
    onSave: (body: IPropertiesPOST) => void;
    onCancel: () => void;
}

// required fields
interface IPropertyYup extends Partial<IProperties> {}

const LoginSchema = Yup.object().shape({});

const getDefaultValues = (property?: IProperties): IPropertyYup => ({});

const usePropertyForm = (property?: IProperties) => {
    const defaultValues = useMemo(() => getDefaultValues(property), [property]);

    const methods = useForm<IPropertyYup>({
        resolver: yupResolver(LoginSchema),
        values: defaultValues,
    });

    const { reset, handleSubmit } = methods;

    return { methods, handleSubmit, reset };
};

export default function Form({
    property,
    isLoading,
    isError,
    onSave,
    onClear,
    onCancel,
}: IFormProps) {
    const { t } = useTranslation();

    const { methods, handleSubmit, reset } = usePropertyForm(property);

    // enums
    const parentCategory = useMemo(
        () => property?.parentCategory?.key,
        [property?.parentCategory]
    );

    const onSubmit = handleSubmit((data) => {
        try {
            onSave(data as unknown as IPropertiesPOST);
            console.log("here!: ", data);
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const handleClear = useCallback(() => {
        reset();
        onClear();
    }, []);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={1} paddingLeft={2} paddingTop={1}>
                {!!property ? (
                    <UploadFileProvider>
                        <Grid container mt={0} spacing={1}>
                            {parentCategory === "RESIDENTIAL" && (
                                <Residential />
                            )}
                            {parentCategory === "COMMERCIAL" && <Commercial />}
                            {parentCategory === "LAND" && <Land />}
                            {parentCategory === "OTHER" && <Other />}
                        </Grid>
                    </UploadFileProvider>
                ) : null}
                <Grid
                    padding={2}
                    container
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={1}
                >
                    <Grid item>
                        <PreventButton
                            // prevent={isCodeOrStateEmpty}
                            // preventMessage={t("Fill in Code and State!").toString()}
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={onCancel}
                        >
                            {t("Cancel")}
                        </PreventButton>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={handleClear}
                        >
                            {t("Clear")}
                        </Button>
                    </Grid>

                    <Grid item>
                        <LoadingButton
                            // TODO:
                            // prevent={isCodeOrStateEmpty}
                            // preventMessage={t("Fill in Code and State!").toString()}
                            loading={isLoading && !isError}
                            variant="contained"
                            startIcon={<SendIcon />}
                            type="submit"
                        >
                            {t("Save")}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
