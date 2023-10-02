import {
    Icon,
    IconButton,
    Paper,
    Tab,
    Tabs,
    Button,
    Typography,
    Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DemandForm from "./DemandForm";
import {
    addDemand,
    removeDemands,
    selectBuyer,
    selectDemands,
    selectLeaser,
} from "src/slices/customer";
import { CloseIcon } from "yet-another-react-lightbox/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const DemandSection: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);

    const demands = useSelector(selectDemands);
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue === demands.length) {
            // check if "Create" tab is clicked
            handleCreateTab();
        } else {
            setIndex(newValue);
        }
    };
    const handleCreateTab = () => {
        dispatch(addDemand({}));
    };
    const handleDeleteTab = (i: number, event: React.MouseEvent) => {
        event.stopPropagation(); // This will prevent the tab change event
        dispatch(removeDemands(i)); // Assuming this removes the demand at a given index
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6" flex={1} mt={1.5} ml={3}>
                    {t("Demand Forms")}
                </Typography>

                <Button onClick={handleCreateTab}>Create</Button>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={index} onChange={handleTabChange} sx={{ ml: 1 }}>
                    {demands.map((d, i) => (
                        <Tab
                            label={
                                <Box display="flex" alignItems="center">
                                    {`Demand ${i + 1}`}
                                    <IconButton
                                        size="small"
                                        onClick={(e) => handleDeleteTab(i, e)}
                                    >
                                        <CloseIcon
                                            style={{ transform: "scale(0.5)" }}
                                        />
                                    </IconButton>
                                </Box>
                            }
                            key={i}
                            style={{ marginRight: "-20px" }}
                        />
                    ))}
                    <Tab
                        label={
                            <Box display="flex" alignItems="center">
                                <AddCircleOutlineOutlinedIcon
                                    sx={{ fontSize: "large" }}
                                />
                            </Box>
                        }
                    />
                </Tabs>
            </Box>

            <DemandForm index={index} />
        </Paper>
    );
};
export default DemandSection;
