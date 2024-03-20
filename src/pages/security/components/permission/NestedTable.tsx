import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox, Stack, TableHead } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "src/contexts/security";
import { IActions, IRoles } from "src/interfaces/roles";
import {
    ActionsHeadCells,
    ActionsHeadCellsLabels,
    StateTypes,
    actions,
    subcategories1,
    subcategories2,
    subcategories3,
    subcategories4,
} from "./constants";
import { resolveCategory } from "./utils";

type Props = {
    row: string;

    state: StateTypes;
};

const NestedTable = ({ row, state }: Props) => {
    const [open, setOpen] = useState(false);
    const { data, setData, setIsDirty } = useSecurityContext();

    const nestedCategories = useMemo(
        () =>
            resolveCategory(
                row,
                subcategories1,
                subcategories2,
                subcategories3,
                subcategories4
            ) || [],
        [row, subcategories1, subcategories2, subcategories3, subcategories4]
    );

    const handleChildCheckboxChange = (
        category: string,
        columnIndex: number
    ) => {
        const rowIndex = data?.permissionResponses.findIndex(
            (e) => e.category === category && e.state === state
        );
        const action = actions[columnIndex];
        const updatedData: IRoles[] = JSON.parse(
            JSON.stringify(data?.permissionResponses)
        );

        updatedData[rowIndex as number].actions[
            action as unknown as keyof IActions
        ] =
            !data?.permissionResponses[rowIndex as number].actions[
                action as unknown as keyof IActions
            ];
        setIsDirty(true);
        setData({ ...data, permissionResponses: updatedData });
    };

    const handleStateCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        row: string
    ) => {
        const newData = JSON.parse(JSON.stringify(data?.permissionResponses));
        for (const key in data?.permissionResponses) {
            if (
                newData[key].parentCategory === row &&
                newData[key].state === state
            ) {
                for (const actionKey in newData[key].actions) {
                    newData[key].actions[actionKey] = e.target.checked;
                }
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

    const handleSubCategoryCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        category: string
    ) => {
        const newData: IRoles[] = JSON.parse(
            JSON.stringify(data?.permissionResponses)
        );
        const rowIndex = data?.permissionResponses.findIndex(
            (e) => e.category === category && e.state === state
        );
        for (const action of actions) {
            newData[rowIndex].actions[action as keyof IActions] =
                e.target.checked;
        }
        setIsDirty(true);
        setData({ ...data, permissionResponses: newData });
    };

    const isSubCategoryCheckboxChecked = useCallback(
        (category: string) => {
            const rowIndex = data?.permissionResponses.findIndex(
                (e) => e.category === category && e.state === state
            );

            return actions.every(
                (action) =>
                    data?.permissionResponses[rowIndex as number]?.actions[
                        action as unknown as keyof IActions
                    ]
            );
        },
        [data?.permissionResponses]
    );
    const isActionChecked = useCallback(
        (category: string, columnIndex: number): boolean => {
            const rowIndex = data?.permissionResponses.findIndex(
                (e) => e.category === category && e.state === state
            );
            const action = actions[columnIndex];

            return !!data?.permissionResponses[rowIndex as number]?.actions[
                action as unknown as keyof IActions
            ];
        },
        [data?.permissionResponses, state]
    );

    const handleVerticalCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        action: string,
        row: string,
        state: string
    ) => {
        const newData: IRoles[] = JSON.parse(
            JSON.stringify(data?.permissionResponses)
        );
        for (const role of newData) {
            if (row === role.parentCategory && role.state === state) {
                role.actions[action as unknown as keyof IActions] =
                    e.target.checked;
            }
        }
        setIsDirty(true);
        setData({ ...data, permissionResponses: newData });
    };

    const isVerticalCheckboxChecked = useCallback(
        (action: string, row: string, state: string) => {
            for (const role of data.permissionResponses) {
                if (
                    !role.actions[action as unknown as keyof IActions] &&
                    role.parentCategory === row &&
                    role.state === state
                ) {
                    return false;
                }
            }
            return true;
        },
        [data?.permissionResponses]
    );
    const { t } = useTranslation();
    return useMemo(
        () => (
            <React.Fragment>
                <TableRow
                    sx={{ "& > *": { borderBottom: "unset" }, width: "100%" }}
                >
                    <TableCell colSpan={11}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </IconButton>
                            <Typography variant={"h6"}>{t(row)}</Typography>
                            <Checkbox
                                onChange={(e) =>
                                    handleStateCheckboxChange(e, row)
                                }
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
                            <Box paddingX={2}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                "& > *": {
                                                    borderBottom: "unset",
                                                },
                                                width: "100%",
                                            }}
                                        >
                                            <TableCell
                                                sx={{ width: "20%" }}
                                                align="left"
                                            >
                                                {t("Type")}
                                            </TableCell>
                                            {actions.map((action) => (
                                                <TableCell
                                                    align="center"
                                                    key={action}
                                                >
                                                    <Box
                                                        display={"flex"}
                                                        alignItems={"center"}
                                                    >
                                                        {t(
                                                            ActionsHeadCellsLabels[
                                                                ActionsHeadCells[
                                                                    action as keyof typeof ActionsHeadCells
                                                                ] as keyof typeof ActionsHeadCellsLabels
                                                            ]
                                                        )}
                                                        <Checkbox
                                                            disableFocusRipple
                                                            disableRipple
                                                            checked={isVerticalCheckboxChecked(
                                                                action,
                                                                row,
                                                                state
                                                            )}
                                                            onChange={(e) =>
                                                                handleVerticalCheckboxChange(
                                                                    e,
                                                                    action,
                                                                    row,
                                                                    state
                                                                )
                                                            }
                                                            sx={{
                                                                marginLeft:
                                                                    "-6px",
                                                                transform:
                                                                    "scale(0.8)",
                                                            }}
                                                        />
                                                    </Box>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {nestedCategories &&
                                            nestedCategories.length > 0 &&
                                            nestedCategories.map(
                                                (subCategory) => (
                                                    <TableRow
                                                        sx={{
                                                            "& > *": {
                                                                borderBottom:
                                                                    "unset",
                                                            },
                                                            width: "100%",
                                                        }}
                                                        key={
                                                            state + subCategory
                                                        }
                                                    >
                                                        <TableCell colSpan={1}>
                                                            {t(subCategory)}
                                                            <Checkbox
                                                                size="small"
                                                                onChange={(e) =>
                                                                    handleSubCategoryCheckboxChange(
                                                                        e,
                                                                        subCategory
                                                                    )
                                                                }
                                                                checked={isSubCategoryCheckboxChecked(
                                                                    subCategory
                                                                )}
                                                            />
                                                        </TableCell>
                                                        {actions.map(
                                                            (action, index) => (
                                                                <TableCell
                                                                    colSpan={1}
                                                                    align="center"
                                                                    key={
                                                                        state +
                                                                        subCategory +
                                                                        action
                                                                    }
                                                                >
                                                                    <Checkbox
                                                                        onChange={() => {
                                                                            handleChildCheckboxChange(
                                                                                subCategory,
                                                                                index
                                                                            );
                                                                        }}
                                                                        checked={isActionChecked(
                                                                            subCategory,
                                                                            index
                                                                        )}
                                                                    />
                                                                </TableCell>
                                                            )
                                                        )}
                                                    </TableRow>
                                                )
                                            )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        ),
        [!!open, data?.permissionResponses]
    );
};

export default memo(NestedTable);
