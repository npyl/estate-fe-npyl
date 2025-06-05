import useDialog from "@/hooks/useDialog";
import {
    ComponentType,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";

// ------------------------------------------------------------------------

interface BaseClickerProps {
    onClick: VoidFunction;
}

interface BaseComponentProps {
    onClose: VoidFunction;
}

// ------------------------------------------------------------------------

interface OpenerRef {
    open: VoidFunction;
}

interface OpenerProps<
    ClickerProps extends BaseClickerProps = BaseClickerProps,
    CP extends BaseComponentProps = BaseComponentProps,
> {
    Clicker: ComponentType<ClickerProps>;

    Component: ComponentType<CP>;
    ComponentProps?: Omit<CP, "onClose">;

    onClick: VoidFunction;
}

const Opener = <
    ClickerProps extends BaseClickerProps = BaseClickerProps,
    CP extends BaseComponentProps = BaseComponentProps,
>(
    {
        Clicker,
        Component,
        ComponentProps,
        onClick,
    }: OpenerProps<ClickerProps, CP>,
    ref: React.Ref<OpenerRef>
) => {
    const [isOpen, open, close] = useDialog();

    useImperativeHandle(ref, () => ({ open }), []);

    const clickerProps = { onClick } as ClickerProps;
    const componentProps = { onClose: close, ...ComponentProps } as CP;

    return (
        <>
            <Clicker {...clickerProps} />
            {isOpen ? <Component {...componentProps} /> : null}
        </>
    );
};

const OpenerWithRef = forwardRef(Opener) as <
    ClickerProps extends BaseClickerProps = BaseClickerProps,
    CP extends BaseComponentProps = BaseComponentProps,
>(
    props: OpenerProps<ClickerProps, CP> & { ref?: React.Ref<OpenerRef> }
) => ReturnType<typeof Opener>;

// ------------------------------------------------------------------------

const useOpener = () => {
    const openerRef = useRef<OpenerRef>(null);
    const onClick = useCallback(() => openerRef.current?.open(), []);
    return [openerRef, onClick] as const;
};

// ------------------------------------------------------------------------

export { useOpener };
export type { OpenerRef };
export default OpenerWithRef;
