import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { ContentEnum } from "~/types/content";

export const answerSelect = (userId?: string) => {
  return {
    id: true,
    content: true,
    user: {
      select: {
        id: true,
        name: true,
        avatarId: true,
      },
    },
    vote: true,
    votedBy: userId ? { where: { userId }, select: { id: true } } : false,
    createdAt: true,
  } as Prisma.AnswerSelect;
};

const answerWithUser = Prisma.validator<Prisma.AnswerDefaultArgs>()({
  include: { user: true, question: false },
  select: answerSelect(),
});

export type AnswerComponentType = SerializeFrom<
  Prisma.AnswerGetPayload<typeof answerWithUser>
>;

const Answer = ({ answer }: { answer: AnswerComponentType }) => {
  if (!answer) return <></>;
  return (
    <div className="flex flex-col w-full p-4 gap-2 border-b-[1px]">
      <Content type={ContentEnum.answer} content={answer} />
    </div>
  );
};

export default Answer;
