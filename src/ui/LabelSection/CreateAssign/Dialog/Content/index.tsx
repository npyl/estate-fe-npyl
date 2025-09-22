import { FC, useCallback, useMemo, useRef } from "react";
import { ILabel, LabelResourceType } from "src/types/label";
import dynamic from "next/dynamic";
import AvailableLabels from "./AvailableLabels";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import ExclusiveAccordion, {
    ExclusiveAccordionRef,
    IOption,
} from "@/ui/ExclusiveAccordion";
import { TranslationType } from "@/types/translation";
const LabelForm = dynamic(() => import("@/ui/LabelForm"));

type TExpanded = "ADD" | "EXISTING";

interface OptionsProps {
    resourceId?: number;
    resource: LabelResourceType;
    onCreate?: (id: number) => void;
    onLabelClick: (l: ILabel) => void;
    onExisting: VoidFunction;
}

const getOPTIONS = (
    t: TranslationType,
    { resource, resourceId, onCreate, onLabelClick, onExisting }: OptionsProps
): IOption<TExpanded>[] => [
    {
        optionKey: "EXISTING",
        label: (
            <Typography variant="h5" textAlign="left">
                {t("Add an existing label")}
            </Typography>
        ),
        content: (
            <AvailableLabels
                resource={resource}
                resourceId={resourceId}
                onLabelClick={onLabelClick}
            />
        ),
    },
    {
        optionKey: "ADD",
        label: (
            <Typography variant="h5" textAlign="left">
                {t("Create")}
            </Typography>
        ),
        content: (
            <LabelForm
                noTitle
                resource={resource}
                resourceId={resourceId}
                onCreate={onCreate}
                onCancel={onExisting}
            />
        ),
    },
];

interface ContentProps {
    resourceId?: number;
    resource: LabelResourceType;

    onCreate?: (id: number) => void;
    onLabelClick: (l: ILabel) => void;
}

const Content: FC<ContentProps> = ({
    resourceId,
    resource,
    onCreate,
    // ...
    onLabelClick,
}) => {
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
                onCreate,
                onLabelClick,
                onExisting,
            }),
        [t, resource, resourceId, onCreate, onLabelClick]
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
