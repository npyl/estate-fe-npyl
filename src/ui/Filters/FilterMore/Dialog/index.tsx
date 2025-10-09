import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import Dialog, { DialogProps } from "@/components/Dialog";
import Button from "@mui/material/Button";
import { FC, PropsWithChildren } from "react";
import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from "./styled";

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
