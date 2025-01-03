import { Controller, useFormContext } from "react-hook-form";
import CreateAssign from "./CreateAssign";

const RHFCreate = () => {
    const { control } = useFormContext();
    return (
        <Controller
            name="labels"
            control={control}
            render={({ field: { value } }) => <CreateAssign ids={value} />}
        />
    );
};

export default RHFCreate;
