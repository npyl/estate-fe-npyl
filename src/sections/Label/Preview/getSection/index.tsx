import { Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useGetLabelsQuery } from "src/services/labels";
import { ILabels } from "@/types/label";
import { TSection } from "../types";
import getLabel from "./getLabel";

interface SectionProps {
    sectionKey: keyof ILabels;
    section: TSection;
}

const Section: FC<SectionProps> = ({ sectionKey, section }) => {
    const { data: labels } = useGetLabelsQuery();

    const data = labels?.[sectionKey] || [];

    const { label, variant } = section;

    return (
        <Stack width={1} spacing={1}>
            <Typography variant="h6" color="text.secondary">
                {label}
            </Typography>
            <Grid container spacing={0.7}>
                {data?.map(getLabel(variant))}
            </Grid>
        </Stack>
    );
};

const getSection = (entry: [keyof ILabels, TSection]) => {
    const [key, section] = entry;
    return <Section key={key} sectionKey={key} section={section} />;
};

export type { TSection };
export default getSection;
