import { FC, useMemo } from "react";
import { useDeleteCardMutation, useGetBoardQuery } from "src/services/tickets";
import Card from "../card";
import { Stack, StackProps } from "@mui/material";

interface CardsProps extends StackProps {
    ids: number[];
}

const Cards: FC<CardsProps> = ({ ids, ...props }) => {
    const { data: board } = useGetBoardQuery();
    const cards = useMemo(() => board?.cards || [], [board]);

    const [deleteCard] = useDeleteCardMutation();

    return (
        <Stack {...props}>
            {ids.map((id, i) => {
                const card = cards?.find((c) => c.id === id);
                if (!card) return null;

                return (
                    <Card
                        key={id}
                        index={i}
                        onDeleteTask={deleteCard}
                        card={card}
                    />
                );
            })}
        </Stack>
    );
};

export default Cards;
