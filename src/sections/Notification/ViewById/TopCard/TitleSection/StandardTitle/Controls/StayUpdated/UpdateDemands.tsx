import { HideText } from "@/components/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import useDialog from "@/hooks/useDialog";
import CustomerModal from "@/sections/Customer/Modal";
import { useCreateOrUpdateCustomerMutation } from "@/services/customers";
import { useCallback } from "react";
import { ICustomerPOST } from "@/types/customer";

const UpdateDemandsButton = () => {
    const { t } = useTranslation();

    const [isOpen, openModal, closeModal] = useDialog();

    const [create, { isLoading, isError }] =
        useCreateOrUpdateCustomerMutation();
    const createCb = useCallback(async (d: ICustomerPOST) => {
        return await create(d).unwrap();
    }, []);

    return (
        <>
            <LoadingButton
                loading={isLoading}
                disabled={isLoading}
                sx={{
                    textWrap: "nowrap",
                    ...HideText,
                }}
                color="info"
                variant="contained"
                startIcon={<PersonIcon />}
                onClick={openModal}
            >
                {t("Update Demands")}
            </LoadingButton>

            {isOpen ? (
                <CustomerModal
                    customer={{} as any}
                    createCb={createCb}
                    isLoading={isLoading}
                    isError={isError}
                    onClose={closeModal}
                />
            ) : null}
        </>
    );
};

export default UpdateDemandsButton;
