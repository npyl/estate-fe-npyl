import { useState, KeyboardEvent, ChangeEvent } from "react";
// @mui
import {
    Checkbox,
    ClickAwayListener,
    InputBase,
    Paper,
    Tooltip,
} from "@mui/material";

import Iconify from "@/components/iconify";
//
import { EnterOverlay } from "../EnterOverlay";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import { useAddCardMutation } from "@/services/tasks";
import KanbanContactsDialog from "../card/Details/KanbanContactsDialog";

// ----------------------------------------------------------------------

type Props = {
    columnId: number;
    onClose: VoidFunction;
};

export default function AddTaskField({ columnId, onClose }: Props) {
    const { t } = useTranslation();

    const [name, setName] = useState("");

    const [completed, setCompleted] = useState(false);

    const [addCard] = useAddCardMutation();

    const handleAddTask = () =>
        addCard({
            name,
            description: "",
            due: ["", ""],
            completed,
            columnId,
            createdAt: "",
            priority: 0,
            attachments: [],
            comments: [],
            assignees: [],
            property: 0,
            customer: 0,
        }).then(onClose);

    const handleKeyUpAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && name.trim() !== "") handleAddTask();
    };

    const handleClickAddTask = () => {
        if (!name) handleAddTask();
        else onClose();
    };

    const handleChangeCompleted = (event: ChangeEvent<HTMLInputElement>) =>
        setCompleted(event.target.checked);

    return (
        <ClickAwayListener onClickAway={handleClickAddTask}>
            <div>
                <Paper variant="outlined">
                    <EnterOverlay show={!!name}>
                        <InputBase
                            multiline
                            fullWidth
                            placeholder={t("Task name") as string}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            onKeyUp={handleKeyUpAddTask}
                            sx={{ p: 2, height: "min-content" }}
                        />
                    </EnterOverlay>

                    <SpaceBetween sx={{ px: 1.5, pb: 2 }}>
                        <KanbanContactsDialog toggleAssignee={() => {}} />

                        <Tooltip title={t("Mark complete")}>
                            <Checkbox
                                disableRipple
                                checked={completed}
                                onChange={handleChangeCompleted}
                                icon={
                                    <Iconify icon="eva:radio-button-off-outline" />
                                }
                                checkedIcon={
                                    <Iconify icon="eva:checkmark-circle-2-outline" />
                                }
                            />
                        </Tooltip>
                    </SpaceBetween>
                </Paper>
            </div>
        </ClickAwayListener>
    );
}
