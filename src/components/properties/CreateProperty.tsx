import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Box, ThemeProvider } from "@mui/system";
import BasicSection from "./Basic";
import FeaturesSection from "./Features";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import { useAddPropertyMutation } from "src/services/properties";
import { useSelector } from "react-redux";
import { selectAll } from "src/slices/property";
import DescriptionSection from "./Description";
import LocationSection from "./Location";
import AreasSection from "./Areas";
import { Grid, createMuiTheme } from "@mui/material";
import HeatingSection from "./Heating";
import ParkingSection from "./Parking";
import BalconiesSection from "./Balconies";
import DistancesSection from "./Distances";
import PropertyDescriptionSection from "./PropertyDescription";
import ImageSection from "./Images";
import { useRouter } from "next/router";
import FileSection from "./Files";

export default function SimpleAccordion() {
  const { data } = useAllPropertyGlobalQuery();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
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
    console.log(fileData);
    dataToSend.append(
      "propertyFile ",
      files[0] || new File([""], "", { type: "null" })
    );
    for (let i = 1; i < fileData.length; i++) {
      dataToSend.append(
        "propertyGalleryFiles ",
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
    <Grid container paddingTop={1} paddingRight={1} spacing={1}>
      <Grid item xs={6} order={"row"}>
        <Stack spacing={1}>
          <BasicSection enums={property} />

          <PropertyDescriptionSection enums={property} />

          <AreasSection enums={property} />
          <DistancesSection enums={property} />
          <FileSection
            fileData={fileData}
            setFileData={setFileData}
            enums={property}
          />
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack spacing={1}>
          <ImageSection files={files} setFiles={setFiles} enums={property} />
          <LocationSection enums={property} />
          <HeatingSection enums={property} />

          <ParkingSection enums={property} />

          <BalconiesSection enums={property} />

          <DescriptionSection enums={property} />
        </Stack>
      </Grid>

      {/* <DetailsSection enums={property} /> */}
      <Grid item xs={12}>
        <FeaturesSection enums={property} />
      </Grid>

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
