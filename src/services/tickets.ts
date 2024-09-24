import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IKanbanBoard,
    IKanbanCardPOST,
    IKanbanColumnPOST,
    IKanbanCommentPOST,
} from "src/types/kanban";

interface EditColumnProps {
    id: number;
    name: string;
}
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

export const tickets = createApi({
    reducerPath: "tickets",
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

    tagTypes: ["Board"],

    endpoints: (builder) => ({
        getBoard: builder.query<IKanbanBoard, void>({
            query: () => "",
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
        editColumn: builder.mutation<void, EditColumnProps>({
            query: (body: EditColumnProps) => ({
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
            onQueryStarted: async (
                { columnId, position },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    tickets.util.updateQueryData(
                        "getBoard",
                        undefined,
                        (draft) => {
                            draft.columnOrder = moveItem(
                                draft.columnOrder,
                                columnId,
                                position
                            );
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
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
        addCard: builder.mutation<void, IKanbanCardPOST>({
            query: (body: IKanbanCardPOST) => ({
                url: "/card",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Board"],
        }),
        editCard: builder.mutation<void, IKanbanCardPOST>({
            query: (body: IKanbanCardPOST) => ({
                url: "/card",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Board"],
        }),

        createComment: builder.mutation<
            void,
            { cardId: number; body: IKanbanCommentPOST }
        >({
            query: ({ cardId, body }) => ({
                url: `/comment/${cardId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Board"],
        }),

        moveCard: builder.mutation<void, MoveCardProps>({
            query: ({ cardId, dstColumnId }: MoveCardProps) => ({
                url: `/card/${cardId}/move/${dstColumnId}`,
                method: "POST",
            }),
            onQueryStarted: async (
                { cardId, srcColumnId, dstColumnId },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    tickets.util.updateQueryData(
                        "getBoard",
                        undefined,
                        (draft) => {
                            const srcColumnIndex = draft.columns.findIndex(
                                (c) => c.id === srcColumnId
                            );
                            if (srcColumnIndex < 0) return;

                            const dstColumnIndex = draft.columns.findIndex(
                                (c) => c.id === dstColumnId
                            );
                            if (dstColumnIndex < 0) return;

                            // remove from old column
                            draft.columns[srcColumnIndex].cardIds = removeItem(
                                draft.columns[srcColumnIndex].cardIds,
                                cardId
                            );
                            draft.columns[srcColumnIndex].cardOrder =
                                removeItem(
                                    draft.columns[srcColumnIndex].cardOrder,
                                    cardId
                                );

                            // add to new column
                            draft.columns[dstColumnIndex].cardIds.push(cardId);
                            draft.columns[dstColumnIndex].cardOrder.push(
                                cardId
                            );
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["Board"],
        }),
        reorderCard: builder.mutation<void, ReorderCardProps>({
            query: ({ cardId, position, columnId }: ReorderCardProps) => ({
                url: `/card/reorder/column/${columnId}`,
                method: "POST",
                params: { card: cardId, position: position },
            }),
            onQueryStarted: async (
                { cardId, columnId, position },
                { dispatch, queryFulfilled }
            ) => {
                const patchResult = dispatch(
                    tickets.util.updateQueryData(
                        "getBoard",
                        undefined,
                        (draft) => {
                            const columnIndex = draft.columns.findIndex(
                                (c) => c.id === columnId
                            );
                            if (columnIndex < 0) return;

                            draft.columns[columnIndex].cardOrder = moveItem(
                                draft.columns[columnIndex].cardOrder,
                                cardId,
                                position
                            );
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["Board"],
        }),
        deleteCard: builder.mutation<void, number>({
            query: (cardId: number) => ({
                url: `/card/${cardId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Board"],
        }),
    }),
});

export const {
    // Board
    useGetBoardQuery,

    // Columns
    useAddColumnMutation,
    useEditColumnMutation,
    useReorderColumnMutation,
    useDeleteColumnMutation,

    // Cards
    useAddCardMutation,
    useEditCardMutation,
    useMoveCardMutation,
    useReorderCardMutation,
    useDeleteCardMutation,

    //Comments
    useCreateCommentMutation,
} = tickets;
