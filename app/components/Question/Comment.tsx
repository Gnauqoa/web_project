import { Button } from "@mui/material";
import { useContext } from "react";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "~/layout/main/QuestionDetail/Context";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Comment = ({ questionId }: { questionId: string }) => {
  const { getAnswers } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  return (
    <Button
      onClick={() => getAnswers(questionId)}
      sx={{ border: 0, borderRadius: 0, width: "100%" }}
    >
      <ChatBubbleOutlineIcon />
    </Button>
  );
};

export default Comment;
