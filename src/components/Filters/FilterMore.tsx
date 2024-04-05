import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledDialogContent } from "./styled";
import { SpaceBetween } from "../styled";

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onOpen: VoidFunction;
    onClose: VoidFunction;
    onResetFilter: VoidFunction;
};

const changedPropsCount = 5;

export default function FilterMore({ open, onClose, onResetFilter }: Props) {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" open={open} onClose={onClose} scroll={"body"}>
            <DialogTitle>
                <SpaceBetween>
                    <Chip label={changedPropsCount} color={"error"} />
                    <Typography variant="subtitle1">{t("Filters")}</Typography>
                </SpaceBetween>
            </DialogTitle>

            {changedPropsCount > 0 && (
                <StyledDialogContent>
                    {/* <ChosenFilters /> */}
                </StyledDialogContent>
            )}

            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button color={"secondary"} onClick={onResetFilter}>
                    {t("Clear all")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
