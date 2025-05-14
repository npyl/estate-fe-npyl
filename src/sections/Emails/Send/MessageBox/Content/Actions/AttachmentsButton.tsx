import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileInput, { OpenerBaseProps } from "@/components/FileInput";
import { ChangeEvent, FC, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TMessageBoxValues } from "../../types";
import toast from "react-hot-toast";
import { infoToast } from "@/components/Toaster";

const LITERAL_0 = "EMAILS_REMOVED_DUPLICATES_0";
const LITERAL_1 = "EMAILS_REMOVED_DUPLICATES_1";

const doesntExistIn =
    (old: File[]) =>
    ({ name }: File) =>
        !old.find(({ name: oldName }) => name === oldName);

const Opener: FC<OpenerBaseProps> = ({ onClick }) => (
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

            const files = Array.from(list);

            // Remove duplicates & notify
            const filtered = files.filter(doesntExistIn(old));
            const isDuplicates = files.length !== filtered.length;
            const isWithNew = filtered.length > 0;
            if (isDuplicates)
                infoToast(LITERAL_0, isWithNew ? LITERAL_1 : undefined);

            const attachments = [...old, ...filtered];

            setValue("attachments", attachments, { shouldDirty: true });
        },
        [old]
    );

    return <FileInput Opener={Opener} multiple onChange={onChange} />;
};

export default AttachmentsButton;
