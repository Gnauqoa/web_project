import { parse } from "@conform-to/zod";
import { json, type DataFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { StatusResponse } from "~/hooks/useFetcher";
import { authGuard, getPasswordHash } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { nameSchema, passwordSchema } from "~/utils/user-validation";
import { userSelect } from "./resources.users.$userId";

export const EditUserSchema = z.object({
  name: nameSchema.optional(),
  bio: z.string().max(160).optional(),
  currentPassword: z
    .union([passwordSchema, z.string().min(0).max(0)])
    .optional(),
  newPassword: z.union([passwordSchema, z.string().min(0).max(0)]).optional(),
});

export const action = async ({ request }: DataFunctionArgs) => {
  const userId = await authGuard(request);
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: EditUserSchema,
  });

  if (submission.intent !== "submit") {
    return json({ status: StatusResponse.idle, submission } as const);
  }
  if (!submission.value) {
    return json(
      {
        status: StatusResponse.error,
        submission,
        message: "Missing value",
      } as const,
      { status: 400 }
    );
  }
  const { name, bio, newPassword } = submission.value;

  const updatedUser = await prisma.user.update({
    select: userSelect(),
    where: { id: userId },
    data: {
      name,
      bio,
      password: newPassword
        ? {
            update: {
              hash: await getPasswordHash(newPassword),
            },
          }
        : undefined,
    },
  });
  return json({
    submission: { data: updatedUser },
    status: StatusResponse.success,
  });
};
