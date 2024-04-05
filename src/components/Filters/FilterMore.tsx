import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogProps,
    DialogTitle,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledDialogContent } from "./styled";
import { SpaceBetween } from "../styled";

// ----------------------------------------------------------------------

type Props = DialogProps & {
    onResetFilter: VoidFunction;
};

const changedPropsCount = 5;

export default function FilterMore({
    onResetFilter,
    children,
    ...props
}: Props) {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" scroll="body" {...props}>
            <DialogTitle>
                <SpaceBetween>
                    <Chip label={changedPropsCount} color={"error"} />
                    <Typography variant="subtitle1">{t("Filters")}</Typography>
                </SpaceBetween>
            </DialogTitle>

            <StyledDialogContent>{children}</StyledDialogContent>

            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button color={"secondary"} onClick={onResetFilter}>
                    {t("Clear all")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
