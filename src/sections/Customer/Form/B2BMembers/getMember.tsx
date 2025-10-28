import { IconButton, Stack, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useWatch } from "react-hook-form";
import { useCallback } from "react";
import { nameKey } from "./constants";
import { SpaceBetween } from "@/components/styled";
import EditOpener from "./EditOpener";
import { B2BMemberReq } from "@/types/customer";
import { ICustomerYup } from "../types";

interface MemberProps {
    index: number;
    onEdit: (index: number, m: B2BMemberReq) => void;
    onRemove: (i: number) => void;
}

const Member = ({ index, onEdit, onRemove: _onRemove }: MemberProps) => {
    const onRemove = useCallback(() => _onRemove(index), [index]);

    const m = useWatch<ICustomerYup>({
        name: `${nameKey}.${index}`,
    });
    const { position, firstName, lastName, email } = m || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    return (
        <SpaceBetween direction="row" spacing={1.5} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>{position}</Typography>
                <Typography variant="body1" fontWeight="bold">
                    {fullname}
                </Typography>
                <Typography>({email})</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <EditOpener index={index} member={m} onEdit={onEdit} />
                <IconButton onClick={onRemove}>
                    <Cancel />
                </IconButton>
            </Stack>
        </SpaceBetween>
    );
};

const getMember =
    (
        onEdit: (index: number, m: B2BMemberReq) => void,
        onRemove: (i: number) => void
    ) =>
    (m: Record<"id", string>, i: number) => (
        <Member key={m.id} index={i} onEdit={onEdit} onRemove={onRemove} />
    );

export default getMember;
