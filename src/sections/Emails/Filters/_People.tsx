import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, TextField, Theme } from "@mui/material";
import PeoplePicker from "../Pickers/People";
import { FC, useCallback } from "react";

const TextFieldSx: SxProps<Theme> = {
    minWidth: "200px",
    maxWidth: "fit-content",
};

interface PeopleFilterProps {
    label: string;
}

const PeopleFilter: FC<PeopleFilterProps> = ({ label }) => {
    const {
        people,
        setPeople,
        // ...
        peopleFreeSoloed,
        setPeopleFreeSoloed,
    } = useFiltersContext();

    const onFreeSoloedDelete = useCallback(
        (idx: number) =>
            setPeopleFreeSoloed((old) => old.filter((_, i) => i !== idx)),
        []
    );

    return (
        <PeoplePicker
            people={people}
            onChange={setPeople}
            peopleFreeSoloed={peopleFreeSoloed}
            onFreeSoloed={setPeopleFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            renderInput={(params) => (
                <TextField label={label} sx={TextFieldSx} {...params} />
            )}
        />
    );
};

export default PeopleFilter;
