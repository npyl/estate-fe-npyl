import { IconButton, Stack, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { useWatch } from "react-hook-form";
import { useCallback } from "react";
import { nameKey } from "./constants";

interface MemberProps {
    index: number;
    onRemove: (i: number) => void;
}

const Member = ({ index, onRemove: _onRemove }: MemberProps) => {
    const onRemove = useCallback(() => _onRemove(index), [index]);

    const firstName =
        useWatch({ name: `${nameKey}[${index}].firstName` }) || "";
    const lastName = useWatch({ name: `${nameKey}[${index}].lastName` }) || "";
    const fullname = `${firstName} ${lastName}`;

    return (
        <Stack direction="row" spacing={1.5}>
            <Typography>{fullname}</Typography>
            <IconButton onClick={onRemove}>
                <Cancel />
            </IconButton>
        </Stack>
    );
};

const getMember =
    (onRemove: (i: number) => void) => (m: Record<"id", string>, i: number) => (
        <Member key={m.id} index={i} onRemove={onRemove} />
    );

export default getMember;
