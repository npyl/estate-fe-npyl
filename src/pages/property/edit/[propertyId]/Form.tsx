import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAll, selectParentCategory } from "src/slices/property";
import CommercialFormSection from "./components/CommercialForm";
import LandFormSection from "./components/LandForm";
import OtherFormSection from "./components/OtherForm";
import ResidentialFormSection from "./components/ResidentialForm";
import { UploadFileProvider } from "src/contexts/uploadFile";
import { MutableRefObject, useCallback, useMemo } from "react";
import { useAutosaveTab } from "src/hooks/useAutosaveTab";
import { SaveButton } from "src/components/Button/Save";
import PreventButton from "src/components/Button/Prevent";

interface IFormProps {
    isError: boolean;
    onAutosave: (bodyRef: MutableRefObject<any>) => void;
    resetEverything: () => void;
    performEdit: () => void;
    handleCancel: () => void;
}

export default function Form({
    isError,
    onAutosave,
    performEdit,
    resetEverything,
    handleCancel,
}: IFormProps) {
    const { t } = useTranslation();

    useAutosaveTab(selectAll, onAutosave);

    // enums
    const parentCategory = useSelector(selectParentCategory);

    const body = useSelector(selectAll);
    const isCodeOrStateEmpty = useMemo(
        () => body?.code?.length === 0 || body?.state?.length === 0,
        [body?.code, body?.state]
    );

    // edit
    const handleSave = useCallback(() => performEdit(), []);

    return (
        <Grid container spacing={1} paddingLeft={2} paddingTop={1}>
            {parentCategory !== "" && (
                <UploadFileProvider>
                    <Grid container mt={0} spacing={1}>
                        {parentCategory === "RESIDENTIAL" && (
                            <ResidentialFormSection />
                        )}
                        {parentCategory === "LAND" && <LandFormSection />}
                        {parentCategory === "COMMERCIAL" && (
                            <CommercialFormSection />
                        )}
                        {parentCategory === "OTHER" && <OtherFormSection />}
                    </Grid>
                </UploadFileProvider>
            )}
            <Grid
                padding={2}
                container
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
            >
                <Grid item>
                    <PreventButton
                        prevent={isCodeOrStateEmpty}
                        preventMessage={t("Fill in Code and State!").toString()}
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                    >
                        {t("Cancel")}
                    </PreventButton>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={resetEverything}
                    >
                        {t("Clear")}
                    </Button>
                </Grid>

                <Grid item>
                    <SaveButton
                        prevent={isCodeOrStateEmpty}
                        preventMessage={t("Fill in Code and State!").toString()}
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
