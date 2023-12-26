import { useState } from "react";
import { ContentEnum } from "~/types/content";
import { type QuestionComponentType } from "../Question";
import { type AnswerComponentType } from "../Answer";
import useFetcher from "~/hooks/useFetcher";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export type VoteProps = { id: string; votedBy: string[]; totalVote: number } & (
  | {
      type: ContentEnum.answer;
      onNewState: (data: AnswerComponentType) => void;
    }
  | {
      type: ContentEnum.question;
      onNewState: (data: QuestionComponentType) => void;
    }
);

const Vote = ({
  votedBy,
  id,
  type,
  onNewState,
  totalVote: _totalVote,
}: VoteProps) => {
  const [vote, setVote] = useState(!!votedBy?.length);
  const [totalVote, setTotalVote] = useState<number>(_totalVote || 0);
  const { handleSubmit, loading } = useFetcher<{ data: QuestionComponentType }>(
    {
      action: `/resources/${type}/${id}/${vote ? "unvote" : "vote"}`,
      method: "post",
      onSuccess: (data) => {
        if (type === ContentEnum.question && data.submission)
          onNewState(data.submission.data);
      },
    }
  );
  const handleClick = () => {
    handleSubmit();
    setVote(!vote);
    setTotalVote(vote ? totalVote - 1 : totalVote + 1);
  };
  const handleButtonClick = () => {
    handleClick();
  };
  return (
    <div className="flex flex-row items-center gap-1">
      <IconButton sx={{ p: 0 }} disabled={loading} onClick={handleButtonClick}>
        {vote ? (
          <FavoriteIcon sx={{ width: 20 }} />
        ) : (
          <FavoriteBorderIcon sx={{ width: 20 }} />
        )}
      </IconButton>
      {!!totalVote && <p className="text-md text-primary-v2">{totalVote}</p>}
    </div>
  );
};

export default Vote;
