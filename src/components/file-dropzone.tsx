import type { FC } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import type { FileWithPath, DropzoneOptions } from "react-dropzone";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Duplicate as DuplicateIcon } from "../icons/duplicate";
import { X as XIcon } from "../icons/x";
import { bytesToSize } from "../utils/bytes-to-size";
import { FormHelperText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export type File = FileWithPath;

interface FileDropzoneProps extends DropzoneOptions {
  files?: File[];
  title?: string;
  onRemove?: (file: File) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
  singleItem?: boolean;
  simple?: boolean;
}

export const FileDropzone: FC<FileDropzoneProps> = (props) => {
  const {
    accept,
    disabled,
    files = [],
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    title,
    singleItem,
    simple = false,
    ...other
  } = props;

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  });
  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          height: simple ? "56px!important" : "auto",
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: simple ? 0 : 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {!simple && (
          <>
            <Box
              sx={{
                "& img": {
                  width: 100,
                },
              }}
            >
              <img alt='Select file' src='/static/undraw_add_file2_gvbb.svg' />
            </Box>
          </>
        )}
        <Box sx={{ p: 2, display: "flex" }}>
          <Typography variant='h6'>{title}</Typography>
          {simple && (
            <Typography ml={1} variant='h6'>
              <AddCircleIcon />
            </Typography>
          )}
        </Box>
      </Box>
      {singleItem && files.length > 1 ? (
        // <div>Hi</div>
        <FormHelperText error>Select only 1 image</FormHelperText>
      ) : (
        files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <List>
              {files.map(
                (file) =>
                  file.name && (
                    <ListItem
                      key={`${file.name}-${file.lastModified}`}
                      sx={{
                        height: "30px",
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        "& + &": {
                          mt: 1,
                        },
                      }}
                    >
                      <ListItemIcon>
                        <DuplicateIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText
                        sx={{}}
                        primary={file.name}
                        primaryTypographyProps={{
                          color: "textPrimary",
                          variant: "subtitle2",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      />
                      <Tooltip title='Remove'>
                        <IconButton edge='end' onClick={() => onRemove?.(file)}>
                          <XIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                  )
              )}
            </List>
          </Box>
        )
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string.isRequired),
  ]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
};
