import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { filesApiSlice, properties } from "@/services/properties";
import { customers } from "@/services/customers";
import {
    DeleteLabelProps,
    IAssignLabelToResourceReq,
    ILabelForResourceReq,
    ILabelForResourceRes,
} from "./types";
import { labels } from ".";
import { tasks } from "@/services/tasks";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: MutationLifecycleApi<Req, BaseQueryFn, Res, "labels">
) => Promise<void>;

type TCreateCb = OptimisticCb<
    ILabelForResourceReq,
    ILabelForResourceRes | void
>;

type TAssignCb = OptimisticCb<
    IAssignLabelToResourceReq,
    ILabelForResourceRes | void
>;

type TDeleteCb = OptimisticCb<DeleteLabelProps, void>;

const getRandomId = () => Math.random() * 2000;

const optimisticCreateAssign: TCreateCb = async (
    { resource, resourceId, body },
    { dispatch, queryFulfilled }
) => {
    let assignRes;
    const isAssign = Boolean(resourceId);

    const newId = getRandomId();

    //
    //  Create
    //
    const createRes = dispatch(
        labels.util.updateQueryData("getLabels", undefined, (draft) => {
            if (resource === "property") {
                draft.propertyLabels.push({
                    ...body,
                    id: newId,
                });
            }
            if (resource === "customer") {
                draft.customerLabels.push({
                    ...body,
                    id: newId,
                });
            }
            if (resource === "document") {
                draft.documentLabels.push({
                    ...body,
                    id: newId,
                });
            }
            if (resource === "ticket") {
                draft.ticketLabels.push({
                    ...body,
                    id: newId,
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
                            id: newId,
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
                            id: newId,
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
                                id: newId,
                            });
                        }
                    }
                )
            );
        } else if (resource === "ticket") {
            assignRes = dispatch(
                tasks.util.updateQueryData(
                    "getCardLabels",
                    resourceId!,
                    (draft) => {
                        draft.push({
                            ...body,
                            id: newId,
                        });
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

const optimisticAssign: TAssignCb = async (
    { resource, resourceId, body },
    { dispatch, queryFulfilled }
) => {
    let assignRes;

    const newId = getRandomId();

    //
    //  Assign
    //

    if (resource === "property") {
        assignRes = dispatch(
            properties.util.updateQueryData(
                "getPropertyLabels",
                resourceId,
                (draft) => {
                    draft.push({
                        ...body,
                        id: newId,
                    });
                }
            )
        );
    } else if (resource === "customer") {
        assignRes = dispatch(
            customers.util.updateQueryData(
                "getCustomerLabels",
                resourceId,
                (draft) => {
                    draft.push({
                        ...body,
                        id: newId,
                    });
                }
            )
        );
    } else if (resource === "document") {
        assignRes = dispatch(
            filesApiSlice.util.updateQueryData(
                "getPropertyDocuments",
                resourceId,
                (draft) => {
                    const idx = draft.findIndex(({ id }) => id === resourceId);

                    if (idx !== -1) {
                        draft[idx].labels?.push({
                            ...body,
                            id: newId,
                        });
                    }
                }
            )
        );
    } else if (resource === "ticket") {
        assignRes = dispatch(
            tasks.util.updateQueryData("getCardLabels", resourceId, (draft) => {
                draft.push({
                    ...body,
                    id: newId,
                });
            })
        );
    }

    try {
        await queryFulfilled;
    } catch {
        assignRes?.undo();
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

export { optimisticCreateAssign, optimisticAssign, optimisticDelete };
