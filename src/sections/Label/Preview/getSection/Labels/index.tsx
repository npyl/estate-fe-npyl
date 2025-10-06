import { Grid } from "@mui/material";
import { FC } from "react";
import { useGetLabelsQuery } from "src/services/labels";
import { ILabels, LabelResourceType } from "@/types/label";
import getLabel from "./getLabel";
import ActionsPopover from "./ActionsPopover";
import useActionsPopover from "./ActionsPopover/useActionsPopover";

interface LabelsProps {
    sectionKey: keyof ILabels;
    resource: LabelResourceType;
}

const Labels: FC<LabelsProps> = ({ sectionKey, resource }) => {
    const { data: labels } = useGetLabelsQuery();

    const data = labels?.[sectionKey] || [];

    const { ref, open } = useActionsPopover(resource);

    return (
        <Grid container spacing={0.7}>
            {data?.map(getLabel(open))}

            {/* Label Actions */}
            <ActionsPopover ref={ref} resource={resource} />
        </Grid>
    );
};

export default Labels;
