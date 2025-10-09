import { ComponentType } from "react";
import PanelWrapper from "./Wrapper";

type AnySection<Props> = ComponentType<Props>;

const WithPanel = <Props,>(Section: AnySection<Props>) => {
    const WrappedComponent = ({
        noPanel,
        ...props
    }: Props & { noPanel?: boolean }) => (
        <PanelWrapper noPanel={noPanel}>
            <Section {...(props as any)} />
        </PanelWrapper>
    );

    WrappedComponent.displayName = `WithPanel(Section)`;

    return WrappedComponent;
};

export default WithPanel;
