import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import { FC } from "react";
import { Label } from "@/components/Label";
import DocumentIcon from "src/components/upload/preview/DocumentIcon";
import { IPropertyDocument } from "@/types/file";
import useDialog from "@/hooks/useDialog";

interface DocumentProps {
    d: IPropertyDocument;
}

const Document: FC<DocumentProps> = ({ d }) => {
    const { url, filename, labels } = d;

    const [isOpen, open, close] = useDialog();

    if (!url) return null;

    return (
        <Grid
            item
            sx={{
                border: 1,
                borderRadius: 1,
                p: 2,
            }}
            flex={1}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mb={2}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    width="100%"
                >
                    <DocumentIcon isPreview={false} />

                    <Typography variant="h6">{filename || "N/A"}</Typography>
                    <Box ml={2}>
                        {labels.map(({ id, name, color }) => (
                            <Label key={id} color={color} name={name} />
                        ))}
                    </Box>
                </Box>
                <IconButton>
                    {!isOpen ? <KeyboardArrowDownIcon onClick={open} /> : null}
                    {isOpen ? <KeyboardArrowUpIcon onClick={close} /> : null}
                </IconButton>
            </Box>
            {isOpen ? (
                <iframe
                    src={url}
                    height={500}
                    width={"100%"}
                    style={{
                        border: 0,
                    }}
                />
            ) : null}
        </Grid>
    );
};

const getDocument = (d: IPropertyDocument) => <Document key={d.id} d={d} />;

export default getDocument;
