import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddressDetails from "./AddressDetails";
import { selectLeaser, selectBuyer, selectDemand } from "src/slices/customer";
import CustomerInformation from "./CustomerInformation";
import DemandForm from "./DemandForm";
import NonPriorityFeatures from "./NonPriorityFeatures";
import NotesSection from "./NotesSection";
import PriorityFeatures from "./PriorityFeatures";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface FormProps {
    performUpload: () => void;
    resetState: () => void;
    handleCancel: () => void;
}

const Form = ({ performUpload, resetState, handleCancel }: FormProps) => {
    const { t } = useTranslation();

    const demand = useSelector(selectDemand);
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);

    const parentCategory = demand?.filters?.parentCategory;

    const handleClick = async () => {
        performUpload && performUpload();
    };

    return (
        <Grid paddingTop={1} paddingRight={0} container spacing={1}>
            <Grid container item paddingTop={1} paddingRight={1} spacing={1}>
                <Grid item xs={6} order={"row"}>
                    <Stack spacing={1}>
                        <CustomerInformation />
                        <AddressDetails />
                        <NotesSection />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <DemandForm />
                        {(leaser || buyer) && parentCategory && (
                            <>
                                <PriorityFeatures
                                    parentCategory={parentCategory}
                                />
                                <NonPriorityFeatures
                                    parentCategory={parentCategory}
                                />
                            </>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <Grid item xs={12} padding={2}>
                <Grid
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
                            onClick={() => resetState()}
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
        </Grid>
    );
};

export default Form;
