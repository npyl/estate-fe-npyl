import { TThreadRes } from "@/types/email";
import { QueryLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { emails } from ".";
import { IThreadReq, WithId } from "./types";

const REQ_KEY = "filterEmails";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: QueryLifecycleApi<Req, BaseQueryFn, Res, "emails">
) => void;

type TGetThread = OptimisticCb<WithId<IThreadReq>, TThreadRes>;

const optimisticMarkThreadRead: TGetThread = async (
    { threadId },
    { dispatch, queryFulfilled, getState }
) => {
    const state = getState();
    const currentQueries = state.emails.queries;
    const filterQueries = Object.keys(currentQueries).filter((key) =>
        key.startsWith(REQ_KEY)
    );

    // Create patch results for each query
    const patchResults = filterQueries.map((queryKey) => {
        // Extract the original args from the query key if needed
        // This assumes you can parse the args from the query key
        const originalArgs = parseArgsFromQueryKey(queryKey);

        return dispatch(
            emails.util.updateQueryData(REQ_KEY, originalArgs, (draft) => {
                const at = draft.threads.find(({ id }) => id === threadId);
                if (at) at.unread = false;
            })
        );
    });

    try {
        await queryFulfilled;
    } catch (error) {
        // Revert all patches on error
        patchResults.forEach((patchResult) => {
            patchResult.undo();
        });
        throw error;
    }
};

// Helper function to parse args from query key
// You'll need to implement this based on how your query keys are structured
function parseArgsFromQueryKey(queryKey: string): any {
    // Example implementation - adjust based on your actual query key structure
    try {
        // If query key contains JSON-stringified args
        const argsMatch = queryKey.match(/\{.*\}/);
        if (argsMatch) {
            return JSON.parse(argsMatch[0]);
        }

        // If query key has a different structure, parse accordingly
        // This is just a placeholder - implement based on your needs
        return {};
    } catch {
        return {};
    }
}

export { optimisticMarkThreadRead };
