import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import BasicSection from "./Basic";
import FeaturesSection from "./Feautures";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import { useAddPropertyMutation } from "src/services/properties";
import { useSelector } from "react-redux";
import { selectAll } from "src/slices/property";
import DescriptionSection from "./Description";
import LocationSection from "./Location";
import AreasSection from "./Areas";
import { Grid } from "@mui/material";
import HeatingSection from "./Heating";
import ParkingSection from "./Parking";
import BalconiesSection from "./Balconies";
import DistancesSection from "./Distances";
import PropertyDescriptionSection from "./PropertyDescription";
import ImageSection from "./Images";
import { useRouter } from "next/router";

export default function SimpleAccordion() {
  const { data } = useAllPropertyGlobalQuery();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const property: IGlobalProperty = data?.property as IGlobalProperty;
  const router = useRouter();
  const body = useSelector(selectAll);

  const [create, { isSuccess }] = useAddPropertyMutation();

  const performUpload = () => {
    const blob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    let dataToSend = new FormData();
    console.log(files);
    dataToSend.append(
      "propertyImage ",
      files[0] || new File([""], "", { type: "null" })
    );
    for (let i = 1; i < files.length; i++) {
      dataToSend.append(
        "propertyGallery ",
        files[i] || new File([""], "", { type: "null" })
      );
    }
    dataToSend.append("propertyForm ", blob);

    // perform POST
    create(dataToSend);
    console.log("hi");
    isSuccess && router.push("/");
  };

  return (
    <Grid container p={2}>
      <Grid item xs={6}>
        <BasicSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <PropertyDescriptionSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <LocationSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <AreasSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <HeatingSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <ParkingSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <BalconiesSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <DistancesSection enums={property} />
      </Grid>
      <Grid item xs={6}>
        <DescriptionSection enums={property} />
      </Grid>
      <Grid item xs={12}>
        <ImageSection files={files} setFiles={setFiles} enums={property} />
      </Grid>

      {/* <DetailsSection enums={property} /> */}
      <Grid item xs={12}>
        <FeaturesSection enums={property} />
      </Grid>

      {/* <Buttons> */}
      <Box padding={2}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => performUpload()}
          >
            Upload
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}
