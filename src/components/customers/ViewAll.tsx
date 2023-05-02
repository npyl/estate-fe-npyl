import { Card, CardContent, Container, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { FC } from "react";
import { useAllCustomersQuery } from "src/services/customers";
import DataGridTable from "../DataGrid";

const ViewAll: FC = () => {
  const { data } = useAllCustomersQuery();
  if (!data) {
    return null;
  }
  const columns: GridColDef[] = [
    { field: "referenceId", headerName: "Reference ID" },
    { field: "type", headerName: "Type" },
    { field: "dateCreated", headerName: "Date Created" },
    { field: "website", headerName: "Website" },
  ];
  const rows: GridRowsProp = data.map((row, index) => {
    return {
      id: index,

      referenceId: "World",
      type: "hi",
      dateCreated: "hi",
      website: "hi",
    };
  });
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
              <Typography variant='h6'>Customers</Typography>
              <Typography variant='h6'>{data?.length} results</Typography>
            </Box>
          </CardContent>
          <Paper
            sx={{
              overflow: "auto",
              maxHeight: "720px",
            }}
          >
            <DataGridTable rows={rows} columns={columns} />
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
