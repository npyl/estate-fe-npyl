import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    IKanbanBoard,
    IKanbanColumnPOST,
    IKanbanCardPOST,
} from "src/types/kanban";

interface EditColumnProps {
    id: number;
    name: string;
}
interface MoveCardProps {
    cardId: number;
    columnId: number;
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

        // TODO: remove
        createBoard: builder.mutation<void, void>({
            query: () => ({
                url: "",
                method: "POST",
            }),
            invalidatesTags: ["Board"],
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
        moveCard: builder.mutation<void, MoveCardProps>({
            query: ({ cardId, columnId }: MoveCardProps) => ({
                url: `/card/${cardId}/move/${columnId}`,
                method: "POST",
            }),
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
    useCreateBoardMutation,

    // Columns
    useAddColumnMutation,
    useEditColumnMutation,
    useDeleteColumnMutation,

    // Cards
    useAddCardMutation,
    useEditCardMutation,
    useMoveCardMutation,
    useDeleteCardMutation,
} = tickets;
