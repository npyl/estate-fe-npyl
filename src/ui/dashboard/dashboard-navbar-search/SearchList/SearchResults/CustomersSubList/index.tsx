import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { FC, useMemo } from "react";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { useTranslation } from "react-i18next";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "../../../types";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

interface CustomersSubListProps {
    searchCategory: SearchCategory;
    searchString: string;
    onItemClick: (value: string) => void;
}

const CustomersSubList: FC<CustomersSubListProps> = ({
    searchCategory,
    searchString,
    onItemClick,
}) => {
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );

    const b2b = searchCategory === "b2b" || searchCategory === "all";

    // non-b2b Customers
    const { data: data0 } = useSearchCustomerQuery(
        { searchString, b2b: false },
        {
            skip: searchString === "" || searchCategory === "b2b",
        }
    );
    // b2b-only Customers
    const { data: b2bOnly } = useSearchCustomerQuery(
        { searchString, b2b: true },
        {
            skip: searchString === "" || !b2b,
        }
    );

    const all = useMemo(
        () => [...(data0 ?? []), ...(b2bOnly ?? [])],
        [data0, b2bOnly]
    );

    return isMobile ? (
        <>
            <Typography
                variant="h6"
                display="flex"
                justifyContent="center"
                gap={1}
                alignItems="center"
                sx={{
                    borderBottom: "1px solid lightgrey",
                }}
            >
                <PersonOutlineOutlinedIcon
                    sx={{
                        width: "22px",
                        height: "22px",
                    }}
                />
                {t("Customers")}
            </Typography>
            <Box width="100%" sx={{ overflowX: "hidden" }}>
                {all.map((option) => (
                    <CustomerSearchItem
                        key={option.id}
                        option={option}
                        searchText={searchString}
                        onClick={onItemClick}
                    />
                ))}
            </Box>
        </>
    ) : (
        <>
            <Typography
                variant="h6"
                display="flex"
                justifyContent="center"
                gap={1}
                alignItems="center"
                sx={{
                    borderBottom: "1px solid lightgrey",
                }}
            >
                <PersonOutlineOutlinedIcon
                    sx={{
                        width: "22px",
                        height: "22px",
                    }}
                />
                {t("Customers")}
            </Typography>
            <Box width="100%" sx={{ overflowX: "hidden" }}>
                {all.map((option) => (
                    <CustomerSearchItem
                        key={option.id}
                        option={option}
                        searchText={searchString}
                        onClick={onItemClick}
                    />
                ))}
            </Box>
        </>
    );
};

export default CustomersSubList;
