import { Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { t } from "i18next";
import React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DemandForm from "./components/DemandForm";
import { addDemand, selectDemands } from "src/slices/customer";

const DemandSection: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [index, setIndex] = React.useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setIndex(newValue);
    };
    const demands = useSelector(selectDemands);
    const handleCreateTab = () => {
        dispatch(addDemand({}));
    };

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0.5,
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={index} onChange={handleTabChange}>
                    {demands.map((d, i) => (
                        <Tab label={`Demand ${i + 1}`} key={index} />
                    ))}
                </Tabs>
            </Box>
            <Button onClick={handleCreateTab}>create</Button>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">
                    {t("Demand Form")} No.{index + 1}
                </Typography>
            </Box>

            <DemandForm index={index} />
        </Paper>
    );
};
export default DemandSection;
