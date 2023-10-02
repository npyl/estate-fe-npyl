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
import { IActions, IRoles } from "src/interfaces/roles";
import { selectData, setData } from "src/slices/security";
import { useDispatch, useSelector } from "src/store";
import {
    ActionsHeadCells,
    ActionsHeadCellsLabels,
    ParentCategoriesTypes,
    actions,
    subcategories1,
    subcategories2,
    subcategories3,
    subcategories4,
} from "./constants";
import { resolveCategory } from "./utils";

type Props = {
    row: string;

    parentCategory: ParentCategoriesTypes;
};

const NestedTable = ({ row, parentCategory }: Props) => {
    const [open, setOpen] = useState(false);
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const category = resolveCategory(
        row,
        subcategories1,
        subcategories2,
        subcategories3,
        subcategories4
    );

    const handleChildCheckboxChange = (
        subCategory: string,
        columnIndex: number
    ) => {
        const rowIndex = data.findIndex(
            (e) =>
                e.subcategory === subCategory &&
                e.parentCategory === parentCategory
        );
        const action = actions[columnIndex];

        const updatedData: IRoles[] = JSON.parse(JSON.stringify(data));

        updatedData[rowIndex as number].actions[
            action as unknown as keyof IActions
        ] =
            !data[rowIndex as number].actions[
                action as unknown as keyof IActions
            ];
        dispatch(setData(updatedData));
    };

    const handleParentCategoryCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        row: string
    ) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const key in data) {
            if (
                newData[key].category === row &&
                newData[key].parentCategory === parentCategory
            ) {
                for (const actionKey in newData[key].actions) {
                    newData[key].actions[actionKey] = e.target.checked;
                }
            }
        }
        dispatch(setData(newData));
    };

    const isParentCategoryCheckboxChecked = useCallback(
        (row: string) => {
            for (const category of Object.values(data)) {
                const actions = category?.actions;
                if (
                    category.parentCategory === parentCategory &&
                    category.category === row &&
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
        subCategory: string
    ) => {
        const newData: IRoles[] = JSON.parse(JSON.stringify(data));
        const rowIndex = data.findIndex(
            (e) =>
                e.subcategory === subCategory &&
                e.parentCategory === parentCategory
        );
        for (const action of actions) {
            newData[rowIndex].actions[action as keyof IActions] =
                e.target.checked;
        }
        dispatch(setData(newData));
    };

    const isSubCategoryCheckboxChecked = useCallback(
        (subCategory: string) => {
            const rowIndex = data.findIndex(
                (e) =>
                    e.subcategory === subCategory &&
                    e.parentCategory === parentCategory
            );

            return actions.every(
                (action) =>
                    data[rowIndex as number]?.actions[
                        action as unknown as keyof IActions
                    ]
            );
        },
        [data]
    );
    const isActionChecked = useCallback(
        (subCategory: string, columnIndex: number): boolean => {
            const rowIndex = data.findIndex(
                (e) =>
                    e.subcategory === subCategory &&
                    e.parentCategory === parentCategory
            );
            const action = actions[columnIndex];

            return !!data[rowIndex as number]?.actions[
                action as unknown as keyof IActions
            ];
        },
        [data, parentCategory]
    );
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
                            <Typography variant={"h6"}>{row}</Typography>
                            <Checkbox
                                onChange={(e) =>
                                    handleParentCategoryCheckboxChange(e, row)
                                }
                                checked={isParentCategoryCheckboxChecked(row)}
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
                                                Type
                                            </TableCell>
                                            {actions.map((action) => (
                                                <TableCell
                                                    align="center"
                                                    key={action}
                                                >
                                                    {
                                                        ActionsHeadCellsLabels[
                                                            ActionsHeadCells[
                                                                action as keyof typeof ActionsHeadCells
                                                            ] as keyof typeof ActionsHeadCellsLabels
                                                        ]
                                                    }
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {category &&
                                            category.length > 0 &&
                                            category.map((subCategory) => (
                                                <TableRow
                                                    sx={{
                                                        "& > *": {
                                                            borderBottom:
                                                                "unset",
                                                        },
                                                        width: "100%",
                                                    }}
                                                    key={
                                                        parentCategory +
                                                        subCategory
                                                    }
                                                >
                                                    <TableCell colSpan={1}>
                                                        {subCategory}
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
                                                                    parentCategory +
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
                                            ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        ),
        [!!open, data]
    );
};

export default memo(NestedTable);
