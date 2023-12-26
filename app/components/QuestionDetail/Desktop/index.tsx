import { useContext } from "react";
import Answers from "./Answers";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "../Context";
import { CircularProgress } from "@mui/material";

const Desktop = () => {
  const { loading } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;

  return (
    <div className="max-w-[20vw] min-w-[20vw]">
      <div className="flex flex-col max-w-[20vw] min-w-[20vw] h-screen fixed pt-4">
        {loading ? (
          <div className="flex flex-col items-center">
            <CircularProgress />
          </div>
        ) : (
          <Answers />
        )}
      </div>
    </div>
  );
};

export default Desktop;
