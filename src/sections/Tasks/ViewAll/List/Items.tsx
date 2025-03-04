import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import { useMemo } from "react";
import { useGetBoardQuery } from "@/services/tasks";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
const Item = dynamic(() => import("./Item"));

interface ItemsProps extends StackProps {
    columnId: number;
    ids: number[];
}

const Items: FC<ItemsProps> = ({ columnId, ids, ...props }) => {
    const { data: board } = useGetBoardQuery({});
    const cards = useMemo(() => board?.cards || [], [board]);

    const [_, setTaskId] = useQueryState("taskId", parseAsInteger);

    return (
        <Stack {...props}>
            {ids.map((id) => {
                const card = cards?.find((c) => c.id === id);
                if (!card) return null;

                return <Item key={id} c={card} onClick={() => setTaskId(id)} />;
            })}
        </Stack>
    );
};

export default Items;
