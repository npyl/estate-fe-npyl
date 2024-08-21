import { IAgreementShort } from "@/types/agreements";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Card from "./Card";
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
    <MuiLink component={Card} href={`/agreements/${a.id}`}>
        <CardImage variant={a.variant.key} />

        <Stack
            height={1}
            width={1}
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                // ...
                position="absolute"
                top={0}
                right={0}
            >
                <CardLabel variant={a.variant.key} name={a.variant.value} />
                {a.draft ? <DraftLabel /> : null}
            </Stack>

            <Stack spacing={1} px={1}>
                <Typography variant="h6" py={0.5}>
                    {a.title}
                </Typography>

                {a.property ? <PropertyDetails code={a.property.code} /> : null}
            </Stack>

            {onDelete && onEdit ? (
                <Controls
                    agreementId={a.id}
                    onEdit={() => onEdit(a.id)}
                    onDelete={() => onDelete(a.id)}
                />
            ) : null}
        </Stack>
    </MuiLink>
);

export default AgreementCard;
