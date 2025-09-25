import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import MonthSelect from "@/ui/Pickers/MonthSelect";
import { Props } from "./types";
import YearSelect from "./YearSelect";

const MobileControls: FC<Props> = ({ date, onDateChange }) => (
    <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
        my={1}
    >
        <MonthSelect date={date} onDateChange={onDateChange} />
        <YearSelect date={date} onDateChange={onDateChange} />
        <IsAuthenticatedIndicator />
    </Stack>
);

export default MobileControls;
