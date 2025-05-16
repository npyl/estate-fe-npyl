import { useFormContext } from "react-hook-form";
import ClearButton from "./ClearButton";
import SubmitButton from "./SubmitButton";
import { FC } from "react";

interface ActionsProps {
    DEFAULT_VALUES: any;
}

const Actions: FC<ActionsProps> = ({ DEFAULT_VALUES }) => {
    const { formState } = useFormContext();
    const isDirty = formState.isDirty;

    if (!isDirty) return null;

    return (
        <>
            <ClearButton DEFAULT_VALUES={DEFAULT_VALUES} />
            <SubmitButton />
        </>
    );
};

export default Actions;
