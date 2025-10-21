import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, Stack } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "@/sections/Settings/permission/Context";
import { StateTypes, actions } from "@/constants/security";
import useToggle from "@/hooks/useToggle";
import Content from "./Content";
import JSONParseSafe from "@/utils/JSONParseSafe";
import { IRoles } from "@/types/roles";

type Props = {
    row: string;
    state: StateTypes;
};

const NestedTable = ({ row, state }: Props) => {
    const [open, toggleOpen] = useToggle();
    const { data, setData, setIsDirty } = useSecurityContext();

    const handleStateCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        row: string
    ) => {
        const str = JSON.stringify(data?.permissionResponses);
        const newData = JSONParseSafe<IRoles[]>(str);
        if (!newData) return;

        for (const key in data?.permissionResponses) {
            if (
                newData[key].parentCategory === row &&
                newData[key].state === state
            ) {
                // for (const actionKey in newData[key].actions) {
                //     newData[key].actions[actionKey] = e.target.checked;
                // }
            }
        }
        setIsDirty(true);
        setData({ ...data, permissionResponses: newData });
    };

    const isStateCheckboxChecked = useCallback(
        (row: string) => {
            if (data?.permissionResponses.length === 0) {
                return false;
            }
            for (const category of Object.values(data?.permissionResponses)) {
                const actions = category?.actions;
                if (
                    category.state === state &&
                    category.parentCategory === row &&
                    actions &&
                    Object.values(actions).some((value) => value === false)
                ) {
                    return false;
                }
            }
            return true;
        },
        [data, row]
    );

    const { t } = useTranslation();

    return (
        <>
            <TableRow
                sx={{ "& > *": { borderBottom: "unset" }, width: "100%" }}
            >
                <TableCell colSpan={11}>
                    <Stack direction={"row"} alignItems={"center"}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={toggleOpen}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                        <Typography variant={"h6"}>{t(row)}</Typography>
                        <Checkbox
                            onChange={(e) => handleStateCheckboxChange(e, row)}
                            checked={isStateCheckboxChecked(row)}
                        />
                    </Stack>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell
                    sx={{ borderBottom: open ? "unset" : "" }}
                    style={{ paddingBottom: 0, paddingTop: 0, padding: 0 }}
                    colSpan={actions.length + 1}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Content row={row} state={state} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default NestedTable;
