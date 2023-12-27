import { useContext } from "react";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "../Context";
import {
  CircularProgress,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { EditorType } from "~/components/Editor";
import AnswerEditor from "~/components/Question/AddAnswer";
import CloseIcon from "@mui/icons-material/Close";
import Answers from "../Desktop/Answers";

const Mobile = () => {
  const { loading, open, questionId, setAnswers, handleClose } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  return (
    <Drawer
      transitionDuration={{ appear: 0.2, enter: 0.2, exit: 0.2 }}
      onClose={handleClose}
      open={open}
      anchor="bottom"
    >
      <div className="flex flex-col h-[90vh] max-h-[90vh] overflow-auto">
        <div className="flex flex-row items-center px-4 ">
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
        )}{" "}
      </div>
    </Drawer>
  );
};

export default Mobile;
