import {
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { FC } from "react";
import { useAllPropertiesQuery } from "src/services/properties";

const ViewAll: FC = () => {
  const { data } = useAllPropertiesQuery();
  if (!data) {
    return null;
  }

  const tableHeads = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "thumbnail",
      label: "Thumbnail",
    },
    {
      id: "type",
      label: "Type",
    },
    {
      id: "dateCreated",
      label: "Date Created",
    },
    {
      id: "website",
      label: "Website",
    },
  ];

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
              overflow: "auto",
              padding: "0px 24px",
              maxHeight: "720px",
            }}
          >
            <Table stickyHeader>
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
                  data.map((row) => {
                    return (
                      <TableRow>
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
            </Table>
          </Paper>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewAll;
