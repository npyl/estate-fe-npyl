import { Card, CardContent, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FC } from "react";
import { useAllPropertiesQuery } from "src/services/properties";
import DataGridTable from "../DataGrid";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

const ViewAll: FC = () => {
  const { data } = useAllPropertiesQuery();
  if (!data) {
    return null;
  }

  return (
    <Container maxWidth='xl'>
      <Box sx={{ mb: 4 }}>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant='h6'>Properties</Typography>
              <Typography variant='h6'>{data?.length} results</Typography>
            </Box>
          </CardContent>
          <Paper
            sx={{
              padding: 1,
              overflow: "auto",
              maxHeight: "720px",
            }}
          >
            <DataGridTable data={data} />
            {/* <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeads.map((head) => (
                    <TableCell key={head.id}>{head.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.length > 0 &&
                  data.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Image
                            height={30}
                            width={30}
                            alt={""}
                            src={
                              `data:image/jpeg;base64,${row.propertyImage}` ||
                              ""
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table> */}
          </Paper>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewAll;
