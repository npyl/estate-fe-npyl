import { BaseQueryFn, RootState } from "@reduxjs/toolkit/query";
import {
    DeleteCardReq,
    DeleteColumnReq,
    MoveCardProps,
    ReorderCardProps,
    ReorderColumnProps,
} from "./types";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { tasks } from "./tasks";
import parseArgsFromQueryKey from "../_util/parseArgsFromQueryKey";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Recipe } from "@reduxjs/toolkit/dist/query/core/buildThunks";
import { IKanbanBoard } from "@/types/tasks";
import undoAllPatches from "../_util/undoAllPatches";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: MutationLifecycleApi<Req, BaseQueryFn, Res, "tasks">
) => Promise<void>;

type TReorderColumnCb = OptimisticCb<ReorderColumnProps, void>;
type TDeleteColumnCb = OptimisticCb<DeleteColumnReq, void>;

type TMoveCardCb = OptimisticCb<MoveCardProps, void>;
type TReorderCardCb = OptimisticCb<ReorderCardProps, void>;
type TDeleteCardCb = OptimisticCb<DeleteCardReq, void>;

const REQ_KEY = "getBoard";

// ------------------------------------------------------------------------------------------------

const getQueryPatches = (
    getState: () => RootState<any, any, "tasks">,
    dispatch: ThunkDispatch<any, any, AnyAction>,
    cb: Recipe<IKanbanBoard>
) => {
    const state = getState();
    const currentQueries = state.tasks.queries;
    const filterQueries = Object.keys(currentQueries).filter((key) =>
        key.startsWith(REQ_KEY)
    );

    // Create patch results for each query
    const patchResults = filterQueries.map((queryKey) => {
        // Extract the original args from the query key if needed
        // This assumes you can parse the args from the query key
        const originalArgs = parseArgsFromQueryKey(queryKey);

        return dispatch(tasks.util.updateQueryData(REQ_KEY, originalArgs, cb));
    });

    return patchResults;
};

// ------------------------------------------------------------------------------------------------

const optimisticReorderColumn: TReorderColumnCb = async (
    { columnId, position },
    { dispatch, queryFulfilled, getState }
) => {
    const patchResults = getQueryPatches(getState, dispatch, (draft) => {
        const index = draft.columnOrder.indexOf(columnId);
        if (index === -1) return;

        draft.columnOrder.splice(index, 1);
        draft.columnOrder.splice(position, 0, columnId);
    });

    try {
        await queryFulfilled;
    } catch {
        undoAllPatches(patchResults);
    }
};

const optimisticDeleteColumn: TDeleteColumnCb = async (
    { columnId },
    { dispatch, queryFulfilled, getState }
) => {
    const patchResults = getQueryPatches(getState, dispatch, (draft) => {
        // Remove column from columnOrder
        const columnOrderIndex = draft.columnOrder.indexOf(columnId);
        if (columnOrderIndex !== -1) {
            draft.columnOrder.splice(columnOrderIndex, 1);
        }

        // Find the column and its cards
        const columnIndex = draft.columns.findIndex(
            (col) => col.id === columnId
        );
        if (columnIndex === -1) return;

        const deletedColumn = draft.columns[columnIndex];

        // Remove all cards in this column from the cards array if it exists
        if (draft.cards) {
            draft.cards = draft.cards.filter(
                (card) => !deletedColumn.cardIds.includes(card.id)
            );
        }

        // Remove the column itself
        draft.columns.splice(columnIndex, 1);
    });

    try {
        await queryFulfilled;
    } catch {
        undoAllPatches(patchResults);
    }
};

const optimisticDeleteCard: TDeleteCardCb = async (
    { cardId },
    { getState, dispatch, queryFulfilled }
) => {
    const patchResults = getQueryPatches(getState, dispatch, (draft) => {
        // Single pass O(n) for both operations
        let found = false;
        for (let i = 0; i < draft.columns.length && !found; i++) {
            const column = draft.columns[i];
            const orderIndex = column.cardOrder.indexOf(cardId);

            if (orderIndex !== -1) {
                column.cardOrder.splice(orderIndex, 1);
                column.cardIds = column.cardIds.filter((id) => id !== cardId);
                column.numberOfTasks--;
                found = true;
            }
        }
        draft.cards = draft.cards.filter((card) => card.id !== cardId);
    });

    try {
        await queryFulfilled;
    } catch {
        undoAllPatches(patchResults);
    }
};

const optimisticMoveCard: TMoveCardCb = async (
    { cardId, dstColumnId, position },
    { getState, dispatch, queryFulfilled }
) => {
    const patchResults = getQueryPatches(getState, dispatch, (draft) => {
        // Find source column containing the card
        let sourceColumn = null;

        // Find and remove card from source column
        for (const column of draft.columns) {
            const cardIndex = column.cardOrder.indexOf(cardId);
            if (cardIndex !== -1) {
                sourceColumn = column;
                // Remove card from source column
                column.cardOrder.splice(cardIndex, 1);
                column.cardIds = column.cardIds.filter((id) => id !== cardId);
                column.numberOfTasks--;
                break;
            }
        }

        if (!sourceColumn) return;

        // Find destination column
        const destColumn = draft.columns.find((col) => col.id === dstColumnId);
        if (!destColumn) return;

        // Insert card at specific position or at the end
        const insertPosition =
            typeof position === "number"
                ? Math.min(position, destColumn.cardOrder.length)
                : destColumn.cardOrder.length;

        // Add card to destination column at specific position
        destColumn.cardOrder.splice(insertPosition, 0, cardId);
        destColumn.cardIds.push(cardId);
        destColumn.numberOfTasks++;
    });

    try {
        await queryFulfilled;
    } catch {
        undoAllPatches(patchResults);
    }
};

const optimisticReorderCard: TReorderCardCb = async (
    { cardId, position, columnId },
    { getState, dispatch, queryFulfilled }
) => {
    const patchResults = getQueryPatches(getState, dispatch, (draft) => {
        // Find the column where the card is being reordered
        const column = draft.columns.find((col) => col.id === columnId);
        if (!column) return;

        // Find current position of the card
        const currentIndex = column.cardOrder.indexOf(cardId);
        if (currentIndex === -1) return;

        // Remove card from current position and insert at new position
        column.cardOrder.splice(currentIndex, 1);
        column.cardOrder.splice(position, 0, cardId);
    });

    try {
        await queryFulfilled;
    } catch {
        undoAllPatches(patchResults);
    }
};

export {
    optimisticReorderColumn,
    optimisticDeleteColumn,
    optimisticMoveCard,
    optimisticReorderCard,
    optimisticDeleteCard,
};
