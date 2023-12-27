import { IconButton } from "@mui/material";
import { type ContentProps } from ".";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { Link, useLocation } from "@remix-run/react";

const Zoom = ({ content, type }: ContentProps) => {
  const location = useLocation();
  if (location.pathname === `/${type}/${content.id}`) return <></>;
  return (
    <Link to={`/${type}/${content.id}`}>
      <IconButton sx={{ p: 0 }}>
        <ZoomOutMapIcon sx={{ width: 20 }} />
      </IconButton>
    </Link>
  );
};

export default Zoom;
