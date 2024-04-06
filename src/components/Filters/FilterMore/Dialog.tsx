import { SpaceBetween } from "@/components/styled";
import {
    Badge,
    Button,
    ButtonProps,
    Chip,
    Dialog,
    DialogActions,
    DialogProps,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledDialogContent } from "../styled";

// ----------------------------------------------------------------------

type Props = DialogProps & {
    changedFiltersCount: number;
    onResetFilter: VoidFunction;
};

export default function FilterMore({
    changedFiltersCount,
    onResetFilter,
    children,
    ...props
}: Props) {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" scroll="body" {...props}>
            <DialogTitle>
                <SpaceBetween>
                    <Chip label={changedFiltersCount} color={"error"} />
                    <Typography variant="subtitle1">{t("Filters")}</Typography>
                </SpaceBetween>
            </DialogTitle>

            <StyledDialogContent>
                <Stack spacing={2}>{children}</Stack>
            </StyledDialogContent>

            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button color={"secondary"} onClick={onResetFilter}>
                    {t("Clear all")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
