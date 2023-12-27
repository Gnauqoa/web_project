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
            {currentUser?.id === user.id && (
              <Typography sx={{ fontSize: 12 }}>{user.email}</Typography>
            )}
          </div>
          <div className="ml-auto">
            <Button
              variant="contained"
              onClick={handleEdit}
              sx={{ textTransform: "none" }}
            >
              Sửa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
