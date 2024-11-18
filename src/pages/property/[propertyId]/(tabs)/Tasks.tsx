import { useGetTasksQuery } from "@/services/properties";
import { useRouter } from "next/router";
import Card from "@/sections/Tasks/card";
import { IKanbanCardShort } from "@/types/tasks";
import Container from "@mui/material/Container";
import { SxProps, Theme } from "@mui/material";

// -------------------------------------------------------------------

const CardSx: SxProps<Theme> = {
    ".TaskCard-HeaderControls": {
        display: "none",
    },
};

// -------------------------------------------------------------------

const getCard = (c: IKanbanCardShort) => (
    <Card key={c.id} card={c} sx={CardSx} />
);

// -------------------------------------------------------------------

const Tasks = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data: cards } = useGetTasksQuery(+propertyId!);

    return <Container maxWidth="md">{cards?.map(getCard)}</Container>;
};

export default Tasks;
