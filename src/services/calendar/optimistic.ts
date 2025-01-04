import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { CreateUpdateEventReq, DeleteEventReq } from "./types";
import { calendar } from ".";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: MutationLifecycleApi<Req, BaseQueryFn, Res, "calendar">
) => void;

type TUpdateCb = OptimisticCb<CreateUpdateEventReq, void>;
type TDeleteCb = OptimisticCb<DeleteEventReq, void>;

const optimisticUpdate: TUpdateCb = async (
    { body },
    { dispatch, queryFulfilled, getState }
) => {
    const state = getState() as any;
    const currentQueries = state.calendar.queries;
    const latestGetEventsQuery = Object.keys(currentQueries)
        .filter((key) => key.startsWith("getEvents"))
        .sort()
        .pop();

    if (!latestGetEventsQuery) return;

    // Update optimistically
    const patchResult = dispatch(
        calendar.util.updateQueryData(
            "getEvents",
            currentQueries[latestGetEventsQuery].originalArgs,
            (draft) => {
                const eventIndex = draft.findIndex(
                    (event) => event.id === body.id
                );

                if (eventIndex !== -1) {
                    draft[eventIndex] = {
                        ...draft[eventIndex],
                        ...body,
                    };
                }
            }
        )
    );

    try {
        await queryFulfilled;
    } catch {
        // If the mutation fails, reverse the optimistic update
        patchResult.undo();
    }
};

const optimisticDelete: TDeleteCb = async (
    { eventId },
    { dispatch, queryFulfilled, getState }
) => {
    const state = getState() as any;
    const currentQueries = state.calendar.queries;
    const latestGetEventsQuery = Object.keys(currentQueries)
        .filter((key) => key.startsWith("getEvents"))
        .sort()
        .pop();

    if (!latestGetEventsQuery) return;

    // Remove optimistically
    const patchResult = dispatch(
        calendar.util.updateQueryData(
            "getEvents",
            currentQueries[latestGetEventsQuery].originalArgs,
            (draft) => {
                const eventIndex = draft.findIndex(
                    (event) => event.id === eventId
                );
                if (eventIndex !== -1) {
                    draft.splice(eventIndex, 1);
                }
            }
        )
    );

    try {
        await queryFulfilled;
    } catch {
        // If the mutation fails, reverse the optimistic update
        patchResult.undo();
    }
};

export { optimisticUpdate, optimisticDelete };
