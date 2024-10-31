import { FC, useMemo } from "react";
import { useDeleteCardMutation, useGetBoardQuery } from "src/services/tickets";
import KanbanTaskCard from "../KanbanTaskCard";
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
            {ids.map((cardId, index) => {
                const card = cards?.find((c) => c.id === cardId);

                return card ? (
                    <KanbanTaskCard
                        key={index}
                        index={index}
                        onDeleteTask={deleteCard}
                        card={card}
                    />
                ) : null;
            })}
        </Stack>
    );
};

export default Cards;
