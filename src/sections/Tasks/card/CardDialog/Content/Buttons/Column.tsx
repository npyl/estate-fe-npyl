import { SelectProps } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useGetBoardQuery } from "@/services/tasks";
import { IKanbanColumn } from "@/types/tasks";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import { RHFSelect } from "@/components/hook-form";

// -----------------------------------------------------------------

const useBoardColumns = () => {
    const { data } = useGetBoardQuery({});
    const allColumns = data?.columns || [];

    // Define the priority column names in desired order
    const prioritizedNames = ["To do", "In progress", "Completed"];

    const sortedColumns = allColumns.slice().sort((columnA, columnB) => {
        const indexA = prioritizedNames.indexOf(columnA.name);
        const indexB = prioritizedNames.indexOf(columnB.name);

        const isAInPriority = indexA !== -1;
        const isBInPriority = indexB !== -1;

        if (isAInPriority && isBInPriority) {
            return indexA - indexB;
        }

        if (isAInPriority) return -1;
        if (isBInPriority) return 1;

        return 0; //keep default order
    });

    return sortedColumns;
};
const getOption = ({ id, name }: IKanbanColumn) => (
    <MenuItem key={id} value={id}>
        {name}
    </MenuItem>
);

const ColumnSelect: FC<SelectProps> = (props) => {
    const { t } = useTranslation();
    const columns = useBoardColumns();
    return (
        <FormControl>
            <InputLabel>{props.label}</InputLabel>
            <RHFSelect name="columnId" defaultValue={-1} {...props}>
                <MenuItem value={-1}>{t("Not selected")}</MenuItem>
                {columns?.map(getOption)}
            </RHFSelect>
        </FormControl>
    );
};

export default ColumnSelect;
