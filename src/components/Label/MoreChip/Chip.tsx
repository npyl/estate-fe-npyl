// Chip with popover

import { ChipProps, Grid, Popper, IconButton, Typography } from "@mui/material";
import { useCallback, useState, MouseEvent } from "react";
import { ILabel } from "src/types/label";
import { Label } from "@/components/Label";
import { Close } from "@mui/icons-material";
import StyledChip, { StyledPaper } from "./styles";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";

interface MoreChipProps extends ChipProps {
    labels: ILabel[];
}

const MoreChip = ({ labels, ...props }: MoreChipProps) => {
    const { t } = useTranslation();

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
                <StyledPaper
                    elevation={20}
                    sx={{
                        mt: 1,
                    }}
                >
                    <SpaceBetween alignItems="center">
                        <Typography variant="h6">{t("All labels")}</Typography>
                        <IconButton size="small" onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </SpaceBetween>
                    <Grid container mt={1} spacing={1}>
                        {labels.map(({ id, name, color }) => (
                            <Grid item xs={6} key={id}>
                                <Label
                                    color={color}
                                    name={name}
                                    maxWidth="100%"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </StyledPaper>
            </Popper>
        </>
    );
};

export default MoreChip;
