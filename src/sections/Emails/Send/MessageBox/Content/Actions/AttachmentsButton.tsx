import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { ChangeEvent, FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { TMessageBoxValues } from "../../types";

const Opener: FC<OpenerBaseProps> = ({ loading, onClick }) => (
    <IconButton size="small" onClick={onClick}>
        <AttachFileIcon />
    </IconButton>
);

const AttachmentsButton = () => {
    const { setValue } = useFormContext<TMessageBoxValues>();

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const list = event.target.files;
        if (!list) return;

        const attachments = Array.from(list);

        setValue("attachments", attachments, { shouldDirty: true });
    }, []);

    return <FileInput Opener={Opener} multiple onChange={onChange} />;
};

export default AttachmentsButton;
