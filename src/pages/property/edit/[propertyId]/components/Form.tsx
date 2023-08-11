import { Grid, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import { selectParentCategory } from "src/slices/property";
import CommercialFormSection from "./components/CommercialForm";
import LandFormSection from "./components/LandForm";
import OtherFormSection from "./components/OtherForm";
import ResidentialFormSection from "./components/ResidentialForm";
import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface IFormProps {
    resetEverything: () => void;
    performUpload: () => void;
    handleCancel: () => void;
}
export default function Form({
    performUpload,
    resetEverything,
    handleCancel,
}: IFormProps) {
    const { t } = useTranslation();

    // enums
    const parentCategory = useSelector(selectParentCategory);

    const handleClick = () => {
        // create our property draft
        performUpload();
    };
    return (
        <Grid container spacing={1} paddingLeft={2} paddingTop={3}>
            {parentCategory !== "" && (
                <Grid container mt={0} spacing={1}>
                    {parentCategory === "Residential" && (
                        <ResidentialFormSection />
                    )}
                    {parentCategory === "Land" && <LandFormSection />}
                    {parentCategory === "Commercial" && (
                        <CommercialFormSection />
                    )}
                    {parentCategory === "Other" && <OtherFormSection />}
                </Grid>
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
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleClick}
                    >
                        {t("Save")}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
