import {
    Button,
    Dialog,
    DialogActions,
    DialogProps,
    DialogTitle,
    styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { getBorderColor2 } from "@/theme/borderColor";
import { StyledDialogContent } from "./styled";

// ----------------------------------------------------------------------

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    borderBottom: "1px solid",
    borderBottomColor: getBorderColor2(theme),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    borderTop: "1px solid",
    borderTopColor: getBorderColor2(theme),
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[800],

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
}));

const totalPropertiesButtonSx = {
    backgroundColor: "primary.main",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    textTransform: "none",
    px: 3,
};

// ----------------------------------------------------------------------

type Props = DialogProps & {
    onResetFilter: VoidFunction;
    totalProperties?: number;
    onClose: VoidFunction;
};

export default function FilterMore({
    onResetFilter,
    totalProperties,
    onClose,
    children,
    ...props
}: Props) {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="md" onClose={onClose} {...props}>
            <StyledDialogTitle textAlign="center">
                {t("Filters")}
            </StyledDialogTitle>

            <StyledDialogContent>{children}</StyledDialogContent>

            <StyledDialogActions>
                <Button variant="outlined" onClick={onResetFilter}>
                    {t("Clear all")}
                </Button>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={totalPropertiesButtonSx}
                >
                    {t("See")} {totalProperties} {t("properties")}
                </Button>
            </StyledDialogActions>
        </Dialog>
    );
}
