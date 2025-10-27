import useDialog from "@/hooks/useDialog";
import { ViewHeaderProps } from "@/ui/ViewHeader";
import { useClonePropertyMutation } from "@/services/properties";
import ConfirmDialog from "@/ui/Dialog/Confirm";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { ComponentType } from "react";
import { useTranslation } from "react-i18next";

type ViewHeader = ComponentType<ViewHeaderProps>;

const WithClone = (Cell: ViewHeader) => {
    const WrappedComponent = (
        props: Omit<ViewHeaderProps, "isProperty" | "isCustomer" | "onClone">
    ) => {
        const { t } = useTranslation();

        const [cloneProperty] = useClonePropertyMutation();

        const [isOpen, open, close] = useDialog();

        const router = useRouter();
        const { propertyId } = router.query;

        const onConfirm = () => {
            cloneProperty(+propertyId!)
                .unwrap()
                .then((newPropertyId) =>
                    router.push(`/property/edit/${newPropertyId}`)
                );
            close();
        };

        return (
            <>
                <Cell isProperty {...props} onClone={open} />

                {isOpen ? (
                    <ConfirmDialog
                        onClose={close}
                        title={t("CLONE_TITLE")}
                        actions={
                            <Button variant="contained" onClick={onConfirm}>
                                {t("Confirm")}
                            </Button>
                        }
                    />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithClone(View)`;

    return WrappedComponent;
};

export default WithClone;
