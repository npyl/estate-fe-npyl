import Stack, { StackProps } from "@mui/material/Stack";
import { FC, useCallback, useState } from "react";
import { useMemo } from "react";
import { useGetBoardQuery } from "@/services/tasks";
import dynamic from "next/dynamic";
const Item = dynamic(() => import("./Item"));
const CardDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));

interface ItemsProps extends StackProps {
    columnId: number;
    ids: number[];
}

const Items: FC<ItemsProps> = ({ columnId, ids, ...props }) => {
    const { data: board } = useGetBoardQuery({});
    const cards = useMemo(() => board?.cards || [], [board]);

    const [taskId, setTaskId] = useState<number>();
    const closeDialog = useCallback(() => setTaskId(undefined), []);

    return (
        <>
            <Stack {...props}>
                {ids.map((id) => {
                    const card = cards?.find((c) => c.id === id);
                    if (!card) return null;

                    return (
                        <Item key={id} c={card} onClick={() => setTaskId(id)} />
                    );
                })}
            </Stack>

            {taskId ? (
                <CardDialog
                    taskId={taskId}
                    columnId={columnId}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default Items;
