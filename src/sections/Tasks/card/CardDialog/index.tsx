import Dialog from "@/components/Dialog";
import {
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanCardRes2Req,
    KanbanTaskToCalendarEvent,
} from "@/types/tasks";
import { FC, useCallback, useState } from "react";
import {
    DialogSx,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from "./styled";
import TaskLabel from "./TaskLabel";
import Content from "./Content";
import Actions from "./Actions";
import { FormProvider, useForm } from "react-hook-form";
import EventDates from "@/sections/Calendar/Event/form/EventDates";
import dayjs from "dayjs";
import {
    getAllDayStartEnd,
    isAllDay as getIsAllDay,
} from "@/components/Calendar/util";
import {
    useCreateEventMutation,
    useUpdateEventMutation,
} from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId, onClose }) => {
    const { user } = useAuth();

    // INFO: is all day checkbox
    const _isAllDay = task ? getIsAllDay(task.due[0], task.due[1]) : false;
    const [isAllDay, setAllDay] = useState(_isAllDay);
    const handleAllDay = useCallback((_: any, b: boolean) => setAllDay(b), []);

    // INFO: date for when checked
    const [_allDayDate] = useState(task?.due[0] || dayjs().toISOString());
    const [allDayDate, setAllDayDate] = useState(_allDayDate);

    const methods = useForm<IKanbanCardPOST>({
        values: {
            ...IKanbanCardRes2Req(task),
            columnId: columnId || -1,
            reporterId: user?.id || -1,
        },
    });

    const isDirty =
        _isAllDay !== isAllDay ||
        _allDayDate !== allDayDate ||
        methods.formState.isDirty;

    const [createEvent] = useCreateEventMutation();
    const [updateEvent] = useUpdateEventMutation();

    const handleSubmit = async (d: IKanbanCardPOST) => {
        // INFO: normalise dates if isAllDay
        const due = (
            isAllDay ? getAllDayStartEnd(allDayDate) : [d?.due[0], d?.due[1]]
        ) as [string, string];

        const isEdit = d.id;

        const calendarAction = isEdit ? updateEvent : createEvent;

        await calendarAction({
            userId: d.reporterId,
            body: KanbanTaskToCalendarEvent({ ...d, due }),
        });
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                open
                submit
                onSubmit={methods.handleSubmit(handleSubmit)}
                // ...
                sx={DialogSx}
                DialogTitleComponent={StyledDialogTitle}
                DialogContentComponent={StyledDialogContent}
                DialogActionsComponent={StyledDialogActions}
                // ...
                title={<TaskLabel name={task?.name} taskId={task?.id} />}
                content={
                    <Content
                        columnId={columnId}
                        DatePicker={
                            <EventDates
                                allDay={isAllDay}
                                onAllDayChange={handleAllDay}
                                allDayDate={allDayDate}
                                onAllDayDateChange={setAllDayDate}
                                // ...
                                startDateKey="due.0"
                                endDateKey="due.1"
                            />
                        }
                    />
                }
                actions={<Actions dirty={isDirty} onClose={onClose} />}
            />
        </FormProvider>
    );
};

export default Details;
