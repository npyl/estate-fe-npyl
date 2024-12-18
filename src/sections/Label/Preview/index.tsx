import { Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetLabelsQuery } from "src/services/labels";
import { IEditProps } from "./types";
import HoverableLabel from "./HoverableLabel";
import { ILabels, LabelResourceType } from "@/types/label";
import { TranslationType } from "@/types/translation";

type TSection = { label: string; variant: LabelResourceType };

const getSections = (t: TranslationType): Record<keyof ILabels, TSection> => ({
    propertyLabels: {
        label: t("Property"),
        variant: "property",
    },
    customerLabels: {
        label: t("Customer"),
        variant: "customer",
    },
    documentLabels: {
        label: t("Document"),
        variant: "document",
    },
    ticketLabels: {
        label: t("Tasks"),
        variant: "ticket",
    },
});

interface SectionProps {
    sectionKey: keyof ILabels;
    section: TSection;
    onEdit: (label: IEditProps) => void;
}

const Section: FC<SectionProps> = ({ sectionKey, section, onEdit }) => {
    const { data: labels } = useGetLabelsQuery();

    const data = labels?.[sectionKey] || [];

    const { label, variant } = section;

    return (
        <Stack width={1} spacing={1}>
            <Typography variant="h6" color="text.secondary">
                {label}
            </Typography>
            <Grid container spacing={0.7}>
                {data?.map((label, i) => (
                    <Grid item key={i} xs={12} sm={6}>
                        <HoverableLabel
                            maxWidth="70%"
                            // ...
                            labelId={label.id}
                            variant={variant}
                            // ...
                            color={label.color}
                            name={label.name}
                            // ...
                            onEdit={() =>
                                onEdit({
                                    ...label,
                                    resource: variant,
                                })
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

const getSection =
    (onEdit: (label: IEditProps) => void) =>
    (entry: [keyof ILabels, TSection]) => {
        const [key, section] = entry;
        return (
            <Section
                key={key}
                sectionKey={key}
                section={section}
                onEdit={onEdit}
            />
        );
    };

interface PreviewProps {
    onEdit: (label: IEditProps) => void;
}

const Preview: FC<PreviewProps> = ({ onEdit }) => {
    const { t } = useTranslation();

    const sections = useMemo(() => {
        // INFO: Type assertion
        return Object.entries(getSections(t)) as [keyof ILabels, TSection][];
    }, [t]);

    return (
        <Paper
            sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h5">{t("My labels")}</Typography>
            {sections.map(getSection(onEdit))}
        </Paper>
    );
};

export default Preview;
