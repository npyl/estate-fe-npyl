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
import { MutableRefObject, useEffect } from "react";
import { useAutosaveTab } from "src/hooks/useAutosaveTab";
import { LoadingButton } from "@mui/lab";
import { SaveButton } from "../../components/SaveButton";

interface IFormProps {
    isLoading: boolean;
    onAutosave: (bodyRef: MutableRefObject<any>) => void;
    resetEverything: () => void;
    performEdit: () => void;
    handleCancel: () => void;
}
export default function Form({
    isLoading,
    onAutosave,
    performEdit,
    resetEverything,
    handleCancel,
}: IFormProps) {
    const { t } = useTranslation();

    useAutosaveTab(selectAll, onAutosave);

    // enums
    const parentCategory = useSelector(selectParentCategory);

    // create our property draft
    const handleSave = () => performEdit();

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
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                    >
                        {t("Cancel")}
                    </Button>
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
                        loading={isLoading}
                        disabled={isLoading}
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
