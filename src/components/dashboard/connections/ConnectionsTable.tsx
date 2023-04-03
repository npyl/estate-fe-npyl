import { useEffect, useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
import NextLink from "next/link";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getInitials } from "../../../utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import {
  useApproveRequestMutation,
  useDeleteMemberMutation,
  useSendRequestMutation,
} from "src/services/connections";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { user } from "src/services/user";
import { useAuth } from "src/hooks/use-auth";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

interface ConnectionsTableProps {
  members: any;
  customersCount: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
}

export const ConnectionsTable: FC<ConnectionsTableProps> = (props) => {
  const {
    members,
    customersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  const { user } = useAuth();
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // Reset selected members when members change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [members]
  );
  const [addFriend, { isLoading }] = useSendRequestMutation();
  const [approve] = useApproveRequestMutation();
  const [deleteMember] = useDeleteMemberMutation();

  const enableBulkActions = selectedCustomers.length > 0;
  const iconSelector = (member: any) => {
    switch (member.connectionStatus) {
      case "ConnectionStatus.NONE":
        return (
          <Tooltip title='Follow'>
            <IconButton
              disabled={isLoading}
              onClick={() =>
                addFriend({ fromUserId: user.id, toUserId: member.id })
              }
            >
              <PersonAddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        );

      case "ConnectionStatus.PENDINGFROMMYSIDE":
        return (
          <Stack direction={"row"} alignItems={"center"}>
            <Typography color='gray'>Pending...</Typography>
            <Tooltip title='Cancel'>
              <IconButton
                onClick={() => deleteMember(member.connectionId)}
                color={"error"}
              >
                <HighlightOffIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Stack>
        );

      case "ConnectionStatus.PENDINGFROMTHEIRSIDE":
        return (
          <>
            <Button
              onClick={() =>
                approve({
                  fromUserId: user.id,
                  toUserId: member.id,
                  approved: true,
                })
              }
              color='info'
              variant='outlined'
              size='small'
            >
              Approve
            </Button>
            <Button
              onClick={() => deleteMember(member.connectionId)}
              color='error'
              variant='outlined'
              size='small'
            >
              <Typography ml={1}>Reject</Typography>
            </Button>
          </>
        );

      case "ConnectionStatus.APPROVED":
        return (
          <Box>
            <Tooltip title='Friends'>
              <IconButton color={"success"} sx={{ cursor: "default" }}>
                <PeopleIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Unfollow'>
              <IconButton
                onClick={() => deleteMember(member.connectionId)}
                color={"error"}
              >
                <HighlightOffIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        );
    }
  };
  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          display: enableBulkActions ? "block" : "none",
          px: 2,
          py: 0.5,
        }}
      >
        <Button size='small' sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size='small' sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead
            sx={{ visibility: enableBulkActions ? "collapse" : "visible" }}
          >
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Number of Connections</TableCell>
              <TableCell>Connect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members &&
              members.length > 0 &&
              members.map((member: any) => {
                const isCustomerSelected = selectedCustomers.includes(
                  member.id
                );

                return (
                  <TableRow hover key={member.id} selected={isCustomerSelected}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar
                          src={
                            member.images[0]?.imageBinary
                              ? `data:image/jpeg;base64,${member?.images[0]?.imageBinary}`
                              : undefined
                          }
                          sx={{
                            height: 42,
                            width: 42,
                          }}
                        >
                          {getInitials(member.username)}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          {/* <NextLink href='/members/1' passHref> */}
                          <Link color='inherit' variant='subtitle2'>
                            {member.username}
                          </Link>
                          {/* </NextLink> */}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{member.department.title}</TableCell>
                    <TableCell>{member.semester}</TableCell>
                    <TableCell>
                      <Typography variant='subtitle2'>
                        {member.numberOfConnections}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {user && member.id === user.id ? (
                        <></>
                      ) : (
                        iconSelector(member)
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component='div'
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};
