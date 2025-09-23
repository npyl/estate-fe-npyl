import {
    ForwardedRef,
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
    accordionSummaryClasses,
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import getBorderColor from "@/theme/borderColor";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    borderColor: getBorderColor(theme),
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}));

const UNCHECKED_CLASSNAME = "UncheckedClassName";
const CHECKED_CLASSNAME = "CheckedClassName";

const ExpandIcon = () => (
    <>
        <RadioButtonUncheckedIcon
            className={UNCHECKED_CLASSNAME}
            sx={{ width: "13px", height: "13px", display: "block" }}
        />
        <CircleIcon
            className={CHECKED_CLASSNAME}
            sx={{ width: "13px", height: "13px", display: "none" }}
        />
    </>
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary {...props} expandIcon={<ExpandIcon />} />
))(({ theme }) => ({
    backgroundColor: theme.palette.background.default,

    flexDirection: "row-reverse",
    alignItems: "center",
    gap: theme.spacing(1),

    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
        {
            [`.${CHECKED_CLASSNAME}`]: {
                display: "block",
            },

            [`.${UNCHECKED_CLASSNAME}`]: {
                display: "none",
            },
        },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    borderTop: `1px solid`,
    borderColor: getBorderColor(theme),
}));

interface IOption<T> {
    optionKey: T;
    label: ReactNode;
    content: ReactNode;
}

interface OptionProps<T> {
    expanded: T;
    setExpanded: (c: T) => void;

    fallback: T;

    o: IOption<T>;
}

const Option = <T,>({ o, expanded, setExpanded, fallback }: OptionProps<T>) => {
    const isExpanded = o.optionKey === expanded;

    const onChange = useCallback(
        (e: T) => (_: any) => setExpanded(e),
        [fallback]
    );

    return (
        <Accordion expanded={isExpanded} onChange={onChange(o.optionKey)}>
            <AccordionSummary>{o.label}</AccordionSummary>
            <AccordionDetails>{o.content}</AccordionDetails>
        </Accordion>
    );
};

const getOption =
    <T,>(expanded: T, setExpanded: (c: T) => void, initial: T) =>
    (o: IOption<T>) => (
        <Option
            key={o.optionKey as string}
            o={o}
            // ...
            expanded={expanded}
            setExpanded={setExpanded}
            fallback={initial}
        />
    );

// -----------------------------------------------------------------------------------

interface ExclusiveAccordionRef<T> {
    setExpanded: (e: T) => void;
}

interface ExclusiveAccordionProps<T> {
    initial: T;
    options: IOption<T>[];
}

const ExclusiveAccordion = forwardRef(
    <T,>(
        { initial, options }: ExclusiveAccordionProps<T>,
        ref: ForwardedRef<ExclusiveAccordionRef<T>>
    ) => {
        const [expanded, setExpanded] = useState<T>(initial);
        useImperativeHandle(ref, () => ({ setExpanded }), []);
        return options.map(getOption(expanded, setExpanded, initial));
    }
);

export type { IOption, ExclusiveAccordionRef };
export default ExclusiveAccordion;
