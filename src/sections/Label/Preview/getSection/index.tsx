import { FC } from "react";
import { ILabels } from "@/types/label";
import { TSection } from "../types";
import Labels from "./Labels";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

interface SectionProps {
    sectionKey: keyof ILabels;
    section: TSection;
}

const Section: FC<SectionProps> = ({ sectionKey, section }) => {
    const { label, variant } = section;

    return (
        <Accordion defaultExpanded>
            <AccordionSummary>
                <Typography variant="h6" color="text.secondary">
                    {label}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Labels sectionKey={sectionKey} resource={variant} />
            </AccordionDetails>
        </Accordion>
    );
};

const getSection = (entry: [keyof ILabels, TSection]) => {
    const [key, section] = entry;
    return <Section key={key} sectionKey={key} section={section} />;
};

export type { TSection };
export default getSection;
