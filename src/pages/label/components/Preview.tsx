import { Grid, Stack, Typography, Paper } from "@mui/material";
import { EditableLabel } from "src/components/label";
import { ILabel } from "src/types/label";
import { IEditProps } from "./types";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useGetLabelsQuery } from "src/services/labels";

interface PreviewProps {
    onEdit: (label: IEditProps) => void;
    onDelete: (resource: string, labelId: number) => void;
}

export const Preview = ({ onEdit, onDelete }: PreviewProps) => {
    const { t } = useTranslation();

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
            [labels]
        );

    return (
        <Grid component={Paper} item xs={12} sm p={2}>
            <Stack direction={"column"} spacing={3}>
                <Typography variant="h5">{t("Already Existing")}</Typography>
                {labelData
                    ? Object.entries(labelData).map(([_, value], index) => (
                          <Grid
                              item
                              key={index}
                              gap={1}
                              container
                              flex={1}
                              direction={"column"}
                          >
                              <Typography variant="h6" color={"text.secondary"}>
                                  {value.label}
                              </Typography>
                              <Stack
                                  direction={"row"}
                                  flexWrap={"wrap"}
                                  gap={0.5}
                              >
                                  {value.data?.map((label: ILabel) => (
                                      <EditableLabel
                                          key={label.id}
                                          variant="soft"
                                          sx={{
                                              borderRadius: 7,
                                              color: "white",
                                              bgcolor: label.color,
                                          }}
                                          onClose={() =>
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
                                      </EditableLabel>
                                  ))}
                              </Stack>
                          </Grid>
                      ))
                    : null}
            </Stack>
        </Grid>
    );
};
