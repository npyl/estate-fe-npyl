import useGetCustomer from "@/hooks/customer";
import { IKanbanCard } from "@/types/tasks";
import { useCallback } from "react";

const useTaskFromCustomer = () => {
    const { customer } = useGetCustomer();

    const getTask = useCallback(() => {
        const { id, firstName, lastName } = customer || {};

        const name = `${firstName || ""} ${lastName || ""}`;

        const customerMini = {
            id,
            firstName: customer?.firstName || "",
            lastName: customer?.lastName || "",
        };

        return {
            name,
            customers: [customerMini],
        } as IKanbanCard;
    }, [customer]);

    return { getTask };
};

export default useTaskFromCustomer;
