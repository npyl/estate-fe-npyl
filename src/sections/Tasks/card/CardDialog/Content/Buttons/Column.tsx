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
    return data?.columns;
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
            <RHFSelect name="columnId" {...props}>
                <MenuItem value={-1}>{t("Not selected")}</MenuItem>
                {columns?.map(getOption)}
            </RHFSelect>
        </FormControl>
    );
};

export default ColumnSelect;
