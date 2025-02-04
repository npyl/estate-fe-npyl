import { ICustomer } from "@/types/customer";
import { Button, Skeleton } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import { HideText } from "@/components/styled";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import useCustomerExists from "../../../CustomerName/useCustomerExists";
import useGetNotification from "@/sections/Notification/useGetNotification";
import useCreateCb from "./useCreateCb";
const CustomerModal = dynamic(() => import("@/sections/Customer/Modal"));

// -------------------------------------------------------------------------

const CreateButton = () => {
    const { t } = useTranslation();

    const { notification } = useGetNotification();
    const customerName = notification?.customerName;
    const email = notification?.customerEmail || "";

    const demand = notification?.stayUpdatedDetails?.customerDemand;

    const [isOpen, openModal, closeModal] = useDialog();

    const getCustomer = () => {
        const parts = customerName?.split(" ");
        return {
            firstName: parts?.[0] || "",
            lastName: parts?.[1] || "",
            email,
            demands: demand ? [demand] : [],
        } as ICustomer;
    };

    const [createCb, { isLoading, isError }] = useCreateCb();

    return (
        <>
            <Button
                sx={{
                    textWrap: "nowrap",
                    ...HideText,
                }}
                color="info"
                variant="contained"
                startIcon={<PersonIcon />}
                onClick={openModal}
            >
                {t("Create Customer")}
            </Button>

            {isOpen ? (
                <CustomerModal
                    customer={getCustomer()}
                    createCb={createCb}
                    isLoading={isLoading}
                    isError={isError}
                    onClose={closeModal}
                />
            ) : null}
        </>
    );
};

// -------------------------------------------------------------------------

const CreateCustomerButton = () => {
    const { didFound, isLoading } = useCustomerExists();
    if (isLoading) return <Skeleton width="150px" height="58px" />;
    if (didFound) return null;
    return <CreateButton />;
};

export default CreateCustomerButton;
