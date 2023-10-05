import { useState } from "react";
// @mui
import { Button, ClickAwayListener, Paper, TextField } from "@mui/material";
// components
import Iconify from "../../../../components/iconify";

import { useAddColumnMutation } from "src/services/tickets";

// ----------------------------------------------------------------------

export default function KanbanColumnAdd() {
    const [name, setName] = useState("");

    const [open, setOpen] = useState(false);

    const [addColumn] = useAddColumnMutation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
        setName(event.target.value);

    const handleCreateColumn = async () =>
        addColumn({ name }).then((res) => handleClose());

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleCreateColumn();
        }
    };

    return (
        <Paper sx={{ minWidth: 280, width: 280 }}>
            {open ? (
                <ClickAwayListener onClickAway={handleCreateColumn}>
                    <TextField
                        autoFocus
                        fullWidth
                        placeholder="New section"
                        value={name}
                        onChange={handleChangeName}
                        onKeyUp={handleKeyUp}
                        InputProps={{
                            sx: { typography: "h6" },
                        }}
                    />
                </ClickAwayListener>
            ) : (
                <Button
                    fullWidth
                    size="large"
                    color="inherit"
                    variant="outlined"
                    startIcon={<Iconify icon="eva:plus-fill" mb={2} />}
                    onClick={handleOpen}
                >
                    Add section
                </Button>
            )}
        </Paper>
    );
}
