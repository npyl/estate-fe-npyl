import Stack from "@mui/material/Stack";
import Bar from "./Bar";
import ParamLooker from "./ParamLooker";
import { FiltersProvider } from "@/sections/Tasks/filters";
import Content from "./Content";
import { useCallback, useState } from "react";
import { TMode } from "./types";

function ViewAllTasks() {
    const [mode, setMode] = useState<TMode>("board");

    const toggleMode = useCallback(
        () => setMode((old) => (old === "board" ? "list" : "board")),
        []
    );

    return (
        <>
            <FiltersProvider>
                <Stack spacing={1}>
                    <Bar mode={mode} onToggleMode={toggleMode} />
                    <Content mode={mode} />
                </Stack>
            </FiltersProvider>

            {/* Handle search params */}
            <ParamLooker />
        </>
    );
}

export default ViewAllTasks;
