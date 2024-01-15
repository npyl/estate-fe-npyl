import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddressDetails from "./AddressDetails";
import CustomerInformation from "./CustomerInformation";
import NotesSection from "./NotesSection";
import DemandSection from "./DemandSection";
import { SaveButton } from "src/components/Button/Save";

interface FormProps {
    isError: boolean;
    performSave: () => void;
    resetState: () => void;
    handleCancel: () => void;
}

const Form = ({
    isError,
    performSave,
    resetState,
    handleCancel,
}: FormProps) => {
    const { t } = useTranslation();

    return (
        <div>
            <Grid container paddingTop={1} paddingRight={1} spacing={1}>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <CustomerInformation />
                        <AddressDetails />
                        <NotesSection />
                    </Stack>
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
                    onClick={handleCancel}
                >
                    {t("Cancel")}
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={resetState}
                >
                    {t("Clear")}
                </Button>
                <SaveButton
                    error={isError}
                    loadingPosition="start"
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={performSave}
                >
                    {t("Save")}
                </SaveButton>
            </Stack>
        </div>
    );
};

export default Form;
