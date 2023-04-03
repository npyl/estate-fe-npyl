import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { MailOpen as MailOpenIcon } from "../../icons/mail-open";
import { Scrollbar } from "../scrollbar";
import useWebSocket from "react-use-websocket";
import { useChangeViewedStatusMutation } from "src/services/aws";
import { useDispatch } from "src/store";
import {
  EventTypes,
  INotificationBody,
  INotifications,
} from "src/interfaces/aws";
import DoneIcon from "@mui/icons-material/Done";

interface NotificationsPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  onUpdateUnread?: (value: number) => void;
  open?: boolean;
  refetchNotif: () => void;
  notifications: INotifications[];
}

const now = new Date();

function padTo2Digits(num: number) {
  if (num < 10) {
    return num;
  }
  return num.toString().padStart(2, "0");
}

function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60) - 3;
  let days = Math.floor(hours - 3 / 24);
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  if (days > 0) {
    return `${padTo2Digits(days)} days ago`;
  } else if (hours > 0) {
    return `${padTo2Digits(hours)} hours ago`;
  } else if (minutes > 0) {
    return `${padTo2Digits(minutes)} minutes ago`;
  }
  return `${padTo2Digits(seconds)} seconds ago`;
}

const getNotificationContent = (
  notification: INotifications
): JSX.Element | null => {
  const notif: INotificationBody = JSON.parse(
    notification.body.replaceAll("\\", "").slice(1, -1)
  );
  switch (notif.event) {
    case EventTypes.JOIN_COURSE:
      return (
        <>
          <ListItemAvatar sx={{ mt: 0.5 }}>
            {/* <Avatar src={notification.avatar}>
       <UserCircleIcon fontSize='small' />
     </Avatar> */}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <Typography sx={{ mr: 0.5 }} variant='subtitle2'>
                  {notif.from_user}
                </Typography>
                <Typography sx={{ mr: 0.5 }} variant='body2'>
                  joined your course
                </Typography>
                <Typography sx={{ mr: 0.5 }} variant='body2'>
                  {notif.course_title}
                </Typography>
              </Box>
            }
            secondary={
              <Typography color='textSecondary' variant='caption'>
                {convertMsToTime(
                  new Date().getTime() -
                    new Date(notification.deliveredAt).getTime()
                )}
              </Typography>
            }
            sx={{ my: 0 }}
          />
        </>
      );
    default:
      return null;
  }
};

export const NotificationsPopover: FC<NotificationsPopoverProps> = (props) => {
  const {
    anchorEl,
    onClose,
    onUpdateUnread,
    open,
    refetchNotif,
    notifications,
    ...other
  } = props;
  const [isItemHovered, setIsItemHovered] = useState<number | null>(null);

  const [changeStatus] = useChangeViewedStatusMutation();
  const unread = useMemo(
    () =>
      notifications.reduce(
        (acc, notification) => acc + (notification.viewed ? 0 : 1),
        0
      ),
    [notifications]
  );

  useEffect(() => {
    onUpdateUnread?.(unread);
  }, [onUpdateUnread, unread]);

  const handleMarkAllAsRead = (): void => {
    // setNotifications((prevState) =>
    //   prevState.map((notification) => ({
    //     ...notification,
    //     read: true,
    //   }))
    // );
  };
  const handleMarkNotificationAsViewed = (): void => {};

  const handleMessage = (message: any) => {
    console.log(message);
  };

  const [socketUrl, setSocketUrl] = useState(
    `wss://4rrblpnm2i.execute-api.us-east-2.amazonaws.com/production`
  );
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState, lastJsonMessage } =
    useWebSocket(socketUrl, {
      protocols: `${localStorage.getItem("accessToken")}`,
    });

  useEffect(() => {
    if (lastMessage !== null) {
      refetchNotif();
    }
  }, [lastMessage, setMessageHistory, refetchNotif]);

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        onClose={onClose}
        open={!!open}
        PaperProps={{ sx: { width: 400 } }}
        transitionDuration={0}
        {...other}
      >
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "default",
            color: "text.primary",
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            py: 2,
            borderBottom: "1px solid gray",
          }}
        >
          <Typography color='inherit' variant='h6'>
            Notifications
          </Typography>
          <Tooltip title='Mark all as read'>
            <IconButton
              onClick={handleMarkAllAsRead}
              size='small'
              sx={{ color: "inherit" }}
            >
              <MailOpenIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
        {notifications.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <Typography variant='subtitle2'>
              There are no notifications
            </Typography>
          </Box>
        ) : (
          <Scrollbar sx={{ maxHeight: 400 }}>
            <List disablePadding>
              {notifications.map((notification) => (
                <ListItem
                  divider
                  key={notification.id}
                  sx={{
                    paddingRight: 1,
                    alignItems: "flex-start",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    "& .MuiListItemSecondaryAction-root": {
                      top: "28%",
                    },
                  }}
                  onMouseEnter={() => setIsItemHovered(notification.id)}
                  onMouseLeave={() => setIsItemHovered(null)}
                  secondaryAction={
                    isItemHovered === notification.id && (
                      <Tooltip title='Mark as read'>
                        <IconButton
                          edge='end'
                          onClick={() => changeStatus(notification.id)}
                          size='small'
                        >
                          <DoneIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  {getNotificationContent(notification)}
                </ListItem>
              ))}
            </List>
          </Scrollbar>
        )}
      </Popover>
    </>
  );
};
