import { Button, Paper, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        // NOTE: when a customer is first created, its demands array is empty; create one
        if (!leaser && !buyer) return;
        if (demands.length === 0) dispatch(addDemand({}));
    }, [leaser, buyer, demands.length]);

    // show DemandSection only if leaser or buyer
    if (!leaser && !buyer) return null;

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
                        <Tab label={`Demand ${i + 1}`} key={i} />
                    ))}
                </Tabs>
            </Box>

            <DemandForm index={index} />
        </Paper>
    );
};
export default DemandSection;
