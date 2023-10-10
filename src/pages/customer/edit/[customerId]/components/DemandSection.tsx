import {
    IconButton,
    Paper,
    Tab,
    Tabs,
    Typography,
    Box,
    Stack,
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
import { deletePropertyCode } from "src/slices/customer/misc";

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
    const handleCreateTab = () => dispatch(addDemand({}));
    const handleDeleteTab = (i: number, event: React.MouseEvent) => {
        if (i === 0 && demands.length === 1) return;

        setIndex(i - 1);
        dispatch(removeDemands(i)); // remove demand at index
        dispatch(deletePropertyCode(i));
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
            </Box>

            <Stack
                sx={{ borderBottom: 1, borderColor: "divider" }}
                direction={"row"}
            >
                <Tabs
                    value={index}
                    onChange={handleTabChange}
                    sx={{ ml: 1, flex: 1 }}
                >
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
                </Tabs>
                <AddCircleOutlineOutlinedIcon
                    fontSize="medium"
                    onClick={handleCreateTab}
                />
            </Stack>

            {demands.length > index && ( // prevent loading DemandForm too fast
                <DemandForm index={index} />
            )}
        </Paper>
    );
};
export default DemandSection;
