import { useTranslation } from "react-i18next";

// @mui
import { Stack } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { IKanbanCardPOST } from "src/types/kanban";
// styled
import { StyledLabel, StyledTextField } from "./styled";
import { EnterOverlay } from "../EnterOverlay";

// ----------------------------------------------------------------------

interface DescriptionProps {
    taskDescription: string;
    onUpdate: (card: Partial<IKanbanCardPOST>) => void;
}

const Description = ({ taskDescription, onUpdate }: DescriptionProps) => {
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

    return (
        <Stack direction="row">
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
        </Stack>
    );
};

export default Description;
