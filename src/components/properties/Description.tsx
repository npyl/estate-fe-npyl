import { connect } from "react-redux";
import { setDescription } from "src/slices/property";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Editor from "../editor/Editor";

interface DescriptionSectionProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
  setDescription,
}) => {
  return (
    <Grid item xs={12} padding={0}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Description" />
            <CardContent>
              <Editor
                id="full-editor"
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  description: state.property.description,
});

const mapDispatchToProps = (dispatch: any) => ({
  setDescription: (description: string) =>
    dispatch(setDescription(description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionSection);
