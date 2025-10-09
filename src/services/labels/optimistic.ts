import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { filesApiSlice, properties } from "@/services/properties";
import { customers } from "@/services/customers";
import { DeleteLabelProps } from "./types";
import { tasks } from "@/services/tasks";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: MutationLifecycleApi<Req, BaseQueryFn, Res, "labels">
) => Promise<void>;

type TDeleteCb = OptimisticCb<DeleteLabelProps, void>;

const optimisticDelete: TDeleteCb = async (
    { resource, resourceId, labelId },
    { dispatch, queryFulfilled }
) => {
    let res;

    if (resource === "property") {
        res = dispatch(
            properties.util.updateQueryData(
                "getPropertyLabels",
                resourceId,
                (draft) => {
                    return draft.filter((l) => l.id !== labelId);
                }
            )
        );
    } else if (resource === "customer") {
        res = dispatch(
            customers.util.updateQueryData(
                "getCustomerLabels",
                resourceId,
                (draft) => {
                    return draft.filter((l) => l.id !== labelId);
                }
            )
        );
    } else if (resource === "document") {
        res = dispatch(
            filesApiSlice.util.updateQueryData(
                "getPropertyDocuments",
                resourceId,
                (draft) => {
                    return draft.map((d) => ({
                        ...d,
                        labels:
                            d.labels?.filter(({ id }) => id !== labelId) || [],
                    }));
                }
            )
        );
    } else if (resource === "ticket") {
        res = dispatch(
            tasks.util.updateQueryData("getCardLabels", resourceId, (draft) => {
                return draft.filter(({ id }) => id !== labelId);
            })
        );
    }

    try {
        await queryFulfilled;
    } catch {
        res?.undo();
    }
};

export { optimisticDelete };
