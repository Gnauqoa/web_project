import { useContext } from "react";
import Answers from "./Answers";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "../Context";
import { CircularProgress } from "@mui/material";
import { EditorType } from "~/components/Editor";
import AnswerEditor from "~/components/Question/AddAnswer";

const Desktop = () => {
  const { loading, questionId, answers, setAnswers } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;

  return (
    <div className="max-w-[20vw] min-w-[20vw]">
      <div
        style={{ height: "calc(100vh - 68.5px)" }}
        className="flex flex-col max-w-[20vw] min-w-[20vw] fixed pt-4"
      >
        {loading || !answers.length ? (
          <div className="flex flex-col items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col w-full h-full overflow-y-auto">
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
