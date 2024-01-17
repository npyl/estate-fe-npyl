import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Residential, Commercial, Land, Other } from "./forms";
import { UploadFileProvider } from "src/contexts/uploadFile";
import { useCallback, useMemo } from "react";
import { SaveButton } from "src/components/Button/Save";
import PreventButton from "src/components/Button/Prevent";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import { reset } from "numeral";

interface IFormProps {
    property?: IProperties;
    isLoading: boolean;
    isError: boolean;
    onClear: () => void;
    onSave: (body: IPropertiesPOST) => void;
    onCancel: () => void;
}

export default function Form({
    property,
    isLoading,
    isError,
    onSave,
    onClear,
    onCancel,
}: IFormProps) {
    const { t } = useTranslation();

    // enums
    const parentCategory = useMemo(
        () => property?.parentCategory?.key,
        [property?.parentCategory]
    );

    const handleClear = useCallback(() => {
        reset();
        onClear();
    }, []);

    const handleSave = useCallback(() => {
        // onSave();
    }, []);

    return (
        <Grid container spacing={1} paddingLeft={2} paddingTop={1}>
            {!!property ? (
                <UploadFileProvider>
                    <Grid container mt={0} spacing={1}>
                        {parentCategory === "RESIDENTIAL" && <Residential />}
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
                    <SaveButton
                        // prevent={isCodeOrStateEmpty}
                        // preventMessage={t("Fill in Code and State!").toString()}
                        error={isError}
                        loadingPosition="start"
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={handleSave}
                    >
                        {t("Save")}
                    </SaveButton>
                </Grid>
            </Grid>
        </Grid>
    );
}
