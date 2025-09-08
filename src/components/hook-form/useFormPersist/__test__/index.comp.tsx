import { FC, useCallback, useState } from "react";
import useFormPersist, { PropsWithoutDefaultValues } from "..";
import { FormProvider } from "react-hook-form";

import "@/_private/JSON";

const SUBMIT_ID = "submit-button-testid";
const PAYLOAD_TESTID = "payload-testid";
const STORAGE_KEY = "storage-key";

interface Values {
    something: string;
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

    const [methods, { PersistNotice }] = useFormPersist<Values>(
        STORAGE_KEY,
        onSaveSuccess,
        formProps
    );

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
                <FormProvider {...methods}>{PersistNotice}</FormProvider>
                <button type="submit" data-testid={SUBMIT_ID} />
            </form>

            <div data-testid={PAYLOAD_TESTID}>{JSON.stringify(payload)}</div>
        </div>
    );
};

export { STORAGE_KEY, SUBMIT_ID, PAYLOAD_TESTID };
export type { Values, TesterConfig };
export default Tester;
