import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    BoardFiltersReq,
    IKanbanAttachment,
    IKanbanBoard,
    IKanbanCard,
    IKanbanColumnPOST,
    IKanbanComment,
    IKanbanAssigneeHistory,
} from "@/types/tasks";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    DeleteCardReq,
    IAddAttachmentReq,
    IAddAttachmentRes,
    ICreateCommentReq,
    MoveCardProps,
    ReorderCardProps,
    DeleteColumnReq,
    ReorderColumnProps,
} from "./types";
import {
    optimisticDeleteCard,
    optimisticMoveCard,
    optimisticReorderCard,
    optimisticReorderColumn,
    optimisticDeleteColumn,
} from "./optimistic";
import { errorToast } from "@/components/Toaster";
import { ILabel } from "@/types/label";
import { createRemoveTabAwareHook as rt } from "@/services/_util";
import { getAccessToken } from "@/contexts/accessToken";

export const tasks = createApi({
    reducerPath: "tasks",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/kanban`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set("Authorization", `Bearer  ${getAccessToken()}`);

            return headers;
        },
    }),

    tagTypes: [
        "Board",
        "Card",
        "Comments",
        "Attachments",
        "Labels",
        "AssigneeHistory",
    ],

    endpoints: (builder) => ({
        getBoard: builder.query<IKanbanBoard, BoardFiltersReq>({
            query: (body) => ({
                url: "",
                method: "POST",
                body,
            }),
            providesTags: ["Board"],
        }),

        // Columns
        addColumn: builder.mutation<number, IKanbanColumnPOST>({
            query: (body: IKanbanColumnPOST) => ({
                url: "/column",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Board"],
        }),
        editColumn: builder.mutation<void, IKanbanColumnPOST>({
            query: (body) => ({
                url: "/column",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Board"],
        }),
        reorderColumn: builder.mutation<void, ReorderColumnProps>({
            query: ({ columnId, position }) => ({
                url: "/column/reorder",
                method: "POST",
                params: { column: columnId, position },
            }),
            onQueryStarted: optimisticReorderColumn,
            invalidatesTags: ["Board"],
        }),
        deleteColumn: builder.mutation<void, DeleteColumnReq>({
            query: ({ columnId }) => ({
                url: `/column/${columnId}`,
                method: "DELETE",
            }),
            onQueryStarted: optimisticDeleteColumn,
            invalidatesTags: ["Board"],
        }),

        // Cards
        getCard: builder.query<IKanbanCard, number>({
            query: (taskId) => ({
                url: `/card/${taskId}`,
            }),
            providesTags: ["Card"],
        }),
        moveCard: builder.mutation<void, MoveCardProps>({
            query: ({ cardId, dstColumnId, position }: MoveCardProps) => ({
                url: `/card/${cardId}/move/${dstColumnId}`,
                method: "POST",
                params: {
                    position,
                },
            }),
            onQueryStarted: optimisticMoveCard,
            invalidatesTags: ["Board", "Card"],
        }),
        reorderCard: builder.mutation<void, ReorderCardProps>({
            query: ({ cardId, position, columnId }: ReorderCardProps) => ({
                url: `/card/reorder/column/${columnId}`,
                method: "POST",
                params: { card: cardId, position },
            }),
            onQueryStarted: optimisticReorderCard,
            invalidatesTags: ["Board", "Card"],
        }),
        deleteCard: builder.mutation<void, DeleteCardReq>({
            query: ({ cardId }) => ({
                url: `/card/${cardId}`,
                method: "DELETE",
            }),
            onQueryStarted: optimisticDeleteCard,
            invalidatesTags: ["Board"],
        }),
        generateTitle: builder.mutation<string, string>({
            query: (body) => ({
                url: `/card/generate-title`,
                body,
                method: "POST",
                headers: {
                    "Content-Type": "text/html",
                },
                responseHandler: "text",
            }),
        }),

        // Comments
        getCommentsForCard: builder.query<IKanbanComment[], number>({
            query: (cardId) => ({
                url: `/card/${cardId}/comments`,
            }),
            providesTags: ["Comments"],
        }),
        createComment: builder.mutation<void, ICreateCommentReq>({
            query: ({ cardId, body }) => ({
                url: `/comment/${cardId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Comments"],
        }),

        // Attachments
        getAttachments: builder.query<IKanbanAttachment[], number>({
            query: (cardId) => ({
                url: `/card/${cardId}/attachments`,
            }),
            providesTags: ["Attachments"],
        }),
        addAttachment: builder.mutation<IAddAttachmentRes, IAddAttachmentReq>({
            query: (body) => ({
                url: `/attachments`,
                method: "POST",
                body,
            }),
            // INFO: invalidate tags only *AFTER* upload to s3
            // invalidatesTags: ["Attachments"],
        }),
        deleteAttachment: builder.mutation<void, number>({
            query: (attachmentId) => ({
                url: `/attachments/${attachmentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Attachments"],
        }),

        // Assignee History
        getAssigneeHistory: builder.query<IKanbanAssigneeHistory[], number>({
            query: (cardId) => ({
                url: `/card/${cardId}/assignee-history`,
            }),
            providesTags: ["AssigneeHistory"],
        }),

        // Labels

        getCardLabels: builder.query<ILabel[], number>({
            query: (cardId) => ({
                url: `/card/${cardId}/labels`,
            }),
            providesTags: ["Labels"],
        }),
    }),
});

// --------------------------------------------------------------------------

const url = `${process.env.NEXT_PUBLIC_API_URL}/kanban/column`;

const ERROR_MESSAGE =
    "Cannot mark column as done when another non-empty done column exists";

const useSetColumnDoneMutation = () => {
    const dispatch = useDispatch();

    const cb = useCallback(async (columnId: number) => {
        const res = await fetch(`${url}/${columnId}/set-done`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });

        if (res.status === 400) {
            const data = await res.json();
            if (data.errorMessage === ERROR_MESSAGE) {
                errorToast("_COLUMN_DONE_0", "_COLUMN_DONE_1");
            }
            return;
        }

        // ...Otherwise
        if (!res.ok) {
            errorToast("_ERROR_");
            return;
        }

        dispatch(tasks.util.invalidateTags(["Board"]));
    }, []);

    return [cb] as const;
};

// --------------------------------------------------------------------------

export { useSetColumnDoneMutation };

const useDeleteCardMutation = rt(tasks.useDeleteCardMutation);
export { useDeleteCardMutation };

export const {
    // Board
    useGetBoardQuery,

    // Columns
    useAddColumnMutation,
    useEditColumnMutation,
    useReorderColumnMutation,
    useDeleteColumnMutation,

    // Cards
    useGetCardQuery,
    useMoveCardMutation,
    useReorderCardMutation,
    useGenerateTitleMutation,

    //Comments
    useGetCommentsForCardQuery,
    useCreateCommentMutation,

    // Attachmetns
    useGetAttachmentsQuery,
    useAddAttachmentMutation,
    useDeleteAttachmentMutation,

    // Assignee History
    useGetAssigneeHistoryQuery,

    // Labels
    useGetCardLabelsQuery,
} = tasks;
