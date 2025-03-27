import Stack, { StackProps } from "@mui/material/Stack";
import { FC, useCallback } from "react";
import { useMemo } from "react";
import { useGetBoardQuery } from "@/services/tasks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Item = dynamic(() => import("./Item"));

interface ItemsProps extends StackProps {
    columnId: number;
    ids: number[];
}

const Items: FC<ItemsProps> = ({ columnId, ids, ...props }) => {
    const { data: board } = useGetBoardQuery({});
    const cards = useMemo(() => board?.cards || [], [board]);

    const router = useRouter();
    const onClick = useCallback(
        (id: number) => router.push(`/tasks/${id}`),
        []
    );

    return (
        <Stack {...props}>
            {ids.map((id) => {
                const card = cards?.find((c) => c.id === id);
                if (!card) return null;

                return <Item key={id} c={card} onClick={() => onClick(id)} />;
            })}
        </Stack>
    );
};

export default Items;
