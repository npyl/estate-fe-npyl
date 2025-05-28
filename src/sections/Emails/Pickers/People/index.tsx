import { ICustomerMini } from "@/types/customer";
import { FC } from "react";
import { CustomerAutocompleteMultipleProps } from "@/ui/Autocompletes/CustomerMultiple";
import useValue from "./useValue";
import useOnChange from "./useOnChange";
import useFreeSoloedChange from "./useFreeSoloedChange";
import useSx from "./useSx";
import PeopleAutocomplete from "@/ui/Autocompletes/PeopleMultiple";
import { IUser } from "@/types/user";

// ---------------------------------------------------------------------------

const onlyWithEmail = ({ email }: ICustomerMini | IUser) => Boolean(email);

interface PeoplePickerProps {
    people: string[];
    onChange: (v: string[]) => void;

    peopleFreeSoloed: string[];
    onFreeSoloed: (v: string[]) => void;
    onFreeSoloedDelete: (idx: number) => void;

    renderInput: CustomerAutocompleteMultipleProps["renderInput"];
}

const PeoplePicker: FC<PeoplePickerProps> = ({
    people,
    onChange: _onChange,
    // ...
    peopleFreeSoloed,
    onFreeSoloed: _onFreeSoloed,
    onFreeSoloedDelete,
    // ...
    ...props
}) => {
    const value = useValue(people);
    const onChange = useOnChange(_onChange);
    const onFreeSoloed = useFreeSoloedChange(peopleFreeSoloed, _onFreeSoloed);
    const sx = useSx();

    return (
        <PeopleAutocomplete
            freeSolo
            freeSoloed={peopleFreeSoloed}
            onFreeSoloed={onFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            value={value}
            onChange={onChange}
            customerOptionFilter={onlyWithEmail}
            managerOptionFilter={onlyWithEmail}
            sx={sx}
            {...props}
        />
    );
};

export default PeoplePicker;
