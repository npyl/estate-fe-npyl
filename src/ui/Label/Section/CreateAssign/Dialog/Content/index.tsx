import { FC, useCallback, useMemo, useRef } from "react";
import { LabelResourceType } from "src/types/label";
import dynamic from "next/dynamic";
import AvailableLabels from "./AvailableLabels";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import ExclusiveAccordion, {
    ExclusiveAccordionRef,
    IOption,
} from "@/ui/ExclusiveAccordion";
import { TranslationType } from "@/types/translation";
const LabelForm = dynamic(() => import("@/ui/Label/Form"));

type TExpanded = "ADD" | "EXISTING";

interface OptionsProps {
    resourceId?: number;
    resource: LabelResourceType;
    onExisting: VoidFunction;
}

const getOPTIONS = (
    t: TranslationType,
    { resource, resourceId, onExisting }: OptionsProps
): IOption<TExpanded>[] => [
    {
        optionKey: "EXISTING",
        label: (
            <Typography variant="h6" textAlign="left">
                {t("Labels")}
            </Typography>
        ),
        content: (
            <AvailableLabels resource={resource} resourceId={resourceId} />
        ),
    },
    {
        optionKey: "ADD",
        label: (
            <Typography variant="h6" textAlign="left">
                {t("Create")}
            </Typography>
        ),
        content: <LabelForm onCreate={onExisting} onCancel={onExisting} />,
    },
];

interface ContentProps {
    resourceId?: number;
    resource: LabelResourceType;
}

const Content: FC<ContentProps> = ({ resourceId, resource }) => {
    const accordionRef = useRef<ExclusiveAccordionRef<TExpanded>>();
    const onExisting = useCallback(
        () => accordionRef.current?.setExpanded("EXISTING"),
        []
    );

    const { t } = useTranslation();
    const OPTIONS = useMemo(
        () =>
            getOPTIONS(t, {
                resource,
                resourceId,
                onExisting,
            }),
        [t, resource, resourceId]
    );

    return (
        <ExclusiveAccordion
            ref={accordionRef as any}
            initial="EXISTING"
            options={OPTIONS}
        />
    );
};

export default Content;
