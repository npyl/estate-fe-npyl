import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC } from "react";

import NestedTable from "./NestedTable";
import { ParentCategoriesTypes, categories } from "./constants";

interface SecurityPageProps {
    user: string;
}

const SecurityPage: FC<SecurityPageProps> = () => {
    return (
        <Box
            sx={{
                overflowX: "auto",
                width: "100%",
                textAlign: "center",
                marginBottom: 2,
                paddingTop: 2,
            }}
        >
            <TableContainer
                component={Paper}
                sx={{ overflowX: "auto", width: "100%" }}
            >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={11} align="left">
                                <Typography variant={"h6"}>Sale</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => {
                            return (
                                <NestedTable
                                    parentCategory={ParentCategoriesTypes.SALE}
                                    key={category}
                                    row={category}
                                />
                            );
                        })}
                    </TableBody>
                </Table>

                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={11} align="left">
                                <Typography variant={"h6"}>Rent</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((s) => {
                            return (
                                <NestedTable
                                    parentCategory={ParentCategoriesTypes.RENT}
                                    key={s}
                                    row={s}
                                />
                            );
                        })}
                    </TableBody>
                </Table>

                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={11}>
                                <Typography variant={"h6"}>
                                    Sold/Rented
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((s) => {
                            return (
                                <NestedTable
                                    parentCategory={
                                        ParentCategoriesTypes.SOLD_RENTED
                                    }
                                    key={s}
                                    row={s}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SecurityPage;
