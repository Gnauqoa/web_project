import { ContentEnum } from "~/types/content";
import Vote from "./Vote";
import Comment from "./Comment";
import Copy from "./Copy";
import Zoom from "./Zoom";
import { type ContentProps } from ".";

const Action = ({ type, content }: ContentProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Vote
        type={type}
        id={content.id}
        onNewState={() => {}}
        totalVote={content.vote}
        votedBy={content.votedBy.map((v) => v.userId)}
      />
      {type === ContentEnum.question && (
        <Comment
          totalAnswers={content.answers.length}
          questionId={content.id}
        />
      )}
      {(type === ContentEnum.answer || type === ContentEnum.question) && (
        <Copy content={content} type={type} />
      )}
      <Zoom content={content} type={type} />
    </div>
  );
};

export default Action;
