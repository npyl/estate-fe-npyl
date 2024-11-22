import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { DeleteCardReq, ReorderColumnProps } from "./types";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { tasks } from "./tasks";

type OptimisticCb<Req extends object, Res extends object | void> = (
    arg: Req,
    api: MutationLifecycleApi<Req, BaseQueryFn, Res, "tasks">
) => void;

type TReorderColumnCb = OptimisticCb<ReorderColumnProps, void>;
type TDeleteCardCb = OptimisticCb<DeleteCardReq, void>;

const optimisticReorderColumn: TReorderColumnCb = async (
    { columnId, position, filters = {} },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        tasks.util.updateQueryData("getBoard", filters, (draft) => {
            const index = draft.columnOrder.indexOf(columnId);
            if (index === -1) return;

            draft.columnOrder.splice(index, 1);
            draft.columnOrder.splice(position, 0, columnId);
        })
    );

    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};

const optimisticDeleteCard: TDeleteCardCb = async (
    { cardId, filters = {} },
    { dispatch, queryFulfilled }
) => {
    const patchResult = dispatch(
        tasks.util.updateQueryData("getBoard", filters, (draft) => {
            // Single pass O(n) for both operations
            let found = false;
            for (let i = 0; i < draft.columns.length && !found; i++) {
                const column = draft.columns[i];
                const orderIndex = column.cardOrder.indexOf(cardId);

                if (orderIndex !== -1) {
                    column.cardOrder.splice(orderIndex, 1);
                    column.cardIds = column.cardIds.filter(
                        (id) => id !== cardId
                    );
                    column.numberOfTasks--;
                    found = true;
                }
            }
            draft.cards = draft.cards.filter((card) => card.id !== cardId);
        })
    );

    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
    }
};

export { optimisticReorderColumn, optimisticDeleteCard };
