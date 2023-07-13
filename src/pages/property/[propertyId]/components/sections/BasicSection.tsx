import { Button, Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import {
  ListBooleanItem,
  ListItem,
  ListManagerItem,
  ListStatusItem,
} from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { IProperties } from "src/types/properties";
import { IUser } from "src/types/user";
import PopupWindow from "./PopopWindowROI";

interface BasicSectionProps {
  data: IProperties;
}

const BasicSection: React.FC<BasicSectionProps> = (props) => {
  const { data } = props;
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleOpenPopup = () => {
    setShowPopup((prevShowPopup) => !prevShowPopup);
  };
  const details = data?.details;
  const areas = data?.areas;

  const manager: IUser = data?.manager;

  const isAvailable = (state: string) => {
    return state === "Sale" || state === "Rent";
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10} sx={{ overflow: "auto" }}>
          <Box
            sx={{
              px: 2.5,
              py: 1,
              display: "flex",
              justifyContent: "left",
            }}
          >
            <Typography variant='h6'>Basic Details</Typography>
          </Box>
          <Divider></Divider>
          <Grid container>
            <Grid item xs={6}>
              <List>
                <ListItem
                  label='Category'
                  value={data?.category}
                  align='horizontal'
                />

                <ListItem
                  label='House Area'
                  value={areas?.covered}
                  align='horizontal'
                />
                <ListItem
                  label='Plot Area'
                  value={areas?.plot}
                  align='horizontal'
                />
                <ListBooleanItem
                  label='Rented'
                  status={data?.rented}
                  align='horizontal'
                />
                <ListItem
                  label='Available After'
                  value={data?.availableAfter}
                  align='horizontal'
                />
                <ListItem
                  label='Monthly Utilities'
                  value={data?.averageUtils + " €"}
                  align='horizontal'
                />
                <ListItem
                  label='Construction Year'
                  value={data.construction?.yearOfConstruction}
                  align='horizontal'
                />
                {/* yer build na prosthetei??? */}
              </List>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem label='Code' value={data?.code} align='horizontal' />
                <ListItem
                  label='Price'
                  value={data?.price + " € / m^2"}
                  align='horizontal'
                />

                <ListItem
                  label='Key Code'
                  value={data?.keyCode}
                  align='horizontal'
                />

                <ListManagerItem manager={manager} />
                <ListStatusItem
                  label='Publiced'
                  status={isAvailable(data?.state)}
                  align='horizontal'
                />
                <ListItem
                  label='State'
                  value={data?.state}
                  align='horizontal'
                />

                <ListLabelsItem labels={data?.labels} label={""} />
                <ListItem label={"ROI"}>
                  <Button
                    sx={{
                      flex: 1,
                      float: "right",
                      height: "22px",
                    }}
                    variant='outlined'
                    onClick={handleOpenPopup}
                  >
                    ROI
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {showPopup && (
        <Grid item xs={12}>
          <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
              sx={{
                px: 2.5,
                py: 1,
                display: "flex",
                justifyContent: "left",
              }}
            >
              <Typography variant='h6'>ROI</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
              <Grid item xs={12}>
                <PopupWindow />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default BasicSection;
