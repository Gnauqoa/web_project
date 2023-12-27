import { parse } from "@conform-to/zod";
import { json, type DataFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { StatusResponse } from "~/hooks/useFetcher";
import { authGuard, getPasswordHash } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { nameSchema, passwordSchema } from "~/utils/user-validation";
import { userSelect } from "./resources.users.$userId";
import bcrypt from "bcryptjs";

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
  const { name, bio, newPassword, currentPassword } = submission.value;

  if (newPassword) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: { select: { hash: true } } },
    });

    if (!currentPassword)
      return json(
        { status: StatusResponse.error, message: "Missing current password" },
        { status: 400 }
      );
    const isValid = await bcrypt.compare(
      currentPassword,
      user?.password?.hash || ""
    );
    if (isValid) {
      return json(
        {
          status: StatusResponse.error,
          message: "Current password does not match",
        },
        { status: 400 }
      );
    }
  }
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
