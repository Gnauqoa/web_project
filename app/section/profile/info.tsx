import { Button, Typography } from "@mui/material";
import { Avatar } from "~/components";
import useToggle from "~/hooks/useToggle";
import { type UserInfoType } from "~/routes/resources.users.$userId";
import { useOptionalUser } from "~/utils/user";
import EditProfile from "./editProfile";

const Info = ({ user }: { user: UserInfoType }) => {
  const currentUser = useOptionalUser();
  const {
    toggle: mode,
    handleOpen: handleEdit,
    handleClose: handleNormal,
  } = useToggle({});
  const isCurrentUser = currentUser?.id === user.id;
  return (
    <div className="p-4 flex flex-col md:flex-row gap-3">
      <Avatar user={user} sx={{ width: 80, height: 80 }} />
      {mode ? (
        <EditProfile handleCancel={handleNormal} />
      ) : (
        <div className="flex flex-row w-full">
          <div className="flex flex-col">
            <Typography sx={{ fontSize: 16 }}>{user.name}</Typography>
            <Typography sx={{ fontSize: 10 }}>{user.bio}</Typography>
            {isCurrentUser && (
              <Typography sx={{ fontSize: 12 }}>{user.email}</Typography>
            )}
          </div>
          {isCurrentUser && (
            <div className="ml-auto">
              <Button
                variant="contained"
                onClick={handleEdit}
                sx={{ textTransform: "none" }}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Info;
