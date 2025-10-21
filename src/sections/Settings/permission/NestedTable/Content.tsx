import { Checkbox, TableHead } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "@/sections/Settings/permission/Context";
import { IActions, IRoles } from "@/types/roles";
import {
    ActionsHeadCells,
    ActionsHeadCellsLabels,
    StateTypes,
    actions,
    subcategories1,
    subcategories2,
    subcategories3,
    subcategories4,
} from "@/constants/security";
import { resolveCategory } from "@/sections/Settings/permission/utils";
import JSONParseSafe from "@/utils/JSONParseSafe";

interface ContentProps {
    row: string;
    state: StateTypes;
}

const Content: FC<ContentProps> = ({ row, state }) => {
    const { t } = useTranslation();

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

        const updatedData = JSONParseSafe<IRoles[]>(
            JSON.stringify(data?.permissionResponses)
        );

        if (!updatedData) return;

        updatedData[rowIndex].actions[action as unknown as keyof IActions] =
            !data?.permissionResponses[rowIndex].actions[
                action as unknown as keyof IActions
            ];
        setIsDirty(true);
        setData({ ...data, permissionResponses: updatedData });
    };

    const handleSubCategoryCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        category: string
    ) => {
        const newData = JSONParseSafe<IRoles[]>(
            JSON.stringify(data?.permissionResponses)
        );
        if (!newData) return;

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
                    data?.permissionResponses[rowIndex]?.actions[
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

            return !!data?.permissionResponses[rowIndex]?.actions[
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
        const newData = JSONParseSafe<IRoles[]>(
            JSON.stringify(data?.permissionResponses)
        );
        if (!newData) return;

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

    return (
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
                        <TableCell sx={{ width: "20%" }} align="left">
                            {t("Type")}
                        </TableCell>
                        {actions.map((action) => (
                            <TableCell align="center" key={action}>
                                <Box display={"flex"} alignItems={"center"}>
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
                                            marginLeft: "-6px",
                                            transform: "scale(0.8)",
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
                        nestedCategories.map((subCategory) => (
                            <TableRow
                                sx={{
                                    "& > *": {
                                        borderBottom: "unset",
                                    },
                                    width: "100%",
                                }}
                                key={state + subCategory}
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
                                {actions.map((action, index) => (
                                    <TableCell
                                        colSpan={1}
                                        align="center"
                                        key={state + subCategory + action}
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
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Content;
