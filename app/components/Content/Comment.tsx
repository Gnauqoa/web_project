import { IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "~/layout/main/QuestionDetail/Context";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Comment = ({
  questionId,
  totalAnswers,
}: {
  questionId: string;
  totalAnswers: number;
}) => {
  const { getAnswers } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  return (
    <div className="flex flex-row items-center gap-1">
      <IconButton sx={{ p: 0 }} onClick={() => getAnswers(questionId)}>
        <ChatBubbleOutlineIcon sx={{ width: 20 }} />
      </IconButton>
      {!!totalAnswers && (
        <Typography sx={{ fontSize: 16 }}>{totalAnswers}</Typography>
      )}
    </div>
  );
};

export default Comment;
