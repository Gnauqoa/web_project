import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { useState } from "react";
import Comment from "./Comment";
import Vote from "./Vote";
import { ContentEnum } from "~/types/content";

export const questionSelect = (userId?: string) =>
  ({
    id: true,
    content: true,
    user: {
      select: {
        id: true,
        name: true,
        avatarId: true,
      },
    },

    votedBy: userId ? { where: { userId }, select: { id: true } } : false,
    vote: true,
    createdAt: true,
  } as Prisma.QuestionSelect);

const questionWithUser = Prisma.validator<Prisma.QuestionDefaultArgs>()({
  select: questionSelect(),
});

export type QuestionComponentType = SerializeFrom<
  Prisma.QuestionGetPayload<typeof questionWithUser>
>;

const Question = ({ question }: { question: QuestionComponentType }) => {
  const [currentQuestion] = useState(question);

  if (!currentQuestion) return <></>;
  return (
    <div className="flex flex-col w-full p-4 gap-2 border-b-[1px] border-gray-300">
      <Content content={currentQuestion} />
      <div className="flex flex-row items-center">
        <Comment questionId={currentQuestion.id} />
        <Vote
          type={ContentEnum.question}
          id={question.id}
          onNewState={() => {}}
          totalVote={question.vote}
          votedBy={question.votedBy.map((v) => v.userId)}
        />
      </div>
    </div>
  );
};

export default Question;
