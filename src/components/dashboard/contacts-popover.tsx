import PropTypes from "prop-types";
import type { FC } from "react";
import { useDispatch } from "../../store";

interface ContactsPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const ContactsPopover: FC<ContactsPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();
  return null;
  // return (
  //   <Popover
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       horizontal: "center",
  //       vertical: "bottom",
  //     }}
  //     onClose={onClose}
  //     open={!!open}
  //     PaperProps={{
  //       sx: {
  //         p: 2,
  //         width: 320,
  //       },
  //     }}
  //     transitionDuration={0}
  //     {...other}
  //   >
  //     <Typography variant='h6'>Contacts</Typography>
  //     <Box sx={{ mt: 2 }}>
  //       <List disablePadding>
  //         {/* {contacts.allIds.map((contactId) => {
  //           const contact = contacts.byId[contactId]; */}

  //           return (
  //             <ListItem disableGutters key={contact.id}>
  //               <ListItemAvatar>
  //                 <Avatar src={contact.avatar} sx={{ cursor: "pointer" }} />
  //               </ListItemAvatar>
  //               <ListItemText
  //                 disableTypography
  //                 primary={
  //                   <Link
  //                     color='textPrimary'
  //                     noWrap
  //                     sx={{ cursor: "pointer" }}
  //                     underline='none'
  //                     variant='subtitle2'
  //                   >
  //                     {contact.name}
  //                   </Link>
  //                 }
  //               />
  //               {contact.isActive ? (
  //                 <StatusIndicator size='small' status='online' />
  //               ) : (
  //                 contact.lastActivity && (
  //                   <Typography color='textSecondary' noWrap variant='caption'>
  //                     {formatDistanceToNowStrict(contact.lastActivity)} ago
  //                   </Typography>
  //                 )
  //               )}
  //             </ListItem>
  //           );
  //         })}
  //       </List>
  //     </Box>
  //   </Popover>
  // );
};

ContactsPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
