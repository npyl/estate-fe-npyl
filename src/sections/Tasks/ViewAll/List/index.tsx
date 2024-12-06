import { IKanbanColumn } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import { FC, useRef } from "react";
import Row from "./Row";
import Autoscroller from "../Autoscroller";
import useAvailableHeight from "@/hooks/useAvailableHeight";

// --------------------------------------------------------------

const getRow = (c: IKanbanColumn) => <Row key={c.id} c={c} />;

// --------------------------------------------------------------

interface ListProps {
    columns: IKanbanColumn[];
}

const List: FC<ListProps> = ({ columns }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastColumnId = columns?.at(-1)?.id;

    useAvailableHeight(containerRef);

    return (
        <>
            <Stack ref={containerRef} spacing={1} overflow="auto">
                {columns.map(getRow)}
            </Stack>

            <Autoscroller
                containerRef={containerRef}
                lastColumnId={lastColumnId}
                mode="verticalEnd"
            />
        </>
    );
};

export default List;
