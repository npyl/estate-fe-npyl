import {
    Badge,
    Button,
    ButtonProps,
    Chip,
    Dialog,
    DialogActions,
    DialogProps,
    DialogTitle,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledDialogContent, StyledPriceButton } from "./styled";
import { SpaceBetween } from "../styled";
import TuneIcon from "@mui/icons-material/Tune";

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

// -----------------------------------------------------------------------------

interface FilterMoreButtonProps extends ButtonProps {
    changedFiltersCount: number;
}

export const FilterMoreButton = ({
    changedFiltersCount,
    ...props
}: FilterMoreButtonProps) => (
    <StyledPriceButton open={false} disableRipple color="inherit" {...props}>
        <Badge badgeContent={changedFiltersCount} color="error">
            <TuneIcon />
        </Badge>
    </StyledPriceButton>
);
