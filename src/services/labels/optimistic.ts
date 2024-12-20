import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { filesApiSlice, properties } from "@/services/properties";
import { customers } from "@/services/customers";
import {
    DeleteLabelProps,
    ILabelForResourceReq,
    ILabelForResourceRes,
} from "./types";
import { labels } from ".";
import { tasks } from "@/services/tasks";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: MutationLifecycleApi<Req, BaseQueryFn, Res, "labels">
) => void;

type TCreateCb = OptimisticCb<
    ILabelForResourceReq,
    ILabelForResourceRes | void
>;
type TDeleteCb = OptimisticCb<DeleteLabelProps, void>;

const optimisticCreate: TCreateCb = async (
    { resource, resourceId, body },
    { dispatch, queryFulfilled }
) => {
    let assignRes;
    const isAssign = Boolean(resourceId);

    //
    //  Create
    //
    const createRes = dispatch(
        labels.util.updateQueryData("getLabels", undefined, (draft) => {
            if (resource === "property") {
                draft.propertyLabels.push({
                    ...body,
                    id: draft.propertyLabels.length,
                });
            }
            if (resource === "customer") {
                draft.customerLabels.push({
                    ...body,
                    id: draft.propertyLabels.length,
                });
            }
            if (resource === "document") {
                draft.documentLabels.push({
                    ...body,
                    id: draft.propertyLabels.length,
                });
            }
            if (resource === "ticket") {
                draft.ticketLabels.push({
                    ...body,
                    id: draft.propertyLabels.length,
                });
            }
        })
    );

    //
    //  Assign
    //
    if (isAssign) {
        if (resource === "property") {
            assignRes = dispatch(
                properties.util.updateQueryData(
                    "getPropertyLabels",
                    resourceId!,
                    (draft) => {
                        draft.push({
                            ...body,
                            id: draft?.length ?? 1,
                        });
                    }
                )
            );
        } else if (resource === "customer") {
            assignRes = dispatch(
                customers.util.updateQueryData(
                    "getCustomerLabels",
                    resourceId!,
                    (draft) => {
                        draft.push({
                            ...body,
                            id: draft?.length ?? 1,
                        });
                    }
                )
            );
        } else if (resource === "document") {
            assignRes = dispatch(
                filesApiSlice.util.updateQueryData(
                    "getPropertyDocuments",
                    resourceId!,
                    (draft) => {
                        const idx = draft.findIndex(
                            ({ id }) => id === resourceId
                        );

                        if (idx !== -1) {
                            draft[idx].labels?.push({
                                ...body,
                                id: draft[idx].labels?.length ?? 1,
                            });
                        }
                    }
                )
            );
        }
    }

    try {
        await queryFulfilled;
    } catch {
        createRes?.undo();
        if (isAssign) {
            assignRes?.undo();
        }
    }
};

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

export { optimisticCreate, optimisticDelete };
