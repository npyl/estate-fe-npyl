import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { ChangeEvent, FC, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../../types";

const Opener: FC<OpenerBaseProps> = ({ loading, onClick }) => (
    <IconButton size="small" onClick={onClick}>
        <AttachFileIcon />
    </IconButton>
);

const AttachmentsButton = () => {
    const old = useWatch<TMessageBoxValues>({ name: "attachments" }) as File[];
    const { setValue } = useFormContext<TMessageBoxValues>();

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const list = event.target.files;
            if (!list) return;

            const attachments = [...old, ...Array.from(list)];

            setValue("attachments", attachments, { shouldDirty: true });
        },
        [old]
    );

    return <FileInput Opener={Opener} multiple onChange={onChange} />;
};

export default AttachmentsButton;
