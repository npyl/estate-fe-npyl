import { useState } from "react";
import type { FC } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { QuillEditor } from "../../quill-editor";
import { useAuth } from "src/hooks/use-auth";

interface AboutStepProps {
  onBack: () => void;
  onNext: () => void;
}

export const AboutStep: FC<AboutStepProps> = (props) => {
  const { onBack, onNext, ...other } = props;
  const { user } = useAuth();
  const [content, setContent] = useState<string>(user?.aboutMe || "");

  const handleAboutChange = (value: string): void => {
    setContent(value);
  };
  const handleCoursePref = (value: string): void => {};
  return (
    <div {...other}>
      <Stack spacing={3}>
        <Box>
          <Typography variant='subtitle1'>
            How would you describe your self?
          </Typography>
          <QuillEditor
            onChange={handleAboutChange}
            placeholder='Write something'
            sx={{
              height: 250,
              mt: 1,
            }}
            value={content}
          />
        </Box>
        <Box>
          <Typography variant='subtitle1'>
            Courses of Interest (Please separate them with `&quot;`,`&quot;`)
          </Typography>
          <Box mt={1}>
            <TextField
              fullWidth
              name='coursesPref'
              //onChange={handleCoursePref}
              // value={billing.optionalAddress}
            />
          </Box>
        </Box>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Button
          endIcon={<ArrowRightIcon fontSize='small' />}
          onClick={onNext}
          variant='contained'
        >
          Next
        </Button>
        <Button onClick={onBack}
sx={{ ml: 2 }}>
          Back
        </Button>
      </Box>
    </div>
  );
};
