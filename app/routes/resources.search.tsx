import { json, type ActionFunctionArgs } from "@remix-run/node";
import { type ShouldRevalidateFunction } from "@remix-run/react";
import { questionSelect } from "~/components/Question";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { getPaginationSearchParams } from "~/utils/request-info";
const getSearchParamsObject = (request: Request) => {
  const searchParams = new URL(request.url).searchParams;
  return {
    query: searchParams.get("query"),
    ...getPaginationSearchParams(request, { page: 1, perPage: 10 }),
  };
};
export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export const loader = async ({ request }: ActionFunctionArgs) => {
  const userId = await getUserId(request);
  const { query, perPage, page } = getSearchParamsObject(request);
  const skip = (page - 1) * perPage;

  const questions = await prisma.question.findMany({
    where: { content: { contains: query || undefined } },

    skip,
    orderBy: {
      interactedAt: "desc",
    },
    select: questionSelect(userId || ""),
  });

  return json({
    items: questions,
    total_items: questions.length,
    page: page,
    per_page: perPage,
    total_pages: Math.ceil(questions.length / perPage),
  });
};
