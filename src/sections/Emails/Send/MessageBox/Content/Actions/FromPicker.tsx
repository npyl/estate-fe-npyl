import { Controller, useFormContext } from "react-hook-form";
import UserPicker from "./UserPicker";
import { TMessageBoxValues } from "../../types";

const FromPicker = () => {
    const { control } = useFormContext<TMessageBoxValues>();
    return (
        <Controller
            name="from"
            control={control}
            render={({ field }) => <UserPicker max={2} {...field} />}
        />
    );
};

export default FromPicker;
