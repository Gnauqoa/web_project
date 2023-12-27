import { Button, Stack } from "@mui/material";
import { Link, useLocation, useParams } from "@remix-run/react";
import { PATH_PAGE } from "~/config/path";

const Tabs = () => {
  const params = useParams();
  return (
    <Stack sx={{ flexDirection: "row", width: "100%" }}>
      <Tab
        title="Questions"
        to={PATH_PAGE.user.question(params.userId || "")}
      />
      <Tab title="Answers" to={PATH_PAGE.user.answer(params.userId || "")} />
    </Stack>
  );
};

const Tab = ({ title, to }: { title: string; to: string }) => {
  const location = useLocation();
  return (
    <Link style={{ width: "100%" }} to={to}>
      <Button
        variant={to === location.pathname ? "contained" : "text"}
        sx={{
          borderRadius: 0,
          textTransform: "none",
          width: "100%",
          borderBottom: "1px solid",
          borderBottomColor: "gray",
          boxShadow: "none",
        }}
      >
        {title}
      </Button>
    </Link>
  );
};

export default Tabs;
