import { useState } from "react";
import type { FC } from "react";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";

import { FileDropzone } from "src/components/file-dropzone";
import type { File } from "../../file-dropzone";
import { user, useUpdateProfileMutation } from "src/services/user";
import { useSelector } from "src/store";
import {
  selectFirstName,
  selectLastName,
  selectScreenName,
  selectDepartment,
  selectLivesIn,
  selectEmail,
  selectContantNumber,
  selectFbURL,
  selectSkypeId,
} from "src/slices/account";
import { useAuth } from "src/hooks/use-auth";

interface ImageStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const ImageStep: FC<ImageStepProps> = (props) => {
  const { onBack, onNext } = props;
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const screenName = useSelector(selectScreenName);
  const department = useSelector(selectDepartment);
  const livesIn = useSelector(selectLivesIn);
  const email = useSelector(selectEmail);
  const contantNumber = useSelector(selectContantNumber);
  const fbURL = useSelector(selectFbURL);
  const skypeId = useSelector(selectSkypeId);
  const { user } = useAuth();
  const [updateProfile, { isSuccess, error }] = useUpdateProfileMutation();

  const [filesCover, setFilesCover] = useState<any>([]);
  const handleDropCover = (newFiles: File[]): void => {
    setFilesCover([...newFiles]);
  };

  const handleRemoveCover = (file: File): void => {
    setFilesCover((prevFiles: any[]) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAllCover = (): void => {
    setFilesCover([]);
  };

  const [files, setFiles] = useState<any>([]);
  const handleDrop = (newFiles: File[]): void => {
    setFiles([...newFiles]);
  };

  const handleRemove = (file: File): void => {
    setFiles((prevFiles: any[]) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = (): void => {
    setFiles([]);
  };

  const handleComplete = () => {
    let postData = JSON.stringify({
      username: email,
      id: user?.id || null,
      firstName: firstName,
      lastName: lastName,
      screenName: screenName,
      //todo semester
      semester: 1,
      departmentId: department,
      livesIn: livesIn,
      contactNumber: contantNumber,
      facebookProfileUrl: fbURL,
      skypeId: skypeId,
      aboutMe:
        "Hi, I’m Jose, I’m 29 and I work as a Ninja Developer for the “PIXINVENT” Creative Studio. In my research, I follow the flow of early medieval slavery from viking raids in the west, through the booming ports of the Scandinavian north, and out into the Islamic world. Reading texts against the grain and seeing artifacts as traces of the past can make their lives once again visible to us today. This website documents my efforts to do just that, and I hope it will prove a resource and an inspiration for others in similar pursuits.",
      coursesOfInterest: "",
    });

    const blob = new Blob([postData], {
      type: "application/json",
    });
    let dataToSend = new FormData();

    dataToSend.append("profilePhoto", files[0]);
    dataToSend.append("coverPhoto ", filesCover[0]);
    dataToSend.append("userProfileForm ", blob);

    updateProfile(dataToSend);
    !error && onNext();
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant='subtitle1' sx={{ mt: 2 }}>
            Upload your profile picture(required)
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant='subtitle1' sx={{ mt: 2 }}>
            Upload your cover picture(required)
          </Typography>
        </Grid>

        <Grid height={"350px"} item xs={6}>
          <FileDropzone
            singleItem={true}
            title='Profile Photo'
            accept='image/*'
            files={files}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
          />
        </Grid>
        <Grid height={"350px"} item xs={6}>
          <FileDropzone
            singleItem={true}
            title='Cover Photo'
            accept='image/*'
            files={filesCover}
            onDrop={handleDropCover}
            onRemove={handleRemoveCover}
            onRemoveAll={handleRemoveAllCover}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={files.length === 0 || filesCover.length === 0}
          endIcon={<ArrowRightIcon fontSize='small' />}
          onClick={handleComplete}
          variant='contained'
        >
          Complete
        </Button>
        <Button onClick={onBack} sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </>
  );
};
