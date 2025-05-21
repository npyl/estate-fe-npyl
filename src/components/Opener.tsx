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
    ComponentProps extends BaseComponentProps = BaseComponentProps,
> {
    Clicker: ComponentType<ClickerProps>;
    Component: ComponentType<ComponentProps>;
    onClick: VoidFunction;
}

const Opener = forwardRef<OpenerRef, OpenerProps>(
    ({ Clicker, Component, onClick }, ref) => {
        const [isOpen, open, close] = useDialog();

        useImperativeHandle(ref, () => ({ open }), []);

        return (
            <>
                <Clicker onClick={onClick} />
                {isOpen ? <Component onClose={close} /> : null}
            </>
        );
    }
);

// ------------------------------------------------------------------------

const useOpener = () => {
    const openerRef = useRef<OpenerRef>(null);
    const onClick = useCallback(() => openerRef.current?.open(), []);
    return [openerRef, onClick] as const;
};

// ------------------------------------------------------------------------

export { useOpener };
export default Opener;
