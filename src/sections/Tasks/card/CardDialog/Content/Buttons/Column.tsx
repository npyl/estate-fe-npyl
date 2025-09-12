import { useTranslation } from "react-i18next";
import { useGetBoardQuery } from "@/services/tasks";
import Select from "@/components/hook-form/Select";
import { FC, useEffect, useMemo } from "react";
import { KeyValue } from "@/types/KeyValue";
import { useFormContext, useWatch } from "react-hook-form";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { TASK } from "@/constants/tests";
import isFalsy from "@/utils/isFalsy";

/**
 * @param s
 * @returns true when s matches case-insensitively to "to-do"
 */
const isToDoIndex = (s: string) =>
    s.toLowerCase().replace(/\s+/g, "") === "todo";

interface BoardColumnOptions {
    options: KeyValue[];
    todoId: number;
}

const useBoardColumns = () => {
    const { data } = useGetBoardQuery({});
    const all = data?.columns ?? [];

    return useMemo(
        () =>
            all.reduce<BoardColumnOptions>(
                (acc, { id, name }) => {
                    acc.options.push({ key: id.toString(), value: name });

                    if (isToDoIndex(name)) acc.todoId = id;

                    return acc;
                },
                { options: [], todoId: -1 }
            ),
        [all]
    );
};

interface Props {
    id: number;
}

const ToDoAutoSelect: FC<Props> = ({ id }) => {
    const { setValue } = useFormContext<ICreateOrUpdateTaskReq>();
    useEffect(() => {
        setValue("columnId", id, { shouldDirty: true });
    }, [id]);
    return null;
};

const ColumnSelect = () => {
    const { t } = useTranslation();
    const { options, todoId } = useBoardColumns();

    const columnId = useWatch<ICreateOrUpdateTaskReq>({ name: "columnId" });
    const canAutoSelect = todoId !== -1 && isFalsy(columnId); // INFO: make sure columnId is empty before assigning a default

    return (
        <>
            {canAutoSelect ? <ToDoAutoSelect id={todoId} /> : null}
            <Select
                data-testid={TASK.COLUMN_ID}
                name="columnId"
                label={t("_Column_")}
                options={options}
            />
        </>
    );
};

export default ColumnSelect;
