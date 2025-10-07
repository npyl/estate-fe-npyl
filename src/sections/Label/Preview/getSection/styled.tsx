import Accordion, { accordionClasses } from "@mui/material/Accordion";
import { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import { styled } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    [`:has(.${accordionClasses.expanded})`]: {
        [`.${accordionSummaryClasses.root}`]: {
            borderBottom: "1px solid",
            borderColor: getBorderColor2(theme),
        },
    },
}));

export default StyledAccordion;
