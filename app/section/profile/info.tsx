import { Typography } from "@mui/material";
import { Avatar } from "~/components";
import { type UserInfoType } from "~/routes/resources.users.$userId";
import { useOptionalUser } from "~/utils/user";

const Info = ({ user }: { user: UserInfoType }) => {
  const currentUser = useOptionalUser();
  return (
    <div className="p-4 flex flex-row gap-3">
      <Avatar user={user} sx={{ width: 80, height: 80 }} />
      <div className="flex flex-col">
        <Typography sx={{ fontSize: 16 }}>{user.name}</Typography>
        {currentUser?.id === user.id && (
          <Typography sx={{ fontSize: 12 }}>{user.email}</Typography>
        )}
      </div>
    </div>
  );
};

export default Info;
