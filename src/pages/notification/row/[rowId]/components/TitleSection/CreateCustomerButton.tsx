import Link from "@/components/Link";
import { useFindByEmailQuery } from "@/services/customers";
import { ICustomerMini } from "@/types/customer";
import { Button, Skeleton } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import { HideText } from "@/components/styled";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const CustomerModal = dynamic(() => import("@/sections/Customer/Modal"));

// -------------------------------------------------------------------------

const CreateButton = () => {
    const { t } = useTranslation();

    const [isOpen, openModal, closeModal] = useDialog();

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

            {isOpen ? <CustomerModal onClose={closeModal} /> : null}
        </>
    );
};

// -------------------------------------------------------------------------

interface CustomerLinkProps {
    c?: ICustomerMini;
}

const CustomerLink: FC<CustomerLinkProps> = ({ c }) => {
    const fullname = `${c?.firstName || ""} ${c?.lastName || ""}`;
    return <Link href={`/customers/${c?.id}`}>{fullname}</Link>;
};

// -------------------------------------------------------------------------

const useCustomerExists = (email: string) => {
    const { data: customer, isLoading } = useFindByEmailQuery(email);
    return { customer, didFound: Boolean(customer), isLoading };
};

interface Props {
    email: string;
}

const CreateCustomerButton: FC<Props> = ({ email }) => {
    const { customer, didFound, isLoading } = useCustomerExists(email);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    if (didFound) return <CustomerLink c={customer} />;

    return <CreateButton />;
};

export default CreateCustomerButton;
