import { useForm, FormProvider, useWatch } from "react-hook-form";
import Select from "../../../../src/components/hook-form/Select";
import { FC, PropsWithChildren } from "react";
import { OPTIONS, SELECT_LABEL } from "./constants";

const FIELD_NAME = "categories";

const VALUE_ID = "value-id";

interface TesterProps {
    multiple?: boolean;
    isEnum?: boolean;
}

const Tester: FC<TesterProps> = ({ isEnum, multiple }) => {
    const value = useWatch({ name: FIELD_NAME });

    return (
        <>
            <Select
                name={FIELD_NAME}
                options={OPTIONS}
                label={SELECT_LABEL}
                // ...
                isEnum={isEnum}
                multiple={multiple}
            />

            <div data-testid={VALUE_ID}>{value}</div>
        </>
    );
};

// ---------------------------------------------------------------------------

interface IValues {
    categories: string[];
}

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm<IValues>({ values: { categories: [] } });
    return <FormProvider {...methods}>{children}</FormProvider>;
};

// ---------------------------------------------------------------------------

const Wrapped: FC<TesterProps> = (props) => (
    <Wrapper>
        <Tester {...props} />
    </Wrapper>
);

export { VALUE_ID };
export default Wrapped;
