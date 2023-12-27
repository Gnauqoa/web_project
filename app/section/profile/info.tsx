import { Typography } from "@mui/material";
import { Avatar } from "~/components";
import { type UserInfoType } from "~/routes/users.$userId_";
import { useOptionalUser } from "~/utils/user";

const Info = ({ user }: { user: UserInfoType }) => {
  const currentUser = useOptionalUser();
  return (
    <div className="p-4 flex flex-row gap-3">
      <Avatar user={user} sx={{ width: 80, height: 80 }} />
      <div className="flex flex-col">
        <Typography>{user.name}</Typography>
        {currentUser?.id === user.id && <Typography>{user.email}</Typography>}
      </div>
    </div>
  );
};

export default Info;
