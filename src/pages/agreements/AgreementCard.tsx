import { IAgreement } from "@/types/agreements";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { getBorderColor2 } from "@/theme/borderColor";
import Image from "next/image";
import React from "react";
import { Label } from "@/components/Label";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ------------------------------------------------------------

const Card = styled(Paper)(({ theme }) => ({
    cursor: "pointer",
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "15px",
    padding: theme.spacing(1),
    boxShadow: "none",
    "&:hover": {
        boxShadow: theme.shadows[20],
    },
    // ...
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

interface CardImageProps {
    variant: "basic" | "purchase";
}
const CardImage: React.FC<CardImageProps> = ({ variant }) => (
    <Image
        src={`/static/files/ic_file.svg`}
        alt={variant}
        width={50}
        height={50}
    />
);

interface CardLabelProps {
    variant: "basic" | "purchase";
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

// ------------------------------------------------------------

interface Props {
    a: IAgreement;
}

const AgreementCard: React.FC<Props> = ({ a }) => (
    <Card>
        <Stack direction="row" spacing={1} alignItems="center">
            <CardImage variant={a.variant} />
            <Typography variant="body2">{a.title}</Typography>
        </Stack>

        <Stack spacing={1}>
            <CardLabel variant={a.variant} />
            {a.draft ? <DraftLabel /> : null}
        </Stack>
    </Card>
);

export default AgreementCard;
