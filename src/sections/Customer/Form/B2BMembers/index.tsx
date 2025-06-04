import { IconButton, IconButtonProps, Stack, Typography } from "@mui/material";
import { AddCircle, Cancel } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useFieldArray, useWatch } from "react-hook-form";
import Panel from "@/components/Panel";
import { FC, useCallback, useRef } from "react";
import { ICustomerYup } from "../types";
import Opener, { OpenerRef } from "@/components/Opener";
import { Drawer, DrawerProps } from "@mui/material";
import { makeStickyBottom } from "@/ui/FormBottomBar";

const PaperProps: DrawerProps["PaperProps"] = {
    sx: {
        width: {
            xs: "100vw",
            lg: "30vw",
        },

        ...makeStickyBottom,
    },
};

interface ModalProps {
    onClose: () => void;
}

const MemberDrawer: React.FC<ModalProps> = ({ onClose }) => (
    <Drawer
        open
        anchor="right"
        PaperProps={PaperProps}
        onClose={onClose}
    ></Drawer>
);

// --------------------------------------------------------------------------

const nameKey = "b2bMembers";

interface MemberProps {
    index: number;
    onRemove: (i: number) => void;
}

const Member = ({ index, onRemove: _onRemove }: MemberProps) => {
    const { t } = useTranslation();

    const onRemove = useCallback(() => _onRemove(index), [index]);

    const firstName =
        useWatch({ name: `${nameKey}[${index}].firstName` }) || "";
    const lastName = useWatch({ name: `${nameKey}[${index}].lastName` }) || "";
    const fullname = `${firstName} ${lastName}`;

    return (
        <Stack direction="row" spacing={1.5}>
            <Typography>{fullname}</Typography>
            <IconButton onClick={onRemove}>
                <Cancel />
            </IconButton>
        </Stack>
    );
};

const getMember =
    (onRemove: (i: number) => void) => (m: Record<"id", string>, i: number) => (
        <Member key={m.id} index={i} onRemove={onRemove} />
    );

// --------------------------------------------------------------------------

type ClickerProps = Omit<IconButtonProps, "onClick"> & {
    onClick: VoidFunction;
};

const Clicker: FC<ClickerProps> = (props) => (
    <IconButton {...props}>
        <AddCircle />
    </IconButton>
);

const BalconiesSection = () => {
    const { t } = useTranslation();

    const { fields, append, remove } = useFieldArray<ICustomerYup>({
        name: nameKey,
    });

    const openerRef = useRef<OpenerRef>(null);
    const onOpen = useCallback(() => openerRef.current?.open(), []);

    return (
        <Panel
            label={t("Members")}
            endNode={
                <Opener
                    ref={openerRef}
                    Clicker={Clicker}
                    Component={MemberDrawer}
                    ComponentProps={{
                        onAdd: append,
                    }}
                    onClick={onOpen}
                />
            }
        >
            {fields?.map(getMember(remove))}
        </Panel>
    );
};
export default BalconiesSection;
