import { ICustomerMini } from "@/types/customer";
import { FC, useCallback } from "react";
import { CustomerAutocompleteMultipleProps } from "@/ui/Autocompletes/CustomerMultiple";
import useValue from "./useValue";
import useOnChange from "./useOnChange";
import useFreeSoloedChange from "./useFreeSoloedChange";
import useSx from "./useSx";
import PeopleAutocomplete, { TPerson } from "@/ui/Autocompletes/People";
import { IUser } from "@/types/user";
import { useTranslation } from "react-i18next";

// ---------------------------------------------------------------------------

const useInternationalised = () => {
    const { t } = useTranslation();

    const groupBy = useCallback(
        (o: TPerson) => {
            const v = "workspaceEmail" in o ? "Managers" : "Customers";
            return t(v);
        },
        [t]
    );

    return [groupBy];
};

// ---------------------------------------------------------------------------

const customerWithEmail = ({ email }: ICustomerMini) => Boolean(email);
const managerWithEmail = ({ workspaceEmail }: IUser) => Boolean(workspaceEmail);

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

    const [groupBy] = useInternationalised();

    return (
        <PeopleAutocomplete
            freeSolo
            freeSoloed={peopleFreeSoloed}
            onFreeSoloed={onFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            value={value}
            onChange={onChange}
            customerOptionFilter={customerWithEmail}
            managerOptionFilter={managerWithEmail}
            groupBy={groupBy}
            sx={sx}
            {...props}
        />
    );
};

export default PeoplePicker;
