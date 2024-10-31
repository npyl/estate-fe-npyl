import { useTranslation } from "react-i18next";

// @mui
import { Button, Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { IKanbanCardPOST } from "src/types/kanban";
// styled
import { StyledLabel, StyledTextField } from "./styled";
import { EnterOverlay } from "../../../EnterOverlay";

// ----------------------------------------------------------------------

interface DescriptionProps {
    taskDescription: string;
    onUpdate: (card: Partial<IKanbanCardPOST>) => void;
    onClose: () => void;
}

const Description = ({
    taskDescription,
    onClose,
    onUpdate,
}: DescriptionProps) => {
    const { t } = useTranslation();

    const descriptionRef = useRef<HTMLInputElement>(null);

    const [initialState, setInitialState] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setDescription(taskDescription);
        setInitialState(taskDescription);
    }, [taskDescription]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value),
        []
    );

    const handleUpdate = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && descriptionRef.current) {
                descriptionRef.current.blur();

                onUpdate({
                    description,
                });
            }
        },
        [description]
    );

    const handleClick = useCallback(() => {
        onUpdate({
            description,
        });
    }, [description]);

    return (
        <Stack direction="column" spacing={1}>
            <StyledLabel>{t("Description")}</StyledLabel>

            <EnterOverlay show={description !== initialState}>
                <StyledTextField
                    fullWidth
                    multiline
                    size="small"
                    rows={5}
                    ref={descriptionRef}
                    value={description}
                    onChange={handleChange}
                    onKeyUp={handleUpdate}
                    InputProps={{
                        sx: {
                            typography: "body2",
                        },
                    }}
                />
            </EnterOverlay>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    handleClick();
                    onClose();
                }}
                sx={{
                    width: "fit-content",
                    alignSelf: "center",
                    textTransform: "none",
                }}
            >
                {t("Save Description")}
            </Button>
        </Stack>
    );
};

export default Description;
