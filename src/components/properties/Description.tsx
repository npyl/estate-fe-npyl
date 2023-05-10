import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Paper,
  TextField,
  MenuItem,
  List,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { IGlobalProperty } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { selectDescription, setDescription } from "src/slices/property";
import Editor from "../editor/Editor";
import { useState } from "react";

// @mui
import { Container } from "@mui/material";
// routes
import { PATH_PAGE } from "../extra/routes/paths";
// components

import Markdown from "../markdown";
import CustomBreadcrumbs from "../custom-breadcrumbs";

const DescriptionSection: React.FC<any> = (props) => {
  const [quillSimple, setQuillSimple] = useState("");

  const [quillFull, setQuillFull] = useState("");

  return (
    <Grid item xs={12} padding={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Description" />
            <CardContent>
              <Editor
                id="full-editor"
                value={quillFull}
                onChange={(value) => setQuillFull(value)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DescriptionSection;
