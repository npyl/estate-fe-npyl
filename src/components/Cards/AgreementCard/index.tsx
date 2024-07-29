import { IAgreementShort } from "@/types/agreements";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Card } from "./styled";
import PropertyDetails from "./PropertyDetails";
import Controls from "./Controls";
import CardImage from "./Image";
import { CardLabel, DraftLabel } from "./Labels";

// ------------------------------------------------------------

interface Props {
    a: IAgreementShort;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const AgreementCard: React.FC<Props> = ({ a, onEdit, onDelete }) => (
    <Card>
        <CardImage variant={a.variant.key} />

        <Stack spacing={1} height={1}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
            >
                <CardLabel variant={a.variant.key} />
                {a.draft ? <DraftLabel /> : null}
            </Stack>

            <Stack spacing={1} px={1}>
                <Typography variant="h6" py={0.5}>
                    {a.title}
                </Typography>

                <PropertyDetails
                    propertyId={a.property.id}
                    code={a.property.code}
                />
            </Stack>

            <Box flexGrow={1} />

            {onDelete && onEdit ? (
                <Controls
                    agreement={a}
                    onEdit={() => onEdit(a.id)}
                    onDelete={() => onDelete(a.id)}
                />
            ) : null}
        </Stack>
    </Card>
);

export default AgreementCard;
