import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    BoardFiltersReq,
    IKanbanBoard,
    IKanbanCard,
    IKanbanColumnPOST,
    IKanbanComment,
    IKanbanCommentPOST,
} from "@/types/tasks";

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
            query: (params) => ({ url: "", method: "POST", params }),
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
        setColumnDone: builder.mutation<void, number>({
            query: (columnId) => ({
                url: `/column/${columnId}/set-done`,
                method: "PATCH",
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

export const {
    // Board
    useGetBoardQuery,

    // Columns
    useAddColumnMutation,
    useEditColumnMutation,
    useSetColumnDoneMutation,
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
