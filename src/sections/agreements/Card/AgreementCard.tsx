import { IAgreement, IAgreementType } from "@/types/agreements";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getBorderColor2 } from "@/theme/borderColor";
import Image from "next/image";
import React from "react";
import { Label } from "@/components/Label";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";

// ------------------------------------------------------------

const Card = styled(Paper)(({ theme }) => ({
    cursor: "pointer",
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "15px",
    padding: theme.spacing(1),
    boxShadow: theme.shadows[10],
    height: "250px",
    // ...
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // ...
    "& .AgreementCardButtons": {
        visibility: "hidden",
    },
    "&:hover": {
        boxShadow: theme.shadows[20],

        "& .AgreementCardButtons": {
            visibility: "visible",
        },
    },
}));

interface CardImageProps {
    variant: IAgreementType;
}
const CardImage: React.FC<CardImageProps> = ({ variant }) => (
    <Image
        src="/static/files/ic_file.svg"
        alt={variant}
        width={0}
        height={0}
        style={{
            height: "100%",
            width: "30%",
        }}
    />
);

interface CardLabelProps {
    variant: IAgreementType;
}
const CardLabel: React.FC<CardLabelProps> = ({ variant }) => (
    <Label
        opaque
        color={variant === "basic" ? "primary" : "info"}
        name={variant}
    />
);

const DraftLabel = () => (
    <Label opaque color="warning" justifyContent="center" name="Draft" />
);

interface PropertyDetailsProps {
    propertyId: number;
    code: string;
}
const PropertyDetails: React.FC<PropertyDetailsProps> = ({
    propertyId,
    code,
}) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <HomeIcon color="action" />
        <IconButton
            component={NextLink}
            size="small"
            href={`/property/${propertyId}`}
        >
            {code}
        </IconButton>
    </Stack>
);

// ------------------------------------------------------------

interface Props {
    a: IAgreement;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const AgreementCard: React.FC<Props> = ({ a, onEdit, onDelete }) => (
    <Card>
        <CardImage variant={a.variant} />

        <Stack spacing={1} height={1}>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
            >
                <CardLabel variant={a.variant} />
                {a.draft ? <DraftLabel /> : null}
            </Stack>

            <Stack spacing={1} px={1}>
                <Typography variant="h6" py={0.5}>
                    {a.title}
                </Typography>

                <PropertyDetails
                    propertyId={a.assignedProperty.id}
                    code={a.assignedProperty.code}
                />
            </Stack>

            <Box flexGrow={1} />

            <Stack
                spacing={1}
                direction="row"
                justifyContent="flex-end"
                className="AgreementCardButtons"
            >
                <IconButton onClick={() => onEdit(a.id)}>
                    <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(a.id)}>
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </Stack>
    </Card>
);

export default AgreementCard;
