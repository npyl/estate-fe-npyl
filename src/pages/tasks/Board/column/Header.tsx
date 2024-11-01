// @mui
import { SpaceBetween } from "@/components/styled";
import {
    useDeleteColumnMutation,
    useEditColumnMutation,
} from "@/services/tickets";
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

const Controls = () => {
    const [editColumn] = useEditColumnMutation();
    const [deleteColumn] = useDeleteColumnMutation();

    // const handleUpdateColumn = async (name: string) =>
    //     editColumn({ id: column.id, name });
    // const handleDeleteColumn = async () => deleteColumn(column.id);

    return null;
};

// -------------------------------------------------------------------

type Props = {
    name: string;
    count: number;
};

export default function Header({ name, count }: Props) {
    return (
        <SpaceBetween alignItems="center" spacing={1}>
            <Typography variant="h6">
                {name} ({count})
            </Typography>

            <Controls />
        </SpaceBetween>
    );
}
