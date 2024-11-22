import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useGetBoardQuery } from "@/services/tasks";
import dynamic from "next/dynamic";
import { useFiltersContext } from "./filters";
import { useDebounce } from "use-debounce";
import { IKanbanBoard, IKanbanColumn, IKanbanCardShort } from "@/types/tasks";
import { useMemo } from "react";

const Board = dynamic(() => import("@/sections/Tasks/Board"));

// TODO: speak with backend; theoretically this can be removed completely! + throw cardOrder/columnOrder
const useSortedColumns = (board?: IKanbanBoard) => {
    return useMemo(() => {
        if (!board?.columns || !board.columnOrder || !board.cards) return [];

        const cardMap = new Map(board.cards.map((card) => [card.id, card]));
        const columnMap = new Map(board.columns.map((col) => [col.id, col]));
        const result: (IKanbanColumn & { cards: IKanbanCardShort[] })[] = [];

        for (const id of board.columnOrder) {
            const column = columnMap.get(id);
            if (!column) continue;

            const cards: IKanbanCardShort[] = [];
            for (const cardId of column.cardOrder) {
                const card = cardMap.get(cardId);
                if (card) cards.push(card);
            }

            result.push({ ...column, cards });
        }

        return result;
    }, [board?.columns, board?.columnOrder, board?.cards]);
};

const Content = () => {
    const { search, assigneeId, priority } = useFiltersContext();

    const [debounced] = useDebounce(search, 300);

    const { data: board, isLoading } = useGetBoardQuery({
        search: debounced,
        assigneeId,
        priority,
    });

    const columns = useSortedColumns(board);

    return (
        <>
            {board ? <Board columns={columns} /> : null}
            {isLoading ? <SkeletonKanbanColumn /> : null}
        </>
    );
};

export default Content;
