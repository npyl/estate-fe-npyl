import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useGetBoardQuery } from "@/services/tasks";
import dynamic from "next/dynamic";
import { useFiltersContext } from "./filters";
import { useDebounce } from "use-debounce";
import { IKanbanBoard, IKanbanColumn } from "@/types/tasks";
import { FC, useMemo } from "react";
import { TMode } from "./types";
const List = dynamic(() => import("./List"));

const Board = dynamic(() => import("@/sections/Tasks/Board"));

// TODO: speak with backend; theoretically this can be removed completely! + throw cardOrder/columnOrder
const useSortedColumns = (board?: IKanbanBoard) => {
    return useMemo(() => {
        if (!board?.columns || !board.columnOrder || !board.cards) return [];

        const columnMap = new Map(board.columns.map((col) => [col.id, col]));
        const result: IKanbanColumn[] = [];

        for (const id of board.columnOrder) {
            const column = columnMap.get(id);
            if (!column) continue;

            result.push({ ...column, cardIds: column.cardOrder });
        }

        return result;
    }, [board?.columns, board?.columnOrder, board?.cards]);
};

interface ContentProps {
    mode: TMode;
}

const Content: FC<ContentProps> = ({ mode }) => {
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
            {board ? (
                <>
                    {mode === "board" ? <Board columns={columns} /> : null}
                    {mode === "board" ? <List columns={columns} /> : null}
                </>
            ) : null}
            {isLoading ? <SkeletonKanbanColumn /> : null}
        </>
    );
};

export default Content;
