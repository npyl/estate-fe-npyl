import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import * as user from "src/services/user";
import { IUser } from "src/types/user";
import ListItem from "./item";

interface ListManagerItemProps {
  manager: IUser;
}

const ListManagerItem: FC<ListManagerItemProps> = (props) => {
  const { manager, ...other } = props;

  const router = useRouter();

  const { data } = user.useProfileQuery(manager?.id);
  if (!data) return null;

  const performViewManager = () => {
    // view manager
    router.push(`/user/${manager.id}`);
  };

  return (
    <ListItem label="Manager" {...other}>
      <Button
        sx={{
          flex: 1,
          maxWidth: "30%",
          float: "right",
        }}
        variant="outlined"
        onClick={performViewManager}
      >
        <Typography variant="subtitle2" sx={{ overflow: "hidden" }}>
          {manager?.lastName}
        </Typography>
      </Button>
    </ListItem>
  );
};

export default ListManagerItem;
