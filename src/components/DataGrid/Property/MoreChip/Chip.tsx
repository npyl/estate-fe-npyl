import {
    ChipProps,
    Grid,
    Paper,
    Popper,
    Stack,
    IconButton,
} from "@mui/material";
import { useCallback, useState, MouseEvent } from "react";
import { ILabel } from "src/types/label";
import { Label } from "src/components/label";
import { Close } from "@mui/icons-material";
import StyledChip from "./styles";

interface MoreChipProps extends ChipProps {
    labels: ILabel[];
}

const MoreChip = ({ labels, ...props }: MoreChipProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const handleOpen = useCallback((e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    }, []);
    const handleClose = useCallback(() => setAnchorEl(null), []);

    return (
        <>
            <StyledChip {...props} onClick={handleOpen} />

            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Paper
                    sx={{
                        p: 2,
                        width: "300px",
                    }}
                >
                    <Stack alignItems="flex-end">
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Stack>
                    <Grid container>
                        {labels.map(({ id, name, color }) => (
                            <Grid
                                item
                                xs={6}
                                key={id}
                                sx={{
                                    overflowX: "hidden",
                                }}
                            >
                                <Label
                                    sx={{
                                        bgcolor: color,
                                    }}
                                >
                                    {name}
                                </Label>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Popper>
        </>
    );
};

export default MoreChip;
