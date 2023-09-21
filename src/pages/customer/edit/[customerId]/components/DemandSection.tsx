import { Button, Paper, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DemandForm from "./DemandForm";
import {
    addDemand,
    selectBuyer,
    selectDemands,
    selectLeaser,
} from "src/slices/customer";

const DemandSection: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);

    const demands = useSelector(selectDemands);
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) =>
        setIndex(newValue);

    const handleCreateTab = () => {
        dispatch(addDemand({}));
    };

    if (leaser == true || buyer == true)
        return (
            <Paper
                elevation={10}
                sx={{
                    overflow: "auto",
                    padding: 0.5,
                }}
            >
                <Button onClick={handleCreateTab}>create</Button>

                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={index} onChange={handleTabChange}>
                        {demands.map((d, i) => (
                            <Tab label={`Demand ${i + 1}`} key={index} />
                        ))}
                    </Tabs>
                </Box>

                <DemandForm index={index} />
            </Paper>
        );
    else return null;
};
export default DemandSection;
