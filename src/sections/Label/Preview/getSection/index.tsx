import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ILabels } from "@/types/label";
import { TSection } from "../types";
import Labels from "./Labels";

interface SectionProps {
    sectionKey: keyof ILabels;
    section: TSection;
}

const Section: FC<SectionProps> = ({ sectionKey, section }) => {
    const { label, variant } = section;

    return (
        <Stack width={1} spacing={1}>
            <Typography variant="h6" color="text.secondary">
                {label}
            </Typography>
            <Labels sectionKey={sectionKey} resource={variant} />
        </Stack>
    );
};

const getSection = (entry: [keyof ILabels, TSection]) => {
    const [key, section] = entry;
    return <Section key={key} sectionKey={key} section={section} />;
};

export type { TSection };
export default getSection;
