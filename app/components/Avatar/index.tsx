import { type User } from "@prisma/client";
import { default as AvatarMui } from "@mui/material/Avatar";
import { getUserImgSrc } from "~/utils/misc";
import { type SerializeFrom } from "@remix-run/node";
import { type SxProps } from "@mui/material";
import { Link } from "@remix-run/react";
import { PATH_PAGE } from "~/config/path";

const Avatar = ({ user, sx }: { user: SerializeFrom<User>; sx?: SxProps }) => {
  return (
    <Link to={PATH_PAGE.user.question(user.id)}>
      <AvatarMui
        src={getUserImgSrc(user.avatarId)}
        sx={{ width: 32, height: 32, ...sx }}
      ></AvatarMui>
    </Link>
  );
};

export default Avatar;
