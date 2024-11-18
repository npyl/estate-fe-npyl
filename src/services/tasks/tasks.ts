import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    BoardFiltersReq,
    IKanbanBoard,
    IKanbanCard,
    IKanbanColumnPOST,
    IKanbanComment,
    IKanbanCommentPOST,
} from "@/types/tasks";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface ReorderColumnProps {
    columnId: number;
    position: number;
}

interface MoveCardProps {
    cardId: number;
    srcColumnId: number;
    dstColumnId: number;
}
interface ReorderCardProps {
    cardId: number;
    columnId: number;
    position: number;
}

interface ICreateCommentReq {
    cardId: number;
    body: IKanbanCommentPOST;
}

// array is columnOrder or cardOrder
// id refers to column or card id
// position is the new position that a column / card is to be moved
function moveItem(arr: number[], id: number, position: number): number[] {
    // Find the current index of the id
    const index = arr?.indexOf(id) ?? -1;

    // If id is not in the array, just return the original array
    if (index === -1) return arr;

    // Remove the id from its current position
    arr.splice(index, 1);

    // Insert the id at the desired position
    arr.splice(position, 0, id);

    return arr;
}
function removeItem(arr: number[], numberToRemove: number): number[] {
    return arr.filter((item) => item !== numberToRemove);
}

export const tasks = createApi({
    reducerPath: "tasks",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/kanban`,
        prepareHeaders: (headers) => {
            // By default, if we have a token in the store, let's use that for authenticated requests

            headers.set(
                "Authorization",
                `Bearer  ${localStorage.getItem("accessToken")}`
            );

            return headers;
        },
    }),

    tagTypes: ["Board", "Card", "Comments"],

    endpoints: (builder) => ({
        getBoard: builder.query<IKanbanBoard, BoardFiltersReq>({
            query: (body) => ({ url: "", method: "POST", body }),
            providesTags: ["Board"],
        }),

        // Columns
        addColumn: builder.mutation<void, IKanbanColumnPOST>({
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
            query: ({ columnId, position }: ReorderColumnProps) => ({
                url: "/column/reorder",
                method: "POST",
                params: { column: columnId, position },
            }),
            invalidatesTags: ["Board"],
        }),
        deleteColumn: builder.mutation<void, number>({
            query: (columnId: number) => ({
                url: `/column/${columnId}`,
                method: "DELETE",
            }),
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
            query: ({ cardId, dstColumnId }: MoveCardProps) => ({
                url: `/card/${cardId}/move/${dstColumnId}`,
                method: "POST",
            }),
            invalidatesTags: ["Board", "Card"],
        }),
        reorderCard: builder.mutation<void, ReorderCardProps>({
            query: ({ cardId, position, columnId }: ReorderCardProps) => ({
                url: `/card/reorder/column/${columnId}`,
                method: "POST",
                params: { card: cardId, position: position },
            }),
            invalidatesTags: ["Board", "Card"],
        }),
        deleteCard: builder.mutation<void, number>({
            query: (cardId: number) => ({
                url: `/card/${cardId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Board"],
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
    }),
});

// --------------------------------------------------------------------------

const url = `${process.env.NEXT_PUBLIC_API_URL}/kanban/column`;

const ERROR_MESSAGE =
    "Cannot mark column as done when another non-empty done column exists";

const useSetColumnDoneMutation = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const cb = useCallback(
        async (columnId: number) => {
            const res = await fetch(`${url}/${columnId}/set-done`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });

            if (res.status === 400) {
                const data = await res.json();
                if (data.errorMessage === ERROR_MESSAGE) {
                    toast.error(t("_COLUMN_DONE_"));
                }
                return;
            }

            // ...Otherwise
            if (!res.ok) {
                toast.error("Error (Σφάλμα)");
                return;
            }

            dispatch(tasks.util.invalidateTags(["Board"]));
        },
        [t]
    );

    return [cb] as const;
};

// --------------------------------------------------------------------------

export { useSetColumnDoneMutation };

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
    useDeleteCardMutation,

    //Comments
    useGetCommentsForCardQuery,
    useCreateCommentMutation,
} = tasks;
