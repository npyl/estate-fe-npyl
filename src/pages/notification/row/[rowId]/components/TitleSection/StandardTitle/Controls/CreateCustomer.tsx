import { ICustomer } from "@/types/customer";
import { Button, Skeleton } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import { HideText } from "@/components/styled";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { ContactNotificationExtended } from "@/types/notification";
import useCustomerExists from "../../../../CustomerName/useCustomerExists";
const CustomerModal = dynamic(() => import("@/sections/Customer/Modal"));

// -------------------------------------------------------------------------

interface CreateButtonProps {
    data?: ContactNotificationExtended;
}

const CreateButton: FC<CreateButtonProps> = ({ data }) => {
    const { t } = useTranslation();

    const [isOpen, openModal, closeModal] = useDialog();

    const customer = useMemo(() => {
        const parts = data?.customerName?.split(" ");
        return {
            firstName: parts?.[0] || "",
            lastName: parts?.[1] || "",
            email: data?.customerEmail || "",
        } as ICustomer;
    }, [data]);

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
                <CustomerModal customer={customer} onClose={closeModal} />
            ) : null}
        </>
    );
};

// -------------------------------------------------------------------------

interface Props {
    data: ContactNotificationExtended;
}

const CreateCustomerButton: FC<Props> = ({ data }) => {
    const { didFound, isLoading } = useCustomerExists(data?.customerEmail);
    if (isLoading) return <Skeleton width="150px" height="58px" />;
    if (didFound) return null;
    return <CreateButton data={data} />;
};

export default CreateCustomerButton;
