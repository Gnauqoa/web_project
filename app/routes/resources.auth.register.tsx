import { parse } from "@conform-to/zod";
import { json, type DataFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import { authenticator, requireAnonymous, signup } from "~/utils/auth.server";
import { commitSession, getSession } from "~/utils/session.server";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
} from "~/utils/user-validation";

export const onboardingEmailSessionKey = "onboardingEmail";

export const onboardingFormSchema = z
  .object({
    email: emailSchema,
    name: nameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Mật khẩu không giống",
      });
    }
  });

export async function loader({ request }: DataFunctionArgs) {
  await requireAnonymous(request);
  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);

  const message = error?.message ?? null;
  return json(
    { formError: typeof message === "string" ? message : null },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: DataFunctionArgs) {
  const cookieSession = await getSession(request.headers.get("cookie"));

  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: onboardingFormSchema,
  });
  if (submission.intent !== "submit") {
    return json({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    return json(
      {
        status: "error",
        submission,
      } as const,
      { status: 400 }
    );
  }
  const { email, name, password } = submission.value;

  const session = await signup({ email, password, name });

  cookieSession.set(authenticator.sessionKey, session.id);
  cookieSession.unset(onboardingEmailSessionKey);

  return redirect("/auth/login");
}
