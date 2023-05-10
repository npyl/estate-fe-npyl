import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Editor from "../editor/Editor";

// @mui
// routes
// components

const DescriptionSection: React.FC<any> = (props) => {
  const [quillSimple, setQuillSimple] = useState("");

  const [quillFull, setQuillFull] = useState("");

  return (
    <Grid item xs={12} padding={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Description' />
            <CardContent>
              <Editor
                id='full-editor'
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
