import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import OrganizationAutocomplete, {
    OrganizationAutocompleteProps,
} from "./Organization";

interface RHFOrganizationAutocompleteProps
    extends Omit<
        OrganizationAutocompleteProps,
        "value" | "renderInput" | "onChange"
    > {
    name: string;
    label?: string;
}

const RHFOrganization: FC<RHFOrganizationAutocompleteProps> = ({
    name,
    label,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { ref, value, onChange, ...field },
                fieldState: { error },
            }) => (
                <OrganizationAutocomplete
                    ref={ref as any}
                    fullWidth
                    label={label}
                    {...field}
                    {...props}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export type { RHFOrganizationAutocompleteProps };
export default RHFOrganization;
