import { ICustomerPOST } from "@/types/customer";
import { useCallback } from "react";
import useGetNotification from "@/sections/Notification/useGetNotification";
import {
    useCreateOrUpdateCustomerFromStayUpdatedMutation,
    useCreateOrUpdateCustomerMutation,
} from "@/services/customers";

const useCreateCb = () => {
    const { notificationId, notification } = useGetNotification();
    const { type } = notification || {};

    const [create0, other0] = useCreateOrUpdateCustomerMutation();
    const [create1, other1] =
        useCreateOrUpdateCustomerFromStayUpdatedMutation();

    const createCb = useCallback(
        async (body: ICustomerPOST) => {
            const cb = type?.key === "STAY_UPDATED" ? create1 : create0;

            const req =
                type?.key === "STAY_UPDATED" ? { notificationId, body } : body;

            const res = await cb(req).unwrap();

            return res;
        },
        [notificationId, type?.key]
    );

    const other = type?.key === "STAY_UPDATED" ? other1 : other0;

    return [createCb, other] as const;
};

export default useCreateCb;
