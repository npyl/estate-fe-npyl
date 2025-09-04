import { ComponentType, FC, PropsWithChildren } from "react";

const AUTHORIZED_CONTENT_ID = "authorized-content-testid";

interface TesterProps {
    GuardComponent: ComponentType<PropsWithChildren>;
}

const Tester: FC<TesterProps> = ({ GuardComponent }) => (
    <GuardComponent>
        <div data-testid={AUTHORIZED_CONTENT_ID} />
    </GuardComponent>
);

export { AUTHORIZED_CONTENT_ID };
export default Tester;
