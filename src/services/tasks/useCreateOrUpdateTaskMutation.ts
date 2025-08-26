import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import { tasks } from "./tasks";
import { useAuth } from "@/sections/use-auth";
import { calendar } from "@/services/calendar";
import { properties } from "@/services/properties";
import { customers } from "@/services/customers";
import { errorToast } from "@/components/Toaster";

const baseUrl = `${process.env.NEXT_PUBLIC_PROXY_API}/google`;

const useCreateOrUpdateTaskMutation = () => {
    const { user } = useAuth();
    const userId = user?.id;

    const [isLoading, startLoading, stopLoading] = useDialog();

    const dispatch = useDispatch();

    const cb = useCallback(
        async (b: ICreateOrUpdateTaskReq) => {
            startLoading();

            try {
                const res = await fetch(`${baseUrl}/${userId}/tasks`, {
                    headers: {
                        Authorization: `Bearer  ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                    body: JSON.stringify(b),
                    method: "POST",
                });

                if (!res.ok) throw await res.json();

                dispatch(
                    tasks.util.invalidateTags(
                        Boolean(b.id)
                            ? ["Board", "Card", "AssigneeHistory"]
                            : ["Board", "Card"]
                    )
                );

                if (b.properties?.length && b.properties.length > 0)
                    dispatch(properties.util.invalidateTags(["Tasks"]));

                if (b.customers?.length && b.customers.length > 0)
                    dispatch(customers.util.invalidateTags(["Tasks"]));

                // INFO: make sure we also update events
                if (b.withCalendar)
                    dispatch(calendar.util.invalidateTags(["Events"]));

                stopLoading();

                return true;
            } catch (ex) {
                errorToast("_ERROR_");

                stopLoading();

                return false;
            }
        },
        [userId]
    );

    return [cb, { isLoading }] as const;
};

export { useCreateOrUpdateTaskMutation };
