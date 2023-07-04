import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import { IUser } from "src/types/user";
import ListItem from "./item";
import { useProfileQuery } from "src/services/user";

interface ListManagerItemProps {
  manager: IUser;
  label?: string | any;
}

const ListManagerItem: FC<ListManagerItemProps> = (props) => {
  const { manager, label = 'Manager', ...other } = props;

  const router = useRouter();

  const { data } = useProfileQuery({});
  if (!data) return null;

  const performViewManager = () => {
    // view manager
    router.push(`/user/${manager.id}`);
  };

  return (
    <ListItem label={label} {...other}>
      <Button
        sx={{
          flex: 1,
          float: "right",
          height: "22px",
        }}
        variant='outlined'
        onClick={performViewManager}
      >
        <Typography variant='subtitle2' sx={{ overflow: "hidden" }}>
          {manager?.lastName}
        </Typography>
      </Button>
    </ListItem>
  );
};

export default ListManagerItem;
