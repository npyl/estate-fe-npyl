import { useState } from "react";
// @mui
import {
    Checkbox,
    ClickAwayListener,
    InputBase,
    Paper,
    Stack,
    Tooltip,
} from "@mui/material";

// @types
import { IKanbanCardPOST } from "src/types/kanban";
// components
// import DateRangePicker, {
//     useDateRangePicker,
// } from "src/components/date-range-picker";
import Iconify from "../../../components/iconify";
//
import KanbanContactsDialog from "./KanbanContactsDialog";
import { EnterOverlay } from "./EnterOverlay";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const defaultTask = {
    description: "",
    due: [],
};

type Props = {
    onAddTask: (task: IKanbanCardPOST) => void;
    onCloseAddTask: VoidFunction;
};

export default function KanbanTaskAdd({ onAddTask, onCloseAddTask }: Props) {
    const [name, setName] = useState("");

    const [completed, setCompleted] = useState(false);

    // const {
    //     startDate,
    //     endDate,
    //     onChangeStartDate,
    //     onChangeEndDate,
    //     open: openPicker,
    //     onOpen: onOpenPicker,
    //     onClose: onClosePicker,
    //     isSelected: isSelectedValuePicker,
    //     isError,
    //     shortLabel,
    // } = useDateRangePicker(new Date(), new Date());

    const handleAddTask = () =>
        onAddTask({
            ...defaultTask,
            name,
            due: [
                // startDate?.toDateString() || "",
                // endDate?.toDateString() || "",
                "",
                "",
            ],
            completed,
        });

    const handleKeyUpAddTask = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter" && name.trim() !== "") handleAddTask();
    };

    const handleClickAddTask = () => {
        if (!name) handleAddTask();
        else onCloseAddTask();
    };

    const handleChangeCompleted = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setCompleted(event.target.checked);

    const { t } = useTranslation();

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
                            sx={{ px: 2, pt: 2 }}
                        />
                    </EnterOverlay>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ pl: 1, pr: 1.5, pb: 2 }}
                    >
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
                    </Stack>
                </Paper>

                <KanbanContactsDialog toggleAssignee={() => {}} />

                {/* <DateRangePicker
                    variant="calendar"
                    title="Choose due date"
                    startDate={startDate}
                    endDate={endDate}
                    onChangeStartDate={onChangeStartDate}
                    onChangeEndDate={onChangeEndDate}
                    open={openPicker}
                    onClose={onClosePicker}
                    isSelected={isSelectedValuePicker}
                    isError={isError}
                /> */}
            </div>
        </ClickAwayListener>
    );
}
