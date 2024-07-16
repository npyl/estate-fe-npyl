// @mui
import { Grid, IconButton, Stack, StackProps, Typography } from "@mui/material";
import FileThumbnail from "../../file-thumbnail";
import Iconify from "../../iconify";
//
import { IPropertyFile, UploadVariant } from "../types";
import { LabelCreate } from "@/components/Label";
import { DocumentIcon } from "./DocumentIcon";
import { styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const StyledContainer = styled(Grid)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    borderRadius: theme.spacing(0.75),
    border: `solid 1px ${theme.palette.divider}`,
    cursor: "pointer",
}));

// ----------------------------------------------------------------------

interface ItemProps {
    variant: UploadVariant;
    file: IPropertyFile;
    onClick?: (f: IPropertyFile) => void;
    onRemove?: (f: IPropertyFile) => void;
}

const Item = ({ variant, file, onClick, onRemove }: ItemProps) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove?.(file);
    };

    return (
        <StyledContainer
            container
            alignItems="center"
            onClick={() => onClick?.(file)}
        >
            <Grid item xs={2}>
                {variant === "image" && <FileThumbnail file={file} />}

                {variant === "document" && (
                    <DocumentIcon
                        isPreview={!file.url}
                        sx={{
                            width: 50,
                            height: 50,
                        }}
                    />
                )}
            </Grid>

            <Grid item xs={6}>
                {"filename" in file && (
                    <Typography ml={1} variant="subtitle2">
                        {file.filename}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={4} display="flex" justifyContent="flex-end">
                {variant === "document" && file.url && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <LabelCreate variant="document" resourceId={file.id} />
                    </div>
                )}

                {onRemove && file.url && (
                    <IconButton edge="end" size="small" onClick={handleRemove}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                )}
            </Grid>
        </StyledContainer>
    );
};

// ----------------------------------------------------------------------

interface MultiFilePreviewProps extends StackProps {
    files: IPropertyFile[];
    variant: UploadVariant;
    onFileClick?: (file: IPropertyFile) => void;
    onRemove?: (file: IPropertyFile) => void;
}

const MultiFilePreview = ({
    files,
    variant,
    onFileClick,
    onRemove,
    ...props
}: MultiFilePreviewProps) => (
    <Stack {...props} spacing={1}>
        {files.map((file) => (
            <Item
                key={file.key}
                variant={variant}
                file={file}
                onClick={onFileClick}
                onRemove={onRemove}
            />
        ))}
    </Stack>
);

export default MultiFilePreview;
