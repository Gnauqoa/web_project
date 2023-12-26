import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { useState } from "react";
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
      <Content type={ContentEnum.question} content={currentQuestion} />
    </div>
  );
};

export default Question;
