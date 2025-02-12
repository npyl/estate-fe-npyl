import { FC, forwardRef, useCallback, useImperativeHandle } from "react";
import { PropsWithChildren } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { IDemandPOST } from "@/types/demand";

interface FormRef {
    getValues: () => void;
}

interface IDemandForms {
    demands: IDemandPOST[];
}

/**
 * This is a subform (under customer's form) used to contain demands changes
 */
const Form = forwardRef<FormRef, PropsWithChildren>(({ children }, ref) => {
    const demands = useWatch({ name: "demands" });

    const methods = useForm<IDemandForms>({
        defaultValues: {
            demands,
        },
    });

    useImperativeHandle(
        ref,
        () => ({
            getValues: () => methods.getValues(),
        }),
        [methods.getValues]
    );

    return (
        <form>
            <FormProvider {...methods}>{children}</FormProvider>
        </form>
    );
});

export type { FormRef, IDemandForms };
export default Form;
