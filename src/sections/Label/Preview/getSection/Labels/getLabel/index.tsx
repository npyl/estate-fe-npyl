import { ILabel } from "@/types/label";
import { FC, MouseEvent, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { Label } from "@/components/Label";
import { TClickCb } from "../types";
import { SxProps, Theme } from "@mui/material";

const LabelSx: SxProps<Theme> = {
    ":hover": {
        backgroundColor: "info.main",
        color: "neutral.200",
        cursor: "pointer",
        boxShadow: 15,
    },
};

interface LabelItemProps {
    l: ILabel;
    onClick: TClickCb;
}

const LabelItem: FC<LabelItemProps> = ({ l, onClick: _onClick }) => {
    const onClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => _onClick(e, l.id),
        [l.id]
    );
    return (
        <Grid item xs={12} sm={6} md={4} xl={3}>
            <Label
                width="fit-content"
                maxWidth="70%"
                sx={LabelSx}
                // ...
                color={l.color}
                name={l.name}
                // ...
                onClick={onClick}
            />
        </Grid>
    );
};

const getLabel = (onClick: TClickCb) => (l: ILabel) => (
    <LabelItem key={l.id} l={l} onClick={onClick} />
);

export default getLabel;
