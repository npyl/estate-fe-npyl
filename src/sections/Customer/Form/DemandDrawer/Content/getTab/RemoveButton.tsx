import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { FC } from "react";
import { CloseIcon } from "yet-another-react-lightbox/core";
import { useFieldArrayContext } from "@/components/hook-form/FieldArrayContext";

interface RemoveButtonProps {
    index: number;
    onBeforeRemove: (index: number) => void;
}

const RemoveButton: FC<RemoveButtonProps> = ({ index, onBeforeRemove }) => {
    const { remove } = useFieldArrayContext();
    const handleRemove = useCallback(() => {
        onBeforeRemove(index);
        remove(index);
    }, []);

    return (
        <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
                borderRadius: "100%",
            }}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
};

export default RemoveButton;
