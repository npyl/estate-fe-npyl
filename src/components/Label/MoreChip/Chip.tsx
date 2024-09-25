// Chip with popover
// INFO:    This chip is used primarily on the DataGrids that have NextLink for redirect.
//          The preventDefault() code is required for the chip to handle clicks without
//          worrying about redirects

import { ChipProps, Grid, Popper, IconButton, Typography } from "@mui/material";
import { useCallback, MouseEvent, FC, useRef } from "react";
import { ILabel } from "src/types/label";
import { Label } from "@/components/Label";
import { Close } from "@mui/icons-material";
import StyledChip, { StyledPaper } from "./styles";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import useDialog from "@/hooks/useDialog";

const preventDefault = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();

interface MoreChipProps extends Omit<ChipProps, "ref"> {
    labels: ILabel[];
}

const MoreChip: FC<MoreChipProps> = ({ labels, ...props }) => {
    const { t } = useTranslation();

    const anchorRef = useRef<HTMLDivElement>(null);

    const [isOpen, openPopper, closePopper] = useDialog();

    const handleOpen = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        openPopper();
    }, []);
    const handleClose = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        closePopper();
    }, []);

    return (
        <>
            <StyledChip {...props} ref={anchorRef} onClick={handleOpen} />

            {isOpen ? (
                <Popper
                    open
                    anchorEl={anchorRef.current}
                    onClick={preventDefault}
                >
                    <StyledPaper elevation={20}>
                        <SpaceBetween alignItems="center">
                            <Typography variant="h6">
                                {t("All labels")}
                            </Typography>
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
                                        width="min-content"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </StyledPaper>
                </Popper>
            ) : null}
        </>
    );
};

export default MoreChip;
