import Dialog from "@/components/Dialog";
import {
    IKanbanCard,
    IKanbanCardPOST,
    IKanbanCardRes2Req,
    KanbanTaskToCalendarEvent,
} from "@/types/tasks";
import { FC, useState } from "react";
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
import { getAllDayStartEnd } from "@/components/Calendar/util";
import {
    useCreateEventMutation,
    useUpdateEventMutation,
} from "@/services/calendar";
import { useAuth } from "@/hooks/use-auth";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import useEventDates from "@/sections/Calendar/Event/form/EventDates/useEventDates";

interface DetailsProps {
    task?: IKanbanCard;
    columnId?: number;
    onClose: VoidFunction;
}

const Details: FC<DetailsProps> = ({ task, columnId, onClose }) => {
    const { user } = useAuth();

    const {
        _isAllDay,
        _allDayDate,
        // ...
        isAllDay,
        allDayDate,
        // ...
        onAllDayChange,
        onAllDayDateChange,
    } = useEventDates({
        startDate: task?.due[0]!,
        endDate: task?.due[1]!,
    });

    const methods = useForm<IKanbanCardPOST>({
        values: {
            ...IKanbanCardRes2Req(task),
            columnId: columnId || -1,
        },
        resolver: yupResolver(schema),
    });

    const isDirty =
        _isAllDay !== isAllDay ||
        _allDayDate !== allDayDate ||
        methods.formState.isDirty;

    const [withCalendarEvent, setWithCalendarEvent] = useState(false);

    const [createEvent] = useCreateEventMutation();
    const [updateEvent] = useUpdateEventMutation();

    const handleSubmit = async (d: IKanbanCardPOST) => {
        let due: [string, string] | undefined = undefined;

        if (withCalendarEvent && d?.due) {
            // INFO: normalise dates if isAllDay
            due = (
                isAllDay ? getAllDayStartEnd(allDayDate) : [d.due[0], d.due[1]]
            ) as [string, string];
        }

        const isEdit = d.id;

        const calendarAction = isEdit ? updateEvent : createEvent;

        await calendarAction({
            userId: user?.id!,
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
                                allDayDate={allDayDate}
                                // ...
                                onAllDayChange={onAllDayChange}
                                onAllDayDateChange={onAllDayDateChange}
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
