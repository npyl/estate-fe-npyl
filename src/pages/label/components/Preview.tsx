import { Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Label, LabelProps } from "@/components/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { ILabel } from "src/types/label";
import { IEditProps } from "./types";

interface HoverableLabelProps extends LabelProps {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

const HoverableLabel = ({
    onEdit,
    onDelete,
    children,
    ...props
}: HoverableLabelProps) => {
    const [hovered, setHovered] = useState(false);
    const onMouseEnter = useCallback(() => setHovered(true), []);
    const onMouseLeave = useCallback(() => setHovered(false), []);

    return (
        <Label
            {...props}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}

            {hovered ? (
                <>
                    <IconButton onClick={onEdit}>
                        <EditIcon
                            sx={{
                                fontSize: "15px",
                            }}
                        />
                    </IconButton>
                    <IconButton onClick={onDelete}>
                        <DeleteIcon
                            sx={{
                                fontSize: "15px",
                            }}
                        />
                    </IconButton>
                </>
            ) : null}
        </Label>
    );
};

interface PreviewProps {
    onEdit: (label: IEditProps) => void;
    onDelete: (resource: string, labelId: number) => void;
}

export const Preview = ({ onEdit, onDelete }: PreviewProps) => {
    const { t, i18n } = useTranslation();

    const propertySectionLabel = t("Property Labels");
    const customerSectionLabel = t("Customer Labels");
    const documentSectionLabel = t("Document Labels");

    const { data: labels } = useGetLabelsQuery();

    const labelData: Record<string, { label: string; data: ILabel[] }> | null =
        useMemo(
            () => ({
                propertyLabels: {
                    label: propertySectionLabel,
                    data: labels?.propertyLabels || [],
                },
                customerLabels: {
                    label: customerSectionLabel,
                    data: labels?.customerLabels || [],
                },
                documentLabels: {
                    label: documentSectionLabel,
                    data: labels?.documentLabels || [],
                },
            }),
            [labels, i18n.language]
        );

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
            {labelData
                ? Object.entries(labelData).map(([_, value], index) => (
                      <Stack key={index} width={1} spacing={1}>
                          <Typography variant="h6" color="text.secondary">
                              {value.label}
                          </Typography>
                          <Grid container spacing={0.7}>
                              {value.data?.map((label, i) => (
                                  <Grid item key={i} xs={12} sm={6}>
                                      <HoverableLabel
                                          sx={{
                                              maxWidth: "100px",
                                          }}
                                          color={label.color}
                                          onDelete={() =>
                                              label.id &&
                                              onDelete(value.label, label.id)
                                          }
                                          onEdit={() =>
                                              onEdit({
                                                  ...label,
                                                  resource: value.label,
                                              })
                                          }
                                      >
                                          {label.name}
                                      </HoverableLabel>
                                  </Grid>
                              ))}
                          </Grid>
                      </Stack>
                  ))
                : null}
        </Paper>
    );
};
