import { Outlet } from "@remix-run/react";
import ResponsiveAppBar from "./Appbar";
import QuestionDetail from "./QuestionDetail";

const Main = () => {
  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="fixed top-0 w-full z-20">
        <ResponsiveAppBar />
      </div>
      <div className="flex flex-row w-full pt-[68.5px] z-10">
        <Outlet />
        <QuestionDetail />
      </div>
    </div>
  );
};

export default Main;
