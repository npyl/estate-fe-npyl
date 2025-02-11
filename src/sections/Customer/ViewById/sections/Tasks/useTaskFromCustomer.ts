import { useGetCustomerByIdQuery } from "@/services/customers";
import { IKanbanCard } from "@/types/tasks";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const useTaskFromCustomer = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const { customerId } = router.query;

    const { data: customer } = useGetCustomerByIdQuery(+customerId!);

    const getTask = useCallback(() => {
        const NAME = t("Task for customer");

        const fullname = `${customer?.firstName || ""} ${
            customer?.lastName || ""
        }`;

        const name = `${NAME} (${fullname})`;

        const customerMini = {
            id: customer?.id,
            firstName: customer?.firstName || "",
            lastName: customer?.lastName || "",
        };

        return {
            name,
            customers: [customerMini],
        } as IKanbanCard;
    }, [customer?.id, customerId]);

    return { getTask };
};

export default useTaskFromCustomer;
