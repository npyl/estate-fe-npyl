import { ILabel, LabelResourceType } from "@/types/label";
import { FC } from "react";
import HoverableLabel from "./HoverableLabel";
import Grid from "@mui/material/Grid";

interface LabelItemProps {
    l: ILabel;
    variant: LabelResourceType;
}

const LabelItem: FC<LabelItemProps> = ({ l, variant }) => (
    <Grid item key={l.id} xs={12} sm={6} md={4} xl={3}>
        <HoverableLabel
            width="fit-content"
            maxWidth="70%"
            // ...
            labelId={l.id}
            variant={variant}
            // ...
            color={l.color}
            name={l.name}
            // ...
            onEdit={
                () => {}
                // onEdit({
                //     ...label,
                //     resource: variant,
                // })
            }
        />
    </Grid>
);

const getLabel = (variant: LabelResourceType) => (l: ILabel) => (
    <LabelItem l={l} variant={variant} />
);

export default getLabel;
