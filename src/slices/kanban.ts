import { createSlice } from "@reduxjs/toolkit";
import keyBy from "lodash/keyBy";
import omit from "lodash/omit";
// utils

import { dispatch } from "../store";
// @types
import { IKanbanCard, IKanbanColumn, IKanbanState } from "src/types/kanban";

// ----------------------------------------------------------------------

const initialState: IKanbanState = {
    isLoading: false,
    error: null,
    board: {
        cards: {},
        columns: {},
        columnOrder: [],
    },
};

const slice = createSlice({
    name: "kanban",
    initialState,
    reducers: {
        // START LOADING
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // GET BOARD
        getBoardSuccess(state, action) {
            state.isLoading = false;
            const board = action.payload;
            const cards = keyBy(board.cards, "id");
            const columns = keyBy(board.columns, "id");
            const { columnOrder } = board;

            state.board = {
                cards,
                columns,
                columnOrder,
            };
        },

        // CREATE NEW COLUMN
        createColumnSuccess(state, action) {
            const newColumn = action.payload;
            state.isLoading = false;
            state.board.columns = {
                ...state.board.columns,
                [newColumn.id]: newColumn,
            };
            state.board.columnOrder.push(newColumn.id);
        },

        persistCard(state, action) {
            const columns = action.payload;
            state.board.columns = columns;
        },

        persistColumn(state, action) {
            state.board.columnOrder = action.payload;
        },

        addTask(state, action) {
            const { card, columnId } = action.payload;

            state.board.cards[card.id] = card;
            state.board.columns[columnId].cardIds.push(card.id);
        },

        deleteTask(state, action) {
            const { cardId, columnId } = action.payload;

            state.board.columns[columnId].cardIds = state.board.columns[
                columnId
            ].cardIds.filter((id) => id !== cardId);

            state.board.cards = omit(state.board.cards, [cardId]);
        },

        // UPDATE COLUMN
        updateColumnSuccess(state, action) {
            const column = action.payload;

            state.isLoading = false;
            state.board.columns[column.id] = column;
        },

        // DELETE COLUMN
        deleteColumnSuccess(state, action) {
            // const { columnId } = action.payload;
            // const deletedColumn = state.board.columns[columnId];
            // state.isLoading = false;
            // state.board.columns = omit(state.board.columns, [columnId]);
            // state.board.cards = omit(state.board.cards, [
            //     ...deletedColumn.cardIds,
            // ]);
            // state.board.columnOrder = state.board.columnOrder.filter(
            //     (c) => c !== columnId
            // );
        },
    },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            //  const response = await axios.get("/api/kanban/board");
            // dispatch(slice.actions.getBoardSuccess(response.data.board));
            dispatch(
                slice.actions.getBoardSuccess({
                    cards: [
                        {
                            id: "deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3",
                            name: "Call with sales of HubSpot",
                            description:
                                "Duis condimentum lacus finibus felis pellentesque, ac auctor nibh fermentum. Duis sed dui ante. Phasellus id eros tincidunt, dictum lorem vitae, pellentesque sem. Aenean eu enim sit amet mauris rhoncus mollis. Sed enim turpis, porta a felis et, luctus faucibus nisi. Phasellus et metus fermentum, ultrices arcu aliquam, facilisis justo. Cras nunc nunc, elementum sed euismod ut, maximus eget nibh. Phasellus condimentum lorem neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce sagittis pharetra eleifend. Suspendisse potenti.",
                            assignee: [
                                {
                                    id: "473d2720-341c-49bf-94ed-556999cf6ef7",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
                                    name: "Lucian Obrien",
                                },
                            ],
                            due: [1693930132035, 1694016532035],
                            attachments: [],
                            comments: [
                                {
                                    id: "0471fd5d-d842-4502-b3f9-95ddb61a1cb7",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg",
                                    name: "Jayvion Simon",
                                    createdAt: "2023-08-30T16:08:52.035Z",
                                    messageType: "text",
                                    message:
                                        "Assumenda nam repudiandae rerum fugiat vel maxime.",
                                },
                                {
                                    id: "b4cf42ea-8616-4345-a478-02d697d26418",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
                                    name: "Lucian Obrien",
                                    createdAt: "2023-08-29T15:08:52.036Z",
                                    messageType: "text",
                                    message:
                                        "Quis veniam aut saepe aliquid nulla.",
                                },
                                {
                                    id: "17b4aa26-e441-4e7d-9171-21ddf1deb246",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",
                                    name: "Deja Brady",
                                    createdAt: "2023-08-28T14:08:52.036Z",
                                    messageType: "text",
                                    message:
                                        "Reprehenderit ut voluptas sapiente ratione nostrum est.",
                                },
                                {
                                    id: "528330a8-c83f-498b-b7cf-d7e0ef96ae3b",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",
                                    name: "Harrison Stein",
                                    createdAt: "2023-08-27T13:08:52.036Z",
                                    messageType: "image",
                                    message:
                                        "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_7.jpg",
                                },
                                {
                                    id: "7b8890a7-14c6-4ea4-bdf6-cf8a4c3cffd8",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_5.jpg",
                                    name: "Reece Chung",
                                    createdAt: "2023-08-26T12:08:52.036Z",
                                    messageType: "text",
                                    message:
                                        "Quo quia sit nihil nemo doloremque et.",
                                },
                                {
                                    id: "91db9cf0-c3d2-402c-b988-026661b9f397",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",
                                    name: "Lainey Davidson",
                                    createdAt: "2023-08-25T11:08:52.036Z",
                                    messageType: "image",
                                    message:
                                        "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_9.jpg",
                                },
                                {
                                    id: "b435cb38-6c72-4703-b367-a198b57b10bd",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_7.jpg",
                                    name: "Cristopher Cardenas",
                                    createdAt: "2023-08-24T10:08:52.036Z",
                                    messageType: "text",
                                    message:
                                        "Tempora officiis consequuntur architecto nostrum autem nam adipisci.",
                                },
                                {
                                    id: "67f3f549-ca2f-4354-ab38-44bce243a066",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_8.jpg",
                                    name: "Melanie Noble",
                                    createdAt: "2023-08-23T09:08:52.036Z",
                                    messageType: "text",
                                    message:
                                        "Voluptas sunt magni adipisci praesentium saepe.",
                                },
                            ],
                            completed: true,
                        },
                        {
                            id: "98bf6e8b-becc-485b-9c3f-a7d09392c48d",
                            name: "Interview for the Asis. Sales Manager",
                            description:
                                "We are looking for vue experience and of course node js strong knowledge",
                            assignee: [
                                {
                                    id: "473d2720-341c-49bf-94ed-556999cf6ef7",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
                                    name: "Deja Brady",
                                },
                                {
                                    id: "b8395203-887c-46f5-a85f-339b2d75c98b",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",
                                    name: "Harrison Stein",
                                },
                                {
                                    id: "18e23ac9-c874-43e4-8163-2d37f15f3367",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_4.jpg",
                                    name: "Reece Chung",
                                },
                                {
                                    id: "a3be5485-03bf-47a6-b553-a9cf9f070ed8",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_5.jpg",
                                    name: "Lainey Davidson",
                                },
                                {
                                    id: "048f6343-7a65-4873-a570-eb6ff4eb1ba3",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",
                                    name: "Cristopher Cardenas",
                                },
                            ],
                            due: [1693930132035, 1694016532035],
                            attachments: [
                                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_2.jpg",
                            ],
                            comments: [],
                            completed: false,
                        },
                        {
                            id: "99fbc02c-de89-4be3-9515-f8bd12227d38",
                            name: "Change the height of the top bar because it looks too chunky",
                            description:
                                "We nede to make it aggressive with pricing because it’s in their interest to acquire us",
                            assignee: [],
                            due: [null, null],
                            attachments: [],
                            comments: [],
                            completed: true,
                        },
                        {
                            id: "ab9cebca-6cb4-4847-aa17-3b261b3dd0fb",
                            name: "Integrate Stripe API",
                            description:
                                "We nede to make it aggresive with pricing because it’s in their interest to acquire us",
                            assignee: [
                                {
                                    id: "b8395203-887c-46f5-a85f-339b2d75c98b",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_3.jpg",
                                    name: "Melanie Noble",
                                },
                                {
                                    id: "a3be5485-03bf-47a6-b553-a9cf9f070ed8",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_6.jpg",
                                    name: "Chase Day",
                                },
                            ],
                            due: [null, null],
                            attachments: [
                                "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_4.jpg",
                            ],
                            comments: [],
                            completed: false,
                        },
                        {
                            id: "ebf0d26a-78e5-414f-986f-003d8fcd3154",
                            name: "Update the customer API for payments",
                            description:
                                "We need to make it aggresive with pricing because it’s in their interest to acquire us",
                            assignee: [
                                {
                                    id: "473d2720-341c-49bf-94ed-556999cf6ef7",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
                                    name: "Shawn Manning",
                                },
                            ],
                            due: [null, null],
                            attachments: [],
                            comments: [],
                            completed: true,
                        },
                        {
                            id: "9d98ce30-3c51-4de3-8537-7a4b663ee3af",
                            name: "Release minimals DS",
                            description: "Production",
                            assignee: [
                                {
                                    id: "473d2720-341c-49bf-94ed-556999cf6ef7",
                                    avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg",
                                    name: "Soren Durham",
                                },
                            ],
                            due: [null, null],
                            attachments: [],
                            comments: [],
                            completed: true,
                        },
                    ],
                    columns: [
                        {
                            id: "8cd887ec-b3bc-11eb-8529-0242ac130003",
                            name: "Backlog",
                            cardIds: [
                                "deb02f04-9cf8-4f1e-97e0-2fbda84cc6b3",
                                "98bf6e8b-becc-485b-9c3f-a7d09392c48d",
                                "99fbc02c-de89-4be3-9515-f8bd12227d38",
                            ],
                        },
                        {
                            id: "23008a1f-ad94-4771-b85c-3566755afab7",
                            name: "Progress",
                            cardIds: [
                                "ab9cebca-6cb4-4847-aa17-3b261b3dd0fb",
                                "ebf0d26a-78e5-414f-986f-003d8fcd3154",
                            ],
                        },
                        {
                            id: "37a9a747-f732-4587-a866-88d51c037641",
                            name: "Q&A",
                            cardIds: [],
                        },
                        {
                            id: "4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f",
                            name: "Production",
                            cardIds: ["9d98ce30-3c51-4de3-8537-7a4b663ee3af"],
                        },
                    ],
                    columnOrder: [
                        "8cd887ec-b3bc-11eb-8529-0242ac130003",
                        "23008a1f-ad94-4771-b85c-3566755afab7",
                        "37a9a747-f732-4587-a866-88d51c037641",
                        "4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f",
                    ],
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function createColumn(newColumn: { name: string }) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            // const response = await axios.post(
            //     "/api/kanban/columns/new",
            //     newColumn
            // );
            // dispatch(slice.actions.createColumnSuccess(response.data.column));

            dispatch(slice.actions.createColumnSuccess([]));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function updateColumn(columnId: string, updateColumn: IKanbanColumn) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            // const response = await axios.post("/api/kanban/columns/update", {
            //     columnId,
            //     updateColumn,
            // });
            // dispatch(slice.actions.updateColumnSuccess(response.data.column));

            dispatch(slice.actions.updateColumnSuccess([]));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function deleteColumn(columnId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            // await axios.post("/api/kanban/columns/delete", { columnId });
            dispatch(slice.actions.deleteColumnSuccess({ columnId }));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// ----------------------------------------------------------------------

export function persistColumn(newColumnOrder: string[]) {
    return () => {
        dispatch(slice.actions.persistColumn(newColumnOrder));
    };
}

// ----------------------------------------------------------------------

export function persistCard(columns: Record<string, IKanbanColumn>) {
    return () => {
        dispatch(slice.actions.persistCard(columns));
    };
}

// ----------------------------------------------------------------------

export function addTask({
    card,
    columnId,
}: {
    card: Partial<IKanbanCard>;
    columnId: string;
}) {
    return () => {
        dispatch(slice.actions.addTask({ card, columnId }));
    };
}

// ----------------------------------------------------------------------

export function deleteTask({
    cardId,
    columnId,
}: {
    cardId: string;
    columnId: string;
}) {
    return () => {
        dispatch(slice.actions.deleteTask({ cardId, columnId }));
    };
}
