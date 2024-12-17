import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGetLabelsQuery } from "src/services/labels";
import { IEditProps } from "./types";
import HoverableLabel from "./HoverableLabel";
import { ILabel, LabelResourceType } from "@/types/label";

type TLabelSections = Record<
    string,
    { label: string; variant: LabelResourceType; data: ILabel[] }
>;

interface PreviewProps {
    onEdit: (label: IEditProps) => void;
}

const Preview = ({ onEdit }: PreviewProps) => {
    const { t } = useTranslation();

    const { data: labels } = useGetLabelsQuery();

    const labelData: TLabelSections = useMemo(
        () => ({
            propertyLabels: {
                label: t("Property"),
                variant: "property",
                data: labels?.propertyLabels || [],
            },
            customerLabels: {
                label: t("Customer"),
                variant: "customer",
                data: labels?.customerLabels || [],
            },
            documentLabels: {
                label: t("Document"),
                variant: "document",
                data: labels?.documentLabels || [],
            },
        }),
        [t, labels]
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
                                          maxWidth="70%"
                                          // ...
                                          labelId={label.id}
                                          variant={value.variant}
                                          // ...
                                          color={label.color}
                                          name={label.name}
                                          onEdit={() =>
                                              onEdit({
                                                  ...label,
                                                  resource: value.variant,
                                              })
                                          }
                                      />
                                  </Grid>
                              ))}
                          </Grid>
                      </Stack>
                  ))
                : null}
        </Paper>
    );
};

export default Preview;
