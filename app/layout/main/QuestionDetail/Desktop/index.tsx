import { useContext } from "react";
import Answers from "./Answers";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "../Context";
import { CircularProgress, IconButton, Typography } from "@mui/material";
import { EditorType } from "~/components/Editor";
import AnswerEditor from "~/components/Question/AddAnswer";
import CloseIcon from "@mui/icons-material/Close";
const Desktop = () => {
  const { loading, questionId, setAnswers, handleClose } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;

  return (
    <div className="max-w-[20vw] min-w-[20vw]">
      <div
        style={{ height: "calc(100vh - 68.5px)" }}
        className="flex flex-col max-w-[20vw] min-w-[20vw] overflow-y-auto fixed pt-4 border-x-[1px] border-gray-300"
      >
        <div className="flex flex-row items-center px-4">
          <Typography sx={{ fontSize: 18 }}>Answer</Typography>
          <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </div>
        {loading ? (
          <div className="flex flex-col items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col w-full h-full">
            <div className="px-4">
              <AnswerEditor
                onSuccess={(data) => setAnswers((items) => [data, ...items])}
                parentId={questionId}
                editorType={EditorType.new}
              />
            </div>
            <Answers />
          </div>
        )}
      </div>
    </div>
  );
};

export default Desktop;
