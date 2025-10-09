import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren } from "react";

interface EntryProps extends PropsWithChildren {
    icon: string;
    adornment?: string;
}

const Entry: FC<EntryProps> = ({ icon, adornment, children }) => (
    <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography>
            <i className={icon} />
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {children}
        </Typography>
        {adornment ? (
            <Typography variant="body2" color="text.secondary">
                {adornment}
            </Typography>
        ) : null}
    </Stack>
);

const getEntry = ({ children, ...props }: EntryProps) => (
    <Entry key={props.icon} {...props}>
        {children}
    </Entry>
);

export type { EntryProps };
export default getEntry;
