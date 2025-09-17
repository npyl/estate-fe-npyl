import { FC, useCallback, useState } from "react";
import useFormPersist, {
    PropsWithoutDefaultValues,
} from "@/components/hook-form/useFormPersist";
import { FormProvider } from "react-hook-form";

import "@/_private/JSON";
import RHFTextField from "@/components/hook-form/RHFTextField";

const SUBMIT_ID = "submit-button-testid";
const PAYLOAD_TESTID = "payload-testid";
const DIRTY_TESTID = "dirty-testid";
const FIELD_TESTID = "field-testid";
const PERSIST_TESTID = "persist-testid";

const DIRTY_YES = "YES";
const DIRTY_NO = "NO";

const STORAGE_KEY = "storage-key";

const DUMMY_FIELD_NAME = "something";

interface Values {
    [DUMMY_FIELD_NAME]: string;
}

/**
 * @field onSubmitRet   What the onSubmit callback (passed to methods.handleSubmit()) should return (useFormPersist requires a boolean return value)
 * @field onSaveSuccess
 */
interface TesterConfig {
    onSubmitRet?: boolean;
    onSaveSuccess?: VoidFunction;
}

interface TesterProps {
    formProps: PropsWithoutDefaultValues<Values>;
    config?: TesterConfig;
}

const Tester: FC<TesterProps> = ({ formProps, config }) => {
    const { onSubmitRet = false, onSaveSuccess = null } = config ?? {};

    const [methods, { PersistNotice, persistChanges }] = useFormPersist<Values>(
        STORAGE_KEY,
        onSaveSuccess,
        formProps
    );

    const isDirty = methods.formState.isDirty;

    const [payload, setPayload] = useState<Values>();
    const onSubmit = useCallback(
        (d: Values) => {
            setPayload(d);
            return onSubmitRet;
        },
        [onSubmitRet]
    );

    return (
        <div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormProvider {...methods}>
                    {PersistNotice}
                    <RHFTextField
                        name={DUMMY_FIELD_NAME}
                        data-testid={FIELD_TESTID}
                    />
                </FormProvider>
                <button type="submit" data-testid={SUBMIT_ID} />
            </form>

            <button data-testid={PERSIST_TESTID} onClick={persistChanges} />

            <div data-testid={DIRTY_TESTID}>
                {isDirty ? DIRTY_YES : DIRTY_NO}
            </div>

            <div data-testid={PAYLOAD_TESTID}>{JSON.stringify(payload)}</div>
        </div>
    );
};

export {
    STORAGE_KEY,
    SUBMIT_ID,
    PAYLOAD_TESTID,
    DIRTY_TESTID,
    FIELD_TESTID,
    PERSIST_TESTID,
    // ...
    DIRTY_YES,
    DIRTY_NO,
};
export type { Values, TesterConfig };
export default Tester;
