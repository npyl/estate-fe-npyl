import { SkeletonKanbanColumn } from "src/components/skeleton";
import { useGetBoardQuery } from "@/services/tasks";
import dynamic from "next/dynamic";
import { useFiltersContext } from "./filters";
import { useDebounce } from "use-debounce";
const Board = dynamic(() => import("@/sections/Tasks/Board"));

const Content = () => {
    const { search, assigneeId } = useFiltersContext();

    const [debounced] = useDebounce(search, 300);

    const { data: board, isLoading } = useGetBoardQuery({
        search: debounced,
        assigneeId,
    });

    return (
        <>
            {board ? <Board board={board} /> : null}

            {isLoading ? <SkeletonKanbanColumn /> : null}
        </>
    );
};

export default Content;
