import { IconButton } from "@mui/material";
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
    <IconButton sx={{ p: 0 }} onClick={() => getAnswers(questionId)}>
      <ChatBubbleOutlineIcon sx={{ width: 20 }} />
    </IconButton>
  );
};

export default Comment;
