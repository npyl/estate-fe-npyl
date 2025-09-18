import { useTranslation } from "react-i18next";
import { getBorderColor2 } from "@/theme/borderColor";
import { StyledDialogContent } from "./styled";
import { usePathname } from "next/navigation";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog, { DialogProps } from "@/components/Dialog";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FC, PropsWithChildren } from "react";

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

// ----------------------------------------------------------------------

type Props = PropsWithChildren<DialogProps> & {
    onResetFilter: VoidFunction;
    totalProperties?: number;
};

const FilterMore: FC<Props> = ({
    onResetFilter,
    totalProperties,
    children,
    ...props
}) => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const isPropertyPage = pathname?.includes("property");
    const isCustomerPage = pathname?.includes("customer");

    const buttonLabel = isPropertyPage
        ? `${t("See")} ${totalProperties} ${t("properties")}`
        : isCustomerPage
          ? `${t("See")} ${t("customers")}`
          : "";

    return (
        <Dialog
            maxWidth="lg"
            DialogTitleComponent={StyledDialogTitle}
            DialogContentComponent={StyledDialogContent}
            DialogActionsComponent={StyledDialogActions}
            // ...
            title={t("Filters")}
            content={children}
            actions={
                <>
                    <Button variant="outlined" onClick={onResetFilter}>
                        {t("Clear all")}
                    </Button>
                    <Button variant="contained" onClick={props.onClose}>
                        {buttonLabel}
                    </Button>
                </>
            }
            {...props}
        />
    );
};

export default FilterMore;
