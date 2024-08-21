// @mui
import { Grid, IconButton, Stack, StackProps, Typography } from "@mui/material";
import FileThumbnail from "../../file-thumbnail";
import Iconify from "../../iconify";
//
import { IPropertyFile, UploadVariant } from "../types";
import { LabelCreate } from "@/components/Label";
import DocumentIcon from "./DocumentIcon";
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
    disabled?: boolean;
    onClick?: (url: string) => void;
    onRemove?: (key: string) => void;
}

const Item = ({
    variant,
    file,
    disabled = false,
    onClick,
    onRemove,
}: ItemProps) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onRemove?.(file.key);
    };
    const handleClick = () => {
        onClick?.(file?.url || "");
    };

    return (
        <StyledContainer container alignItems="center" onClick={handleClick}>
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
                        <LabelCreate
                            variant="document"
                            resourceId={file.id}
                            disabled={disabled}
                        />
                    </div>
                )}

                {onRemove && file.url && (
                    <IconButton
                        edge="end"
                        size="small"
                        disabled={disabled}
                        onClick={handleRemove}
                    >
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
    disabled?: boolean;
    onFileClick?: (url: string) => void;
    onRemove?: (key: string) => void;
}

const MultiFilePreview = ({
    files,
    variant,
    disabled = false,
    onFileClick,
    onRemove,
    ...props
}: MultiFilePreviewProps) => (
    <Stack {...props} spacing={1}>
        {files.map((file, i) => (
            <Item
                key={`${file.filename}_${i}`}
                variant={variant}
                file={file}
                disabled={disabled}
                onClick={onFileClick}
                onRemove={onRemove}
            />
        ))}
    </Stack>
);

export default MultiFilePreview;
